import React from "react";
import { Skeleton } from "../../ui/skeleton";
import TableHeader from "./tableHeader";
import styles from "./table.module.css";

interface TableSkeletonProps {
  lables: string[];
  columnOrder?: Array<"license" | "address" | "addressType">;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  lables,
  columnOrder,
}) => {
  return (
    <div className={styles.centerTable}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <TableHeader lables={lables} columnOrder={columnOrder} />
          <tbody>
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <tr key={index}>
                  <td>
                    <Skeleton className=" h-[52px] rounded-[10px]" />
                  </td>
                  <td>
                    <Skeleton className=" h-[52px] rounded-[10px]" />
                  </td>
                  <td>
                    <Skeleton className=" h-[52px] rounded-[10px]" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className={styles.mobileTable}>
          {Array(10)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className={styles.mobileRow}>
                <div className={styles.rowHeader}>
                  <Skeleton className="w-[90%] h-[27px] rounded-[8px]" />
                  <button className={styles.expandButton}>+</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
