"use client";
import React, { useEffect, useState } from "react";
import styles from "./hong-kong-list.module.css";
import { TableContent } from "../components/shared/TablesExpanded/tableContent";
import TableHeader from "../components/shared/TablesExpanded/tableHeader";
import { Skeleton } from "../components/ui/skeleton";

interface Props {
  id: number;
  licenseName: string;
  address: string;
  addressType: string;
}

const HongKong: React.FC = () => {
  const [hongKongData, setHongKongData] = useState<Props[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/hong-kong");
        const data = await res.json();
        setHongKongData(data["hongKongData"]);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

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
    if ((currentPage + 1) * rowsPerPage < hongKongData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentData = hongKongData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  if (loading) {
    return (
      <div>
        <div className={styles.centerTable}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <TableHeader />
              <tbody>
                {Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <tr key={index}>
                      <td style={{ width: "26px" }}>
                        <input
                          type="checkbox"
                          checked={selectedRows.has(index)}
                          onChange={() => toggleRowSelection(index)}
                        />
                      </td>
                      <td style={{ width: "26px" }}>
                        <Skeleton className="w-[26px] h-[50px] rounded-[10px]" />
                      </td>
                      <td style={{ width: "294px" }}>
                        <Skeleton className="w-[294px] h-[50px] rounded-[10px]" />
                      </td>
                      <td style={{ width: "375px" }}>
                        <Skeleton className="w-[375px] h-[50px] rounded-[10px]" />
                      </td>
                      <td style={{ width: "125px" }}>
                        <Skeleton className="w-[125px] h-[50px] rounded-[10px]" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#00cc99"
              className="bi bi-caret-left-fill"
              viewBox="0 0 16 16"
            >
              <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
            </svg>
          </button>
          <span>
            Сторінка {currentPage + 1} із{" "}
            {Math.ceil(hongKongData.length / rowsPerPage)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={(currentPage + 1) * rowsPerPage >= hongKongData.length}
            className={styles.paginationButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#00cc99"
              className="bi bi-caret-right-fill"
              viewBox="0 0 16 16"
            >
              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HongKong;
