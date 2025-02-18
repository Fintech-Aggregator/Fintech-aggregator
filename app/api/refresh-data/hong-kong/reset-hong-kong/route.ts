import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  await prisma.$executeRaw`TRUNCATE TABLE "EMoneyFirms" RESTART IDENTITY CASCADE`;

  return NextResponse.json("OK");
}