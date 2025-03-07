import React from "react";
import styles from "./table.module.css";
interface Props {
  licenseName: string;
  address: string;
  addressType: string;
  selectedRows: Set<number>;
  toggleRowSelection: (id: number) => void;
  className?: string;
}

export const TableContent: React.FC<Props> = ({
  licenseName,
  address,
  addressType,
  selectedRows,
  toggleRowSelection,
  className,
}) => {
  return (
    <tr className={className}>
      <td className="font-medium" style={{ width: "294px" }}>
        {licenseName}
      </td>
      <td className="font-medium" style={{ width: "375px" }}>
        {address}
      </td>
      <td className="font-medium text-base" style={{ width: "125px" }}>
        {addressType}
      </td>
    </tr>
  );
};
