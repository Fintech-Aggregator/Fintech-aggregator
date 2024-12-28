"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../components/shared/HomeContentTemaplate/search-bar";
import Pagination from "../components/shared/TablesExpanded/pagination";
import { TableContainer } from "../components/shared/TablesExpanded/tableContainer";
import { TableSkeleton } from "../components/shared/TablesExpanded/TableSkeleton";
interface Props {
  id: number;
  licenseName: string;
  address: string;
  addressType: string;
}

const HongKong: React.FC = () => {
  const [hongKongData, setHongKongData] = useState<Props[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/hong-kong");
        const data = await res.json();
        setHongKongData(data["hongKongData"]);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div
        style={{
          marginRight: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "480px",
        }}
      >
        <SearchBar size="medium" />
        <Pagination />
      </div>
      {loading ? (
        <TableSkeleton />
      ) : (
        <TableContainer tableData={hongKongData} />
      )}
    </div>
  );
};

export default HongKong;
