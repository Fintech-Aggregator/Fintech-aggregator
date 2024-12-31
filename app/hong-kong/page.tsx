"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "@/components/shared/HomeContentTemaplate/search-bar";
import Pagination from "@/components/shared/TablesExpanded/pagination";
import { Table } from "@/components/shared/TablesExpanded/Table";
import { TableSkeleton } from "@/components/shared/TablesExpanded/TableSkeleton";

interface Props {
  id: number;
  licenseName: string;
  address: string;
  addressType: string;
}

const HongKong: React.FC = () => {
  const [hongKongData, setHongKongData] = useState<Props[]>([]);
  const [filteredData, setFilteredData] = useState<Props[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/hong-kong");
        const data = await res.json();
        setHongKongData(data["hongKongData"]);
        setFilteredData(data["hongKongData"]);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = hongKongData.filter((item) =>
      item.licenseName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtered);
  };

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
        <SearchBar size="medium" onSearch={(value) => handleSearch(value)} />
        <Pagination />
      </div>
      {loading ? <TableSkeleton /> : <Table tableData={filteredData} />}
    </div>
  );
};

export default HongKong;
