import React from "react";

interface Props {
  id: number;
  licenseName: string;
  address: string;
  addressType: string;
  selectedRows: Set<number>;
  toggleRowSelection: (id: number)=> void;
  className?: string;
}

export const TableRow: React.FC<Props> = ({ id, licenseName, address, addressType, selectedRows, toggleRowSelection, className }) => {
  return (
    <tr className={className} key={id}>
      <td>
        <input type="checkbox" checked={selectedRows.has(id)} onChange={() => toggleRowSelection(id)} />
      </td>
      <td>{id}</td>
      <td>{licenseName}</td>
      <td>{address}</td>
      <td>{addressType}</td>
    </tr>
  );
};
