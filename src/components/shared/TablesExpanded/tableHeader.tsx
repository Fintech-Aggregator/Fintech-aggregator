import React from "react";
import styles from "./table.module.css";
import SearchBar from "../HomeContentTemaplate/search-bar";
import SelectField from "../../ui/selectField";
import Image from "next/image";

interface TableHeaderProps {
  onFilterById: (id: number | null) => void;
  onFilterByLicenseName: (name: string) => void;
  onFilterByAdress: (name: string) => void;
  addressTypes: string[];
  onFilterByAddressType: (addressType: string) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  onFilterById,
  onFilterByLicenseName,
  onFilterByAdress,
  addressTypes,
  onFilterByAddressType,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = value ? parseInt(value, 10) : null;
    onFilterById(id);
  };
  const handleLicenseNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onFilterByLicenseName(value);
  };
  const handleAdressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onFilterByAdress(value);
  };
  const handleAddressTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onFilterByAddressType(value);
  };
  return (
    <thead className={styles.tableHeader}>
      <tr>
        <th>
          <input type="checkbox" className={styles.customCheckbox} />
        </th>
        <th>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <span>ID</span>
            <input
              className={`${styles.stylesForInput} ${styles.idInput}`}
              type="text"
              onChange={handleInputChange}
            />
          </div>
        </th>
        <th>
          <div>
            <div className={styles.addIcon}>
              <p>Name of Licensee </p>
              <Image src="/images/chevron.svg" alt="Vector" width={8} height={8} />
            </div>
            <div className={styles.addIcon}>
              <input
                className={`${styles.stylesForInput} ${styles.licenseeLength}`}
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
            <div className={styles.addIcon}>
              <p>Adress </p>
              <Image src="/images/chevron.svg" alt="Vector" width={8} height={8} />
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
            <div className={styles.addIcon}>
              <p>Adress type</p>
              <Image src="/images/chevron.svg" alt="Vector" width={8} height={8} />
            </div>
            <div className="relative">
              <Image
                className="absolute top-2.5 left-32"
                src="/images/vector.svg"
                alt="Vector"
                width={10}
                height={10}
              />
              <select
                className={styles.stylesForInput}
                style={{ appearance: "none" }}
                name=""
                id=""
                onChange={handleAddressTypeChange}
              >
                {addressTypes &&
                Array.isArray(addressTypes) &&
                addressTypes.length > 0 ? (
                  addressTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))
                ) : (
                  <option value=""></option>
                )}
              </select>
            </div>
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
