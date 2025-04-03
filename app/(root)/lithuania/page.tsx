"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "@/src/components/shared/HomeContentTemaplate/search-bar";
import Pagination from "@/src/components/shared/TablesExpanded/pagination";
import { Table } from "@/src/components/shared/TablesExpanded/Table";
import { TableSkeleton } from "@/src/components/shared/TablesExpanded/TableSkeleton";
import styles from "../all-tables-style.module.css";

interface Props {
  id: number;
  Address: string;
  FirmName: string;
  Licence: string;
  lastUpdatedDate: string;
}
const Lithuania: React.FC = () => {
  const [LithuaniaData, setLithuaniaData] = useState<Props[]>([]);
  const [filteredData, setFilteredData] = useState<Props[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    searchTerm: "",
    id: null as number | null,
    Address: "",
    FirmName: "",
    Licence: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/lithuania");
        const data = await res.json();
        setLithuaniaData(data["lithuania"]);
        setFilteredData(data["lithuania"]);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = LithuaniaData;

      if (filters.searchTerm) {
        filtered = filtered.filter((item) =>
          Object.values(item).some((value) =>
            String(value)
              .toLowerCase()
              .includes(filters.searchTerm.toLowerCase())
          )
        );
      }

      if (filters.Address) {
        filtered = filtered.filter((item) =>
          item.Address.toLowerCase().includes(filters.Address.toLowerCase())
        );
      }
      if (filters.FirmName) {
        filtered = filtered.filter((item) =>
          item.FirmName.toLowerCase().includes(filters.FirmName.toLowerCase())
        );
      }
      if (filters.Licence && filters.Licence !== "") {
        filtered = filtered.filter((item) => item.Licence === filters.Licence);
      }
      setFilteredData(filtered);
    };

    applyFilters();
  }, [filters]);

  const handleSearch = (term: string) => {
    setFilters((prev) => ({ ...prev, searchTerm: term }));
  };
  const handleFilterByAdress = (name: string) => {
    setFilters((prev) => ({ ...prev, Address: name }));
  };

  const handleFilterByFirmName = (name: string) => {
    setFilters((prev) => ({ ...prev, FirmName: name }));
  };

  const handleFilterByLicence = (Licence: string) => {
    setFilters((prev) => ({ ...prev, Licence }));
  };

  const getUniqueLicence = () => {
    const uniqueTypes = Array.from(
      new Set(LithuaniaData.map((item) => item.Licence))
    );
    return uniqueTypes;
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  return (
    <div>
      <div className={styles.mains}>
        <SearchBar onSearch={(value) => handleSearch(value)} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      {loading ? (
        <TableSkeleton lables={["Adress", "FirmName", "Licence"]} />
      ) : (
        <>
          <Table
            lables={["Adress", "FirmName", "Licence"]}
            tableData={filteredData}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onFilterByLicenseName={handleFilterByAdress}
            onFilterByAdress={handleFilterByFirmName}
            addressTypes={getUniqueLicence()}
            onFilterByAddressType={handleFilterByLicence}
          />
          <div className="relative mb-2 flex justify-center items-center">
            <div className="text-lg">
              Last Update: {LithuaniaData[0].lastUpdatedDate.slice(0, 10)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Lithuania;
