"use client";

import { Checkbox } from "@/src/components/ui/checkbox";
import React from "react";

interface CustomCheckboxProps {
  isChecked: boolean;
  setChecked: (value: boolean) => void;
  text: string;
}

export function CustomCheckbox({ text, isChecked=false, setChecked }: CustomCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox onClick={() => setChecked(!isChecked)} id={text} checked={isChecked} />
      <label
        htmlFor={text}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {text}
      </label>
    </div>
  );
}
