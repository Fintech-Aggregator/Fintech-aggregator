"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "@/components/shared/HomeContentTemaplate/search-bar";
import Pagination from "@/components/shared/TablesExpanded/pagination";
import { Table } from "@/components/shared/TablesExpanded/Table";
import { TableSkeleton } from "@/components/shared/TablesExpanded/TableSkeleton";
import styles from "./hong-kong-list.module.css";

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
  const [filters, setFilters] = useState({
    searchTerm: "",
    id: null as number | null,
    licenseName: "",
    adress: "",
  });

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

  useEffect(() => {
    const applyFilters = () => {
      let filtered = hongKongData;

      if (filters.searchTerm) {
        filtered = filtered.filter((item) =>
          Object.values(item).some((value) =>
            String(value)
              .toLowerCase()
              .includes(filters.searchTerm.toLowerCase())
          )
        );
      }

      if (filters.id !== null) {
        filtered = filtered.filter((item) => item.id === filters.id);
      }

      if (filters.licenseName) {
        filtered = filtered.filter((item) =>
          item.licenseName
            .toLowerCase()
            .includes(filters.licenseName.toLowerCase())
        );
      }
      if (filters.adress) {
        filtered = filtered.filter((item) =>
          item.address.toLowerCase().includes(filters.adress.toLowerCase())
        );
      }

      setFilteredData(filtered);
    };

    applyFilters();
  }, [filters, hongKongData]);

  const handleSearch = (term: string) => {
    setFilters((prev) => ({ ...prev, searchTerm: term }));
  };

  const handleFilterById = (id: number | null) => {
    setFilters((prev) => ({ ...prev, id }));
  };

  const handleFilterByLicenseName = (name: string) => {
    setFilters((prev) => ({ ...prev, licenseName: name }));
  };
  const handleFilterByAdress = (name: string) => {
    setFilters((prev) => ({ ...prev, adress: name }));
  };
  return (
    <div>
      <div className={styles.mains}>
        <SearchBar size="medium" onSearch={(value) => handleSearch(value)} />
        <Pagination />
      </div>
      {loading ? (
        <TableSkeleton />
      ) : (
        <Table
          tableData={filteredData}
          onFilterById={handleFilterById}
          onFilterByLicenseName={handleFilterByLicenseName}
          onFilterByAdress={handleFilterByAdress}
        />
      )}
    </div>
  );
};

export default HongKong;
