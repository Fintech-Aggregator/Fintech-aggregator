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
  });

  // Завантаження даних
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

  // Застосування фільтрів
  useEffect(() => {
    const applyFilters = () => {
      let filtered = hongKongData;

      // Фільтруємо за пошуковим терміном
      if (filters.searchTerm) {
        filtered = filtered.filter((item) =>
          Object.values(item).some((value) =>
            String(value)
              .toLowerCase()
              .includes(filters.searchTerm.toLowerCase())
          )
        );
      }

      // Фільтруємо за ID
      if (filters.id !== null) {
        filtered = filtered.filter((item) => item.id === filters.id);
      }

      setFilteredData(filtered);
    };

    applyFilters();
  }, [filters, hongKongData]); // Викликається при зміні фільтрів або даних

  // Оновлення пошукового терміну
  const handleSearch = (term: string) => {
    setFilters((prev) => ({ ...prev, searchTerm: term }));
  };

  // Оновлення фільтру за ID
  const handleFilterById = (id: number | null) => {
    setFilters((prev) => ({ ...prev, id }));
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
        <Table tableData={filteredData} onFilterById={handleFilterById} />
      )}
    </div>
  );
};

export default HongKong;
