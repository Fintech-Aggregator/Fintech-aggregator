import React from "react";
import styles from "@/app/hong-kong/hong-kong-list.module.css";
import TableHeader from "./TableHeader";
import { TableContent } from "./tableContent";
import Image from "next/image";
interface RowProps {
  id: number;
  licenseName: string;
  address: string;
  addressType: string;
}

interface Props {
  tableData: RowProps[];
}

export const Table: React.FC<Props> = ({ tableData }) => {
  const [selectedRows, setSelectedRows] = React.useState<Set<number>>(
    new Set()
  );
  const [currentPage, setCurrentPage] = React.useState(0);
  const rowsPerPage = 10;
  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * rowsPerPage < tableData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentData = tableData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  return (
    <div className={styles.centerTable}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <TableHeader />
          <tbody>
            {currentData.map((data) => (
              <TableContent
                key={data.id}
                id={data.id}
                address={data.address}
                addressType={data.addressType}
                licenseName={data.licenseName}
                selectedRows={selectedRows}
                toggleRowSelection={toggleRowSelection}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className={styles.paginationButton}
        >
          <Image src="/leftArrow.svg" alt="Vector" width={16} height={16} />
        </button>
        <span>
          Сторінка {currentPage + 1} із{" "}
          {Math.ceil(tableData.length / rowsPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={(currentPage + 1) * rowsPerPage >= tableData.length}
          className={styles.paginationButton}
        >
          <Image src="/rightArrow.svg" alt="Vector" width={16} height={16} />
        </button>
      </div>
    </div>
  );
};
