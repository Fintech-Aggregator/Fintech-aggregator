"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import SearchBar from "@/src/components/shared/HomeContentTemaplate/search-bar";
import Pagination from "@/src/components/shared/TablesExpanded/pagination";
import { Table } from "@/src/components/shared/TablesExpanded/Table";
import { TableSkeleton } from "@/src/components/shared/TablesExpanded/TableSkeleton";
import styles from "../all-tables-style.module.css";
import { Drawer } from "@/src/components/ui/drawer";
import type { RowProps } from "@/src/components/shared/TablesExpanded/Table";

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const tableRows: RowProps[] = filteredData.map((item) => ({
    id: item.id,
    address: item.FirmName,
    licenseName: item.Address,
    addressType: item.Licence,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/lithuania");
        const data = await res.json();
        setLithuaniaData(data["lithuania"]);
        setFilteredData(data["lithuania"]);
      } catch (error) {
        console.error(error);
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
      setCurrentPage(0);
    };

    applyFilters();
  }, [filters, LithuaniaData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsDrawerOpen(false);
      }
    };

    if (isDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDrawerOpen]);

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
        <div className="flex gap-4 relative items-center justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />

          <div className={styles.drawer}>
            <button
              onClick={() => setIsDrawerOpen((prev) => !prev)}
              className="cursor-pointer border w-10 h-10 border-black rounded-xl flex flex-col gap-1 justify-evenly p-2"
            >
              <div className="bg-black w-full h-[2px]"></div>
              <div className="bg-black w-full h-[2px]"></div>
              <div className="bg-black w-full h-[2px]"></div>
            </button>
            <Drawer
              register="lithuania"
              isDrawerOpen={isDrawerOpen}
              ref={drawerRef}
            />
          </div>
        </div>
      </div>
      {loading ? (
        <TableSkeleton lables={["Adress", "FirmName", "Licence"]} />
      ) : (
        <>
          <Table
            lables={["Adress", "FirmName", "Licence"]}
            tableData={tableRows}
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
