import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const body = await req.json();

  const exists =
    await prisma.webhookEvent.findUnique({
      where: {
        eventId: body.eventId,
      },
    });

  if (exists) {

    return NextResponse.json({
      message: "Already Processed",
    });

  }

  await prisma.$transaction(async (tx) => {

    await tx.webhookEvent.create({
      data: {
        eventId: body.eventId,
      },
    });

    await tx.provider.updateMany({
      data: {
        monthlyQuota: 10,
      },
    });

  });

  return NextResponse.json({
    success: true,
  });

}
