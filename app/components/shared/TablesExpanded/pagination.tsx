import React, { useState } from "react";
import styles from "./table.module.css";

function Pagination() {
  const [selectedValue, setSelectedValue] = useState<number>(1);

  const options = [5, 10, 15, 20, 25];

  return (
    <div className={styles.container}>
      <span>{selectedValue}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="#05D69E"
        viewBox="0 0 16 16"
        className={styles.icon}
      >
        <path d="M1.5 6.5l6 6 6-6h-12z" />
      </svg>

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
