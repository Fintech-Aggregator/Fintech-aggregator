import React, { useState } from "react";
import styles from "./table.module.css";
import SearchBar from "../HomeContentTemaplate/search-bar";
import SelectField from "../../ui/selectField";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/utils";

interface TableHeaderProps {
  lables: string[];
  onFilterByLicenseName?: (name: string) => void;
  onFilterByAdress?: (name: string) => void;
  addressTypes?: string[];
  onFilterByAddressType?: (addressType: string) => void;
  extraFilterOptions?: string[];
  onExtraFilter?: (addressType: string) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  lables,
  onFilterByLicenseName,
  onFilterByAdress,
  addressTypes,
  onFilterByAddressType,
  extraFilterOptions,
  onExtraFilter,
}) => {
  const pathname = usePathname();

  const [selectedAddressType, setSelectedAddressType] = useState("");

  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  const handleLicenseNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onFilterByLicenseName?.(e.target.value);

  const handleAdressChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onFilterByAdress?.(e.target.value);

  const handleAddressTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAddressType(e.target.value);
    onFilterByAddressType?.(e.target.value);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    onExtraFilter?.(e.target.value);

  return (
    <thead className={styles.tableHeader}>
      <tr>
        <th style={{ width: "294px" }}>
          <div className="my-2">
            <div className={cn(styles.addIcon, "mb-1")}>
              <p className="font-semibold">{lables?.[0]}</p>
              <Image
                className="ml-1"
                src="/images/chevron.svg"
                alt="Vector"
                width={10}
                height={10}
              />
            </div>
            <div className={styles.addIcon}>
              <input
                className={styles.stylesForInput}
                type="text"
                onChange={handleLicenseNameChange}
              />
              <Image
                className={styles.searchIcon}
                src="/images/search.svg"
                alt="Vector"
                width={16}
                height={16}
              />
            </div>
          </div>
        </th>

        <th style={{ width: "300px" }}>
          <div style={{ marginRight: "20px" }}>
            <div className={cn(styles.addIcon, "mb-1")}>
              <p className="font-semibold">{lables?.[1]}</p>
              <Image
                className="ml-1"
                src="/images/chevron.svg"
                alt="Vector"
                width={10}
                height={10}
              />
            </div>
            <div className={styles.addIcon}>
              <input
                className={styles.stylesForInput}
                type="text"
                onChange={handleAdressChange}
              />
              <Image
                className={styles.searchIcon}
                src="/images/search.svg"
                alt="Vector"
                width={16}
                height={16}
              />
            </div>
          </div>
        </th>

        <th style={{ width: "200px" }}>
          <div className={styles.content}>
            <div className={cn(styles.addIcon, "mb-1")}>
              <p className="font-semibold">{lables?.[2]}</p>
              <Image
                className="ml-1"
                src="/images/chevron.svg"
                alt="Vector"
                width={10}
                height={10}
              />
            </div>

            <div
              className={cn(
                styles.stylesForInput,
                styles.addIcon,
                "relative flex items-center justify-between bg-white "
              )}
            >
              <span className="text-left flex-1">
                {selectedAddressType
                  ? truncateText(selectedAddressType, 15)
                  : "All"}
              </span>

              <Image
                className="ml-2 mr-2"
                src="/images/vector.svg"
                alt="Vector"
                width={10}
                height={10}
              />

              <select
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                value={selectedAddressType}
                onChange={handleAddressTypeChange}
              >
                <option value="">All</option>
                {addressTypes?.map((type) => (
                  <option key={type} value={type} title={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </th>
        {/* {extraFilterOptions && onExtraFilter && (
          <th style={{ width: "120px" }}>
            <div className={styles.addIcon}>
              <p className="font-semibold">{lables?.[3]}</p>
              <select
                className={styles.stylesForInput}
                style={{ appearance: "none" }}
                onChange={handleCountryChange}
              >
                <option value="">All</option>
                {extraFilterOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <Image
                className={styles.searchIcon}
                src="/images/vector.svg"
                alt="Vector"
                width={10}
                height={10}
              />
            </div>
          </th>
        )} */}
      </tr>
    </thead>
  );
};

export default TableHeader;
