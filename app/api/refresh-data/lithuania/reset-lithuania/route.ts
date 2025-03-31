import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const count = await prisma.lithuania.count();
  if (count > 0) {
    await prisma.$executeRaw`TRUNCATE TABLE "Lithuania" RESTART IDENTITY CASCADE`;
  }

  return NextResponse.json("OK");
}
