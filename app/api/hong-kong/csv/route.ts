import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';
import { Parser } from 'json2csv';

export async function GET() {
  try {
    const hongKong = await prisma.hongKong.findMany();

    if (hongKong.length === 0) {
      return new NextResponse("No data found", { status: 404 });
    }

    const fields = Object.keys(hongKong[0]);
    const parser = new Parser({ fields });
    const csv = parser.parse(hongKong);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="hongKong.csv"',
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
