import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const count = await prisma.firmPSDPermission.count();
  console.log(count);
  if (count > 0) {
    await prisma.$executeRaw`TRUNCATE TABLE "FirmPSDPermission" RESTART IDENTITY CASCADE`;
  }
  console.log(await prisma.firmPSDPermission.findMany());
  return NextResponse.json("OK");
}
