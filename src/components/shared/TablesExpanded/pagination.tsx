import React, { useState } from "react";
import styles from "./table.module.css";
import Image from "next/image";
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPage = Number(e.target.value);
    onPageChange(newPage);
  };
  return (
    <div className={styles.container}>
      <span>{currentPage + 1}</span>
      <Image
        className={styles.icon}
        src="/images/vector.svg"
        alt="vector"
        width={10}
        height={10}
      />

      <select
        value={currentPage}
        onChange={handlePageChange}
        className={styles.select}
      >
        {Array.from({ length: totalPages }, (_, index) => (
          <option key={index} value={index}>
            {index + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
