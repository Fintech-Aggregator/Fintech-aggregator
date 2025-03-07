import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const lithuania = await prisma.lithuania.findMany();
  return NextResponse.json({
    lithuania,
  });
}