import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { Parser as Json2csvParser } from "json2csv";
import * as XLSX from "xlsx";
import { PDFDocument, rgb } from "pdf-lib";
import { join } from "path";
import { readFile } from "fs/promises";
import fontkit from "@pdf-lib/fontkit";

export async function GET(req: NextRequest, { params }: { params: { fileType: string } }) {
  const { fileType } = await params;
  const hongKong = await prisma.hongKong.findMany();
  try {
    if (hongKong.length === 0) {
      return new NextResponse("No data found", { status: 404 });
    }

    switch (fileType) {
      case "csv": {
        const fields = Object.keys(hongKong[0]);
        const parser = new Json2csvParser({ fields });
        const csv = parser.parse(hongKong);

        return new NextResponse(csv, {
          status: 200,
          headers: {
            "Content-Type": "text/csv",
            "Content-Disposition": 'attachment; filename="hongKong.csv"',
          },
        });
      }

      case "xlsx": {
        const worksheet = XLSX.utils.json_to_sheet(hongKong);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "HongKong");

        const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

        return new NextResponse(buffer, {
          status: 200,
          headers: {
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": 'attachment; filename="hongKong.xlsx"',
          },
        });
      }

      case "pdf": {
        const pdfDoc = await PDFDocument.create();
        pdfDoc.registerFontkit(fontkit);

        let page = pdfDoc.addPage([595, 842]);
        const fontPath = join(
          process.cwd(),
          "public",
          "fonts",
          "Noto_Sans_SC",
          "static",
          "NotoSansSC-Regular.ttf"
        );
        const fontBytes = await readFile(fontPath);
        const customFont = await pdfDoc.embedFont(fontBytes);

        const { width, height } = page.getSize();
        let y = height - 50;
        const fontSize = 10;

        const fieldsToInclude = ["FirmName", "Address", "Licence"];
        const headersPretty = ["Firm Name", "Address", "Licence"];

        const slimData = hongKong.map((row) => {
          const slimRow: Record<string, any> = {};
          for (const field of fieldsToInclude) {
            slimRow[field] = row[field as keyof typeof row] || "";
          }
          return slimRow;
        });

        const sideMargin = 20;
        const usableWidth = width - sideMargin * 2;

        const licenseNameWidth = usableWidth * 0.25;
        const addressWidth = usableWidth * 0.55;
        const addressTypeWidth = usableWidth * 0.2;

        const colX = [
          sideMargin,
          sideMargin + licenseNameWidth + 10,
          sideMargin + licenseNameWidth + addressWidth + 20,
        ];

        function wrapText(text: string, maxWidth: number, font: any, size: number) {
          const words = text.split(" ");
          let lines: string[] = [];
          let currentLine = words[0] || "";

          for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const width = font.widthOfTextAtSize(currentLine + " " + word, size);
            if (width < maxWidth) {
              currentLine += " " + word;
            } else {
              lines.push(currentLine);
              currentLine = word;
            }
          }
          lines.push(currentLine);
          return lines;
        }

        headersPretty.forEach((header, i) => {
          page.drawText(header, { x: colX[i], y, size: fontSize + 2, font: customFont, color: rgb(0, 0, 0) });
        });

        y -= 24;

        for (const row of slimData) {
          const wrapped = [
            wrapText(String(row["FirmName"]), licenseNameWidth, customFont, fontSize),
            wrapText(String(row["Address"]), addressWidth, customFont, fontSize),
            wrapText(String(row["Licence"]), addressTypeWidth, customFont, fontSize),
          ];
        
          const maxLines = Math.max(...wrapped.map((lines) => lines.length));
          const rowHeight = maxLines * (fontSize + 4); 
        
          for (let lineIdx = 0; lineIdx < maxLines; lineIdx++) {
            for (let colIdx = 0; colIdx < wrapped.length; colIdx++) {
              const lines = wrapped[colIdx];
              const textLine = lines[lineIdx] ?? "";
              
              page.drawText(textLine, {
                x: colX[colIdx],
                y: y - (lineIdx * (fontSize + 4)),
                size: fontSize,
                font: customFont,
                color: rgb(0.1, 0.1, 0.1),
              });
            }
          }
        
          y -= rowHeight + 8;
        
          if (y < 100) {
            const newPage = pdfDoc.addPage([595, 842]);
            page = newPage;
            y = height - 50;
        
            headersPretty.forEach((header, i) => {
              page.drawText(header, { x: colX[i], y, size: fontSize + 2, font: customFont, color: rgb(0, 0, 0) });
            });
        
            y -= 24;
          }
        }

        const pdfBytes = await pdfDoc.save();
        return new NextResponse(Buffer.from(pdfBytes), {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": 'attachment; filename="hongKong.pdf"',
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
