import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const firmPSDPermission = await prisma.firmPSDPermission.findMany();
  return NextResponse.json({
    firmPSDPermission,
  });
}