import React from "react";
import { Skeleton } from "../../ui/skeleton";
import TableHeader from "./tableHeader";
import styles from "./table.module.css";
export const TableSkeleton = (lables: any) => {
  return (
    <div className={styles.centerTable}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <TableHeader lables={lables["lables"]} />
          <tbody>
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <tr key={index}>
                  <td style={{ width: "294px" }}>
                    <Skeleton className="w-[294px] h-[52px] rounded-[10px]" />
                  </td>
                  <td style={{ width: "375px" }}>
                    <Skeleton className="w-[375px] h-[52px] rounded-[10px]" />
                  </td>
                  <td style={{ width: "125px" }}>
                    <Skeleton className="w-[125px] h-[52px] rounded-[10px]" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
