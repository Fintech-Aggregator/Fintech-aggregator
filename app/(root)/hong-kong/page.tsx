"use client";
import React, { useEffect, useRef, useState } from "react";
import SearchBar from "@/src/components/shared/HomeContentTemaplate/search-bar";
import Pagination from "@/src/components/shared/TablesExpanded/pagination";
import { Table } from "@/src/components/shared/TablesExpanded/Table";
import { TableSkeleton } from "@/src/components/shared/TablesExpanded/TableSkeleton";
import styles from "../all-tables-style.module.css";
import { FileDrawer } from "@/src/components/ui/file-drawer";
import Image from "next/image";

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
  const rowsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/hong-kong");
        const data = await res.json();
        setHongKongData(data["hongKongData"]);
        setFilteredData(data["hongKongData"]);
      } catch (error) {
        console.error(error);
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
          Object.values(item).some((value) => String(value).toLowerCase().includes(filters.searchTerm.toLowerCase()))
        );
      }

      if (filters.licenseName) {
        filtered = filtered.filter((item) =>
          item.licenseName.toLowerCase().includes(filters.licenseName.toLowerCase())
        );
      }
      if (filters.adress) {
        filtered = filtered.filter((item) => item.address.toLowerCase().includes(filters.adress.toLowerCase()));
      }
      if (filters.addressType && filters.addressType !== "") {
        filtered = filtered.filter((item) => item.addressType === filters.addressType);
      }
      setFilteredData(filtered);
      setCurrentPage(0);
    };

    applyFilters();
  }, [filters, hongKongData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
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
    const uniqueTypes = Array.from(new Set(hongKongData.map((item) => item.addressType)));
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
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
          <div className={styles.drawer}>
            <div className="cursor-pointer border border-black rounded-xl w-10 h-10 flex items-center justify-center">
              <Image
                width={20}
                height={20}
                src={"/images/download.webp"}
                onClick={() => setIsDrawerOpen((prev) => !prev)}
                className="w-8 h-8"
                alt={"download icon"}
              />
            </div>
            <FileDrawer register="hong-kong" isDrawerOpen={isDrawerOpen} ref={drawerRef} />
          </div>
        </div>
      </div>
      {loading ? (
        <TableSkeleton lables={["Company Name", "Address", "License Type"]} />
      ) : (
        <>
          <Table
            lables={["Company Name", "Address", "License Type"]}
            tableData={filteredData.map((item) => {
              const newItem = { ...item, addressType: "Money Service Operator" };
              return newItem;
            })}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onFilterByLicenseName={handleFilterByLicenseName}
            onFilterByAdress={handleFilterByAdress}
            addressTypes={getUniqueAddressTypes()}
            onFilterByAddressType={handleFilterByAddressType}
          />
          <div className="relative mb-2 flex justify-center items-center">
            <div className="text-lg">Last Update: {hongKongData[0]?.lastUpdatedDate.slice(0, 10)}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default HongKong;
