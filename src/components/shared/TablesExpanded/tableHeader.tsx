import React from "react";
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
}

const TableHeader: React.FC<TableHeaderProps> = ({
  lables,
  onFilterByLicenseName,
  onFilterByAdress,
  addressTypes,
  onFilterByAddressType,
}) => {
  const pathname = usePathname();

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const handleLicenseNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onFilterByLicenseName!(value);
  };

  const handleAdressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onFilterByAdress!(value);
  };

  const handleAddressTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onFilterByAddressType!(value);
  };
  return (
    <thead className={styles.tableHeader}>
      <tr>
        <th>
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
                className={`${styles.stylesForInput}`}
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
        <th>
          <div>
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
        <th>
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
            <div className={styles.addIcon}>
              <select
                className={styles.stylesForInput}
                style={{ appearance: "none" }}
                name=""
                id=""
                onChange={handleAddressTypeChange}
              >
                <option value="">All</option>
                {addressTypes &&
                Array.isArray(addressTypes) &&
                addressTypes.length > 0 ? (
                  addressTypes.map((type) => (
                    <option key={type} value={type}>
                      {truncateText(type, 10)}
                    </option>
                  ))
                ) : (
                  <option value=""></option>
                )}
              </select>
              <Image
                className={styles.searchIcon}
                src="/images/vector.svg"
                alt="Vector"
                width={10}
                height={10}
              />
            </div>
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
