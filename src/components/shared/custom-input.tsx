import React from "react";
import { Input } from "../ui/input";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { FormControl, FormField, FormMessage } from "../ui/form";
import { authFormSchema } from "@/src/lib/utils";

const formSchema = authFormSchema('sign-up');

interface CustomInput {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  type: string;
  placeholder: string;
}

export const CustomInput: React.FC<React.PropsWithChildren<CustomInput>> = ({ control, name, type, placeholder, children }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <div className="border border-[#A4A4A4] rounded-lg flex items-center w-full mt-8">
            {children}
            <FormControl>
              <Input className="border-none outline-none focus:outline-none focus:ring-0" id={name} placeholder={placeholder} type={type === "password" ? "password" : "text"} {...field} />
            </FormControl>
            <FormMessage />
          </div>
        </div>
      )}
    />
  );
};


