import React, { useState } from "react";
import styles from "./table.module.css";
import Image from "next/image";

function Pagination() {
  const [selectedValue, setSelectedValue] = useState<number>(1);

  const options = [5, 10, 15, 20, 25];

  return (
    <div className={styles.container}>
      <span>{selectedValue}</span>
      <Image
        className={styles.icon}
        src="/Vector.svg"
        alt="Vector"
        width={10}
        height={10}
      />

      <select
        value={selectedValue}
        onChange={(e) => setSelectedValue(Number(e.target.value))}
        className={styles.select}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Pagination;
