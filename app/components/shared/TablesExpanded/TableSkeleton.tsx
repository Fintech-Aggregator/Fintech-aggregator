import React from "react";
import { Skeleton } from "../../ui/skeleton";
import TableHeader from "./tableHeader";
import styles from "@/app/hong-kong/hong-kong-list.module.css";
export const TableSkeleton = () => {
  return (
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
                    <input type="checkbox" />
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
  );
};
