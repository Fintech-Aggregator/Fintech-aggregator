"use client";
import React from "react";
import Image from "next/image";

interface CountryFilterProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const CountryFilter: React.FC<CountryFilterProps> = ({
  value,
  options,
  onChange,
}) => {
  return (
    <div className="relative w-[185px]">
      <select
        className="appearance-none border border-black rounded-xl pl-3 pr-8 py-2 text-md w-full font-semibold focus:outline-none focus:ring-0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All Countries</option>
        {options.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <Image
          src="/images/vector.svg"
          alt="Dropdown arrow"
          width={10}
          height={10}
        />
      </div>
    </div>
  );
};

export default CountryFilter;
