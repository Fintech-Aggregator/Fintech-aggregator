import React from "react";
import styles from "./table.module.css";

interface Props {
  licenseName: string;
  address: string;
  addressType: string;
  selectedRows: Set<number>;
  toggleRowSelection: (id: number) => void;
  columnOrder?: Array<"license" | "address" | "addressType">;
  className?: string;
}

export const TableContent: React.FC<Props> = ({
  licenseName,
  address,
  addressType,
  selectedRows,
  toggleRowSelection,
  className,
  columnOrder = ["license", "address", "addressType"], // дефолт
}) => {
  const getCell = (
    colKey: "license" | "address" | "addressType",
    index: number
  ) => {
    const baseStyles: React.CSSProperties = {
      paddingTop: "20px",
      paddingBottom: "20px",
      fontWeight: 500,
    };

    if (colKey === "license") {
      return (
        <td
          key="license"
          style={{
            ...baseStyles,
            width: "294px",
            paddingLeft: "25px",
          }}
        >
          {licenseName}
        </td>
      );
    }

    if (colKey === "address") {
      return (
        <td
          key="address"
          style={{
            ...baseStyles,

            paddingLeft: index !== 1 ? "85px" : "0px",
            textAlign: "center",
          }}
        >
          {address}
        </td>
      );
    }

    if (colKey === "addressType") {
      return (
        <td
          key="addressType"
          style={{
            ...baseStyles,

            transform: index !== 2 ? "translateX(50px)" : "translateX(0)",

            textAlign: "center",
          }}
        >
          {addressType}
        </td>
      );
    }

    return null;
  };

  return (
    <tr className={styles.tableRow}>
      {columnOrder.map((colKey, index) => getCell(colKey, index))}
    </tr>
  );
};
