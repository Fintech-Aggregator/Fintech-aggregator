"use client";
import React, { useState } from "react";
import styles from "./table.module.css";
import TableHeader from "./tableHeader";
import { TableContent } from "./tableContent";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface RowProps {
  licenseName: string;
  address: string;
  addressType: string;
}

interface Props {
  lables: string[];
  tableData: RowProps[];
  rowsPerPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onFilterByLicenseName: (name: string) => void;
  onFilterByAdress: (name: string) => void;
  addressTypes: string[];
  onFilterByAddressType: (addressType: string) => void;
}

export const Table: React.FC<Props> = ({
  lables,
  tableData,
  rowsPerPage = 10,
  currentPage: externalPage,
  onPageChange,
  onFilterByLicenseName,
  onFilterByAdress,
  addressTypes,
  onFilterByAddressType,
}) => {
  const [localPage, setLocalPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const currentPage = externalPage !== undefined ? externalPage : localPage;

  const pathname = usePathname();

  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    } else {
      setLocalPage(newPage);
    }
  };

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

  const toggleRowExpansion = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * rowsPerPage < tableData.length) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      handlePageChange(currentPage - 1);
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
          <TableHeader
            lables={lables}
            onFilterByLicenseName={onFilterByLicenseName}
            onFilterByAdress={onFilterByAdress}
            addressTypes={addressTypes}
            onFilterByAddressType={onFilterByAddressType}
          />
          <tbody>
            {currentData.map((data: any) =>
              lables[0] === "EmoneyStatusEffectiveDate" ? (
                <TableContent
                  key={data.FRN}
                  address={data.FirmName}
                  addressType={data.EmoneyRegisterStatus}
                  licenseName={data.EmoneyStatusEffectiveDate}
                  selectedRows={selectedRows}
                  toggleRowSelection={toggleRowSelection}
                />
              ) : lables[0] === "PSDStatusEffectiveDate" ? (
                <TableContent
                  key={data.FRN}
                  address={data.FirmName}
                  addressType={data.PSDFirmStatus}
                  licenseName={data.PSDStatusEffectiveDate}
                  selectedRows={selectedRows}
                  toggleRowSelection={toggleRowSelection}
                />
              ) : (
                <TableContent
                  key={data.id}
                  address={data.address}
                  addressType={data.addressType}
                  licenseName={data.licenseName}
                  selectedRows={selectedRows}
                  toggleRowSelection={toggleRowSelection}
                />
              )
            )}
          </tbody>
        </table>

        <div className={styles.mobileTable}>
          {currentData.map((data: any) => {
            const isUk = pathname === "/uk";
            const isHongKong = pathname === "/hong-kong";
            const key = isHongKong ? data.id : data.FRN;

            return (
              <div key={key} className={styles.mobileRow}>
                <div
                  className={styles.rowHeader}
                  onClick={() => toggleRowExpansion(data.FRN)}
                >
                  <span>{data.licenseName}</span>
                  <button className={styles.expandButton}>
                    {expandedRow === data.FRN ? "-" : "+"}
                  </button>
                </div>
                {expandedRow === data.FRN && (
                  <div className={styles.rowDetails}>
                    {isUk ? (
                      <>
                        <p>
                          <strong>Address:</strong> {data.FirmName}
                        </p>
                        <p>
                          <strong>Address Type:</strong>{" "}
                          {data.EmoneyRegisterStatus}
                        </p>
                      </>
                    ) : isHongKong ? (
                      <>
                        <p>
                          <strong>Address:</strong> {data.address}
                        </p>
                        <p>
                          <strong>License Name:</strong> {data.licenseName}
                        </p>
                        <p>
                          <strong>Address Type:</strong> {data.addressType}
                        </p>
                      </>
                    ) : (
                      <p>Invalid path</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.pagination}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className={styles.paginationButton}
        >
          <Image
            src="/images/left-arrow.svg"
            alt="Vector"
            width={16}
            height={16}
          />
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
          <Image
            src="/images/right-arrow.svg"
            alt="right-arrow"
            width={16}
            height={16}
          />
        </button>
      </div>
    </div>
  );
};
