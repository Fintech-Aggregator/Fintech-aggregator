import React from "react";
import styles from "./table.module.css";
interface Props {
  id: number;
  licenseName: string;
  address: string;
  addressType: string;
  selectedRows: Set<number>;
  toggleRowSelection: (id: number) => void;
  className?: string;
}

export const TableContent: React.FC<Props> = ({
  id,
  licenseName,
  address,
  addressType,
  selectedRows,
  toggleRowSelection,
  className,
}) => {
  return (
    <tr className={className} key={id}>
      <td style={{ width: "26px" }}>
        <input
          type="checkbox"
          checked={selectedRows.has(id)}
          onChange={() => toggleRowSelection(id)}
          className={styles.customCheckbox}
        />
      </td>
      <td
        style={{
          width: "26px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>{id}</div>
      </td>
      <td style={{ width: "294px" }}>{licenseName}</td>
      <td style={{ width: "375px" }}>{address}</td>
      <td style={{ width: "125px" }}>{addressType}</td>
    </tr>
  );
};
