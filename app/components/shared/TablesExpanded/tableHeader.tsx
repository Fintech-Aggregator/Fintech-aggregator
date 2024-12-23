import React from "react";
import styles from "./table.module.css";
function tableHeader() {
  return (
    <thead className={styles.tableHeader}>
      <tr style={{ borderBottom: "1px solid #000000;" }}>
        <th>
          <input type="checkbox" />
        </th>
        <th>ID</th>
        <th>License Name</th>
        <th>Address</th>
        <th>Address Type</th>
      </tr>
    </thead>
  );
}

export default tableHeader;
