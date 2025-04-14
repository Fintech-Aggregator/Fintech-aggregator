import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { Parser as Json2csvParser } from "json2csv";
import * as XLSX from "xlsx";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { join } from "path";
import { readFile } from "fs/promises";
import fontkit from '@pdf-lib/fontkit';

export async function GET(
  req: NextRequest,
  context: { params: { fileType: string } }
) {
  const fileType = context.params.fileType.toLowerCase();
  const eMoneyFirms = await prisma.eMoneyFirms.findMany();
  try {
    if (eMoneyFirms.length === 0) {
      return new NextResponse("No data found", { status: 404 });
    }

    switch (fileType) {
      case "csv": {
        const fields = Object.keys(eMoneyFirms[0]);
        const parser = new Json2csvParser({ fields });
        const csv = parser.parse(eMoneyFirms);

        return new NextResponse(csv, {
          status: 200,
          headers: {
            "Content-Type": "text/csv",
            "Content-Disposition": 'attachment; filename="eMoneyFirms.csv"',
          },
        });
      }

      case "xlsx": {
        const worksheet = XLSX.utils.json_to_sheet(eMoneyFirms);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "eMoneyFirms");

        const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

        return new NextResponse(buffer, {
          status: 200,
          headers: {
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": 'attachment; filename="eMoneyFirms.xlsx"',
          },
        });
      }

      case "pdf": {
        const pdfDoc = await PDFDocument.create();
        pdfDoc.registerFontkit(fontkit); // ✅ this enables custom fonts

        const page = pdfDoc.addPage([595, 842]);
        const fontPath = join(process.cwd(), "public", "fonts", "Noto_Sans", "static", "NotoSans_Condensed-Black.ttf");
        const fontBytes = await readFile(fontPath);
        const customFont = await pdfDoc.embedFont(fontBytes);
      
        const { height } = page.getSize();
        let y = height - 50;
        const fontSize = 12;
        const keys = Object.keys(eMoneyFirms[0]);
      
        page.drawText(keys.join(" | "), { x: 50, y, size: fontSize, font: customFont, color: rgb(0, 0, 0) });
        y -= 20;
      
        for (const row of eMoneyFirms) {
          const line = keys.map(k => String(row[k as keyof typeof row])).join(" | ");
          page.drawText(line, { x: 50, y, size: fontSize, font: customFont, color: rgb(0.1, 0.1, 0.1) });
          y -= 16;
          if (y < 50) break;
        }
      
        const pdfBytes = await pdfDoc.save();
        return new NextResponse(Buffer.from(pdfBytes), {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": 'attachment; filename="eMoneyFirms.pdf"',
          },
        });
      }
      
      default:
        return new NextResponse("Unsupported file type", { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
