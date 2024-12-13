"use client";
import React, { useEffect, useState } from "react";
import styles from "./hong-kong-list.module.css";
import SearchForm from "../components/shared/searchForm";

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <h1>Search Form</h1>
        <SearchForm />
      </div>
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
              <tr key={data.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.has(data.id)}
                    onChange={() => toggleRowSelection(data.id)}
                  />
                </td>
                <td>{data.id}</td>
                <td>{data.licenseName}</td>
                <td>{data.address}</td>
                <td>{data.addressType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HongKong;
