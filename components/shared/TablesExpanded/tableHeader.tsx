import React from "react";
import styles from "./table.module.css";
import SearchBar from "../HomeContentTemaplate/search-bar";
import SelectField from "../../ui/selectField";
import Image from "next/image";

function TableHeader() {
  return (
    <thead className={styles.tableHeader}>
      <tr>
        <th>
          <input type="checkbox" />
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
            />
          </div>
        </th>
        <th>
          <div>
            <div className={styles.addIcon}>
              <p>Name of Licensee </p>
              <Image src="/chevron.svg" alt="Vector" width={8} height={8} />
            </div>
            <div className={styles.addIcon}>
              <input
                className={`${styles.stylesForInput} ${styles.licenseeLength}`}
                type="text"
              />
              <Image
                className={styles.searchIcon}
                src="/search.svg"
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
              <Image src="/chevron.svg" alt="Vector" width={8} height={8} />
            </div>
            <div className={styles.addIcon}>
              <input className={styles.stylesForInput} type="text" />
              <Image
                className={styles.searchIcon}
                src="/search.svg"
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
              <Image src="/chevron.svg" alt="Vector" width={8} height={8} />
            </div>
            <div className="relative">
              <Image
                className="absolute top-2.5 left-32"
                src="/Vector.svg"
                alt="Vector"
                width={10}
                height={10}
              />
              <select
                className={styles.stylesForInput}
                style={{ appearance: "none" }}
                name=""
                id=""
              ></select>
            </div>
          </div>
        </th>
      </tr>
    </thead>
  );
}

export default TableHeader;
