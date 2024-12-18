"use client";
import React, { useEffect, useState } from "react";
import styles from "./hong-kong-list.module.css";
import { TableRow } from "../components/shared/table-row";
import SearchForm from "../components/shared/searchForm";
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

  if (loading) {
    return (
      <div>
        <SearchForm />
        <div className={styles.centerTable}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>ID</th>
                  <th>License Name</th>
                  <th>Address</th>
                  <th>Address Type</th>
                </tr>
              </thead>
              <tbody>
                {...Array(10)
                  .fill(0)
                  .map((_, index) => 
                    <tr key={index}>
                      <td>
                        <input type="checkbox" checked={selectedRows.has(index)} onChange={() => toggleRowSelection(index)} />
                      </td>
                      <td><Skeleton className="w-[50px] h-[50px] rounded-[10px]" /></td>
                      <td><Skeleton className="w-[220px] h-[50px] rounded-[10px]" /></td>
                      <td><Skeleton className="w-[360px] h-[50px] rounded-[10px]" /></td>
                      <td><Skeleton className="w-[150px] h-[50px] rounded-[10px]" /></td>
                    </tr> )}
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    );
  }

  return (
    <div>
      <SearchForm />
      <div className={styles.centerTable}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Select</th>
                <th>ID</th>
                <th>License Name</th>
                <th>Address</th>
                <th>Address Type</th>
              </tr>
            </thead>
            <tbody>
              {hongKongData.map((data) => (
                <TableRow
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
      </div>
    </div>
  );
};

export default HongKong;
