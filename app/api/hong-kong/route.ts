import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const hongKongData = await prisma.hongKong.findMany();
  return NextResponse.json({
    hongKongData,
  });
}

