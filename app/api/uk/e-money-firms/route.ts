import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const eMoneyFirms = await prisma.eMoneyFirms.findMany();
  return NextResponse.json({
    eMoneyFirms,
  });
}