"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "@/src/components/shared/HomeContentTemaplate/search-bar";
import Pagination from "@/src/components/shared/TablesExpanded/pagination";
import { Table } from "@/src/components/shared/TablesExpanded/Table";
import { TableSkeleton } from "@/src/components/shared/TablesExpanded/TableSkeleton";
import styles from "../all-tables-style.module.css";

interface Props {
  id: number;
  licenseName: string;
  address: string;
  addressType: string;
  lastUpdatedDate: string;
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
    addressType: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;
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
      if (filters.addressType && filters.addressType !== "") {
        filtered = filtered.filter(
          (item) => item.addressType === filters.addressType
        );
      }
      setFilteredData(filtered);
    };

    applyFilters();
  }, [filters]);

  const handleSearch = (term: string) => {
    setFilters((prev) => ({ ...prev, searchTerm: term }));
  };
  const handleFilterByLicenseName = (name: string) => {
    setFilters((prev) => ({ ...prev, licenseName: name }));
  };

  const handleFilterByAdress = (name: string) => {
    setFilters((prev) => ({ ...prev, adress: name }));
  };

  const handleFilterByAddressType = (addressType: string) => {
    setFilters((prev) => ({ ...prev, addressType }));
  };

  const getUniqueAddressTypes = () => {
    const uniqueTypes = Array.from(
      new Set(hongKongData.map((item) => item.addressType))
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
        <TableSkeleton lables={["LicenseName", "Adress", "AdressType"]} />
      ) : (
        <>
          <Table
            lables={["LicenseName", "Adress", "AdressType"]}
            tableData={filteredData}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onFilterByLicenseName={handleFilterByLicenseName}
            onFilterByAdress={handleFilterByAdress}
            addressTypes={getUniqueAddressTypes()}
            onFilterByAddressType={handleFilterByAddressType}
          />
          <div className="relative mb-2 flex justify-center items-center">
            <div className="text-lg">
              Last Update: {hongKongData[0].lastUpdatedDate.slice(0, 10)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HongKong;
