import { prisma } from "@/lib/prisma";
import { allocateLead } from "@/lib/allocation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const lead =
      await prisma.lead.create({
        data: {
          name: body.name,
          phone: body.phone,
          city: body.city,
          description: body.description,
          serviceId: body.serviceId,
        },
      });

    await allocateLead(
      lead.id,
      body.serviceId
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error: any) {

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 400,
      }
    );

  }

}
