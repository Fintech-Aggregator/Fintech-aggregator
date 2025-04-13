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
            String(value).toLowerCase().includes(filters.searchTerm.toLowerCase())
          )
        );
      }

      if (filters.licenseName) {
        filtered = filtered.filter((item) =>
          item.licenseName.toLowerCase().includes(filters.licenseName.toLowerCase())
        );
      }
      if (filters.adress) {
        filtered = filtered.filter((item) =>
          item.address.toLowerCase().includes(filters.adress.toLowerCase())
        );
      }
      if (filters.addressType && filters.addressType !== "") {
        filtered = filtered.filter((item) => item.addressType === filters.addressType);
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
    const uniqueTypes = Array.from(new Set(hongKongData.map((item) => item.addressType)));
    return uniqueTypes;
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const getLink = async () => {
    try {
      const response = await fetch("/api/hong-kong/csv");

      if (!response.ok) {
        console.error("Download failed");
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "hongKong.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  return (
    <div>
      <div className={styles.mains}>
        <SearchBar onSearch={(value) => handleSearch(value)} />
        <div className="flex gap-4 relative">
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
          <button onClick={() => setIsDrawerOpen((prev) => !prev)} className="cursor-pointer border w-10 h-10 border-black rounded-xl flex flex-col gap-1 justify-evenly p-2">
            <div className="bg-black w-full h-[2px]"></div>
            <div className="bg-black w-full h-[2px]"></div>
            <div className="bg-black w-full h-[2px]"></div>
          </button>
          {/* Drawer */}
          {isDrawerOpen && (
            <div className="absolute right-0 mt-10 bg-white border border-black rounded p-2 shadow-md flex flex-col gap-2 w-44 z-20 items-center">
              <h2 className="font-semibold ">Download</h2>
              <hr />
              <div></div>
            </div>
          )}
        </div>
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
            <div className="text-lg">Last Update: {hongKongData[0].lastUpdatedDate.slice(0, 10)}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default HongKong;
