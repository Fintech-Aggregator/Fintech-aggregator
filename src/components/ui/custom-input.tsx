import React, { useState } from "react";
import { Input } from "./input";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { FormControl, FormField, FormMessage } from "./form";
import { authFormSchema } from "@/src/lib/utils";
import Image from "next/image";

const formSchema = authFormSchema("sign-up");

interface CustomInput {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  type: string;
  placeholder: string;
}

export const CustomInput: React.FC<React.PropsWithChildren<CustomInput>> = ({
  control,
  name,
  type,
  placeholder,
  children,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <div className="border border-[#A4A4A4] rounded-lg flex items-center w-full mt-8 px-4 relative">
            {children}
            <FormControl>
              <Input
                className="text-lg w-full border-none outline-none focus:outline-none focus:ring-0 pr-10"
                id={name}
                placeholder={placeholder}
                type={
                  type === "password" && !isPasswordVisible
                    ? "password"
                    : "text"
                }
                {...field}
              />
            </FormControl>
            {type === "password" && (
              <button
                type="button"
                className="absolute right-4"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              >
                <Image
                  src={
                    isPasswordVisible
                      ? "/images/show-outline.svg"
                      : "/images/hide-outline.svg"
                  }
                  alt={isPasswordVisible ? "Show password" : "Hide password"}
                  width={24}
                  height={24}
                />
              </button>
            )}
          </div>
          <FormMessage className="mt-2 text-left text-12 text-red-500" />
        </div>
      )}
    />
  );
};
