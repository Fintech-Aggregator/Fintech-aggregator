import React from "react";
import { cn } from "@/src/lib/utils";
import Image from "next/image";

interface Props {
  className?: string;
  isDrawerOpen: boolean;
  register: string
}

export const Drawer: React.FC<Props> = ({ className, isDrawerOpen, register }) => {
  const getLink = async (type: string) => {
    try {
      const response = await fetch(`/api/${register}/${type}`);

      if (!response.ok) {
        console.error("Download failed");
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${register}.${type}`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  return (
    <>
      {isDrawerOpen && (
        <div className="absolute right-0 mt-10 bg-white border border-black rounded p-2 shadow-md flex flex-col gap-2 w-44 z-20 items-center">
          <h2 className="font-semibold ">Download</h2>
          <div className="mb-4 border-b-2 w-full h-1 border-b-black " />
          <div className="flex w-full justify-evenly">
            <Image
              onClick={() => getLink("csv")}
              className="w-8 h-8 cursor-pointer"
              width={50}
              height={50}
              src="/images/CSV.png"
              alt="csv"
            />
            <Image onClick={() => getLink("xlsx")} className="w-8 h-8 cursor-pointer" width={50} height={50} src="/images/XLSX.png" alt="csv" />
            <Image onClick={() => getLink("pdf")} className="w-8 h-8 cursor-pointer" width={50} height={50} src="/images/PDF.png" alt="csv" />
          </div>
        </div>
      )}
    </>
  );
};
