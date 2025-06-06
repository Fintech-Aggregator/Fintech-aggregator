import React, { useState } from "react";
import styles from "./table.module.css";
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
  onExtraFilter?: (filterValue: string) => void;
  columnOrder?: Array<"license" | "address" | "addressType">;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  lables,
  onFilterByLicenseName,
  onFilterByAdress,
  addressTypes,
  onFilterByAddressType,
  extraFilterOptions,
  onExtraFilter,
  columnOrder = ["license", "address", "addressType"],
}) => {
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

  const renderColumn = (
    type: "license" | "address" | "addressType",
    index: number
  ) => {
    const baseThStyle = {
      boxSizing: "border-box" as const,
    };

    switch (type) {
      case "license":
        return (
          <th
            key="license"
            style={{
              ...baseThStyle,
              width: "294px",
            }}
          >
            <div className="my-2">
              <div className={cn(styles.addIcon, "mb-1")}>
                <p className="font-semibold">{lables?.[0]}</p>
                <Image
                  src="/images/chevron.svg"
                  alt="Vector"
                  width={10}
                  height={10}
                  className="ml-1"
                />
              </div>
              <div
                className={styles.addIcon}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                }}
              >
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
        );

      case "address":
        return (
          <th
            key="address"
            style={{
              ...baseThStyle,
              width: "320px",
            }}
          >
            <div
              style={{
                paddingLeft: index !== 1 ? "100px" : "0px",
              }}
            >
              <div className={cn(styles.addIcon, "mb-1")}>
                <p className="font-semibold">{lables?.[1]}</p>
                <Image
                  src="/images/chevron.svg"
                  alt="Vector"
                  width={10}
                  height={10}
                  className="ml-1"
                />
              </div>

              <div
                className={styles.addIcon}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
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
        );

      case "addressType":
        return (
          <th
            key="addressType"
            style={{
              ...baseThStyle,
              width: "200px",
            }}
          >
            <div
              className={styles.content}
              style={{
                boxSizing: "border-box",
                width: "100%",
                paddingLeft: index !== 2 ? "65px" : "0px",
              }}
            >
              <div
                className={cn(styles.addIcon, "mb-1")}
                style={{
                  boxSizing: "border-box",
                  width: "100%",
                  marginLeft: index !== 2 ? "25px" : "0px",
                }}
              >
                <p className="font-semibold">{lables?.[2]}</p>
                <Image
                  src="/images/chevron.svg"
                  alt="Vector"
                  width={10}
                  height={10}
                  className="ml-1"
                />
              </div>

              <div
                className={cn(
                  styles.stylesForInput,
                  styles.addIcon,
                  "relative flex items-center justify-between bg-white"
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
        );

      default:
        return null;
    }
  };

  return (
    <thead className={styles.tableHeader}>
      <tr>
        {columnOrder.map((columnType, index) =>
          renderColumn(columnType, index)
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;
