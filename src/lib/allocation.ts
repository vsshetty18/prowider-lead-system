import { prisma } from "./prisma";

const mandatoryProviders: any = {
  1: [1],
  2: [5],
  3: [1, 4],
};

const pools: any = {
  1: [2, 3, 4],
  2: [6, 7, 8],
  3: [2, 3, 5, 6, 7, 8],
};

export async function allocateLead(
  leadId: number,
  serviceId: number
) {

  return prisma.$transaction(async (tx) => {

    const selected = new Set<number>();

    const mandatory =
      mandatoryProviders[serviceId];

    for (const providerId of mandatory) {

      const count =
        await tx.leadAssignment.count({
          where: {
            providerId,
          },
        });

      if (count < 10) {
        selected.add(providerId);
      }

    }

    const state =
      await tx.allocationState.findUnique({
        where: {
          serviceId,
        },
      });

    const pool = pools[serviceId];

    let pointer = state?.pointer || 0;

    for (
      let i = 0;
      i < pool.length &&
      selected.size < 3;
      i++
    ) {

      const providerId =
        pool[(pointer + i) % pool.length];

      if (selected.has(providerId)) {
        continue;
      }

      const count =
        await tx.leadAssignment.count({
          where: {
            providerId,
          },
        });

      if (count < 10) {
        selected.add(providerId);
      }

    }

    for (const providerId of selected) {

      await tx.leadAssignment.create({
        data: {
          leadId,
          providerId,
        },
      });

    }

    await tx.allocationState.update({
      where: {
        serviceId,
      },
      data: {
        pointer:
          (pointer + 1) % pool.length,
      },
    });

  });

}
