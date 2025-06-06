"use client";
import React, { useEffect, useRef, useState } from "react";
import SearchBar from "@/src/components/shared/HomeContentTemaplate/search-bar";
import Pagination from "@/src/components/shared/TablesExpanded/pagination";
import { Table } from "@/src/components/shared/TablesExpanded/Table";
import { TableSkeleton } from "@/src/components/shared/TablesExpanded/TableSkeleton";
import type { RowProps } from "@/src/components/shared/TablesExpanded/Table";
import styles from "@/app/(root)/all-tables-style.module.css";
import Image from "next/image";
import CountryFilter from "./country-filter";

interface UnifiedProps {
  id: number;
  licenseName: string;
  address: string;
  addressType: string;
  lastUpdatedDate: string;
  country: string;
}

const CombinedTable: React.FC = () => {
  const [allData, setAllData] = useState<UnifiedProps[]>([]);
  const [filteredData, setFilteredData] = useState<UnifiedProps[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    searchTerm: "",
    address: "",
    licenseName: "",
    addressType: "",
    country: "",
  });

  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const getStatusFromType = (addressType: string) => {
    if (addressType.includes("Cancelled")) return "Cancelled";
    else if (addressType.includes("Registered")) return "Registered";
    else if (addressType.includes("Authorised")) return "Authorised";

    return "Allowed";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hkRes, ltRes, ukEmRes, ukPsdRes] = await Promise.all([
          fetch("/api/hong-kong"),
          fetch("/api/lithuania"),
          fetch("/api/uk/e-money-firms"),
          fetch("/api/uk/firm-psd-permission"),
        ]);
        const hkRaw = await hkRes.json();
        const ltRaw = await ltRes.json();
        const ukEmRaw = await ukEmRes.json();
        const ukPsdRaw = await ukPsdRes.json();

        const hongKongData: UnifiedProps[] = hkRaw.hongKongData.map(
          (item: any) => ({
            id: item.id,
            licenseName: item.licenseName,
            address: item.address,
            addressType: item.addressType,
            lastUpdatedDate: item.lastUpdatedDate,
            country: "Hong Kong",
          })
        );

        const lithuaniaData: UnifiedProps[] = ltRaw.lithuania.map(
          (item: any) => ({
            id: item.id,
            licenseName: item.FirmName,
            address: item.Address,
            addressType: item.Licence,
            lastUpdatedDate: item.lastUpdatedDate,
            country: "Lithuania",
          })
        );

        const ukEmoneyData: UnifiedProps[] = ukEmRaw.eMoneyFirms.map(
          (item: any) => ({
            id: item.FRN,
            licenseName: item.FirmName,
            address: item.EmoneyStatusEffectiveDate,
            addressType: item.EmoneyRegisterStatus,
            lastUpdatedDate: item.lastUpdatedDate,
            country: "UK - E-Money",
          })
        );

        const ukPsdData: UnifiedProps[] = ukPsdRaw.firmPSDPermission.map(
          (item: any) => ({
            id: item.FRN,
            licenseName: item.FirmName,
            address: item.PSDStatusEffectiveDate || "-",
            addressType: item.PSDFirmStatus,
            lastUpdatedDate: item.lastUpdatedDate,
            country: "UK - PSD Permission",
          })
        );

        const combined = [
          ...hongKongData,
          ...lithuaniaData,
          ...ukEmoneyData,
          ...ukPsdData,
        ];
        setAllData(combined);
        setFilteredData(combined);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = allData;

    if (filters.searchTerm) {
      filtered = filtered.filter((item) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.address) {
      filtered = filtered.filter((item) => {
        const status = getStatusFromType(item.addressType);
        return status.toLowerCase().includes(filters.address.toLowerCase());
      });
    }

    if (filters.licenseName) {
      filtered = filtered.filter((item) =>
        item.licenseName
          .toLowerCase()
          .includes(filters.licenseName.toLowerCase())
      );
    }
    if (filters.addressType) {
      filtered = filtered.filter(
        (item) => item.addressType === filters.addressType
      );
    }
    if (filters.country) {
      filtered = filtered.filter((item) => item.country === filters.country);
    }

    setFilteredData(filtered);
    setCurrentPage(0);
  }, [filters, allData]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setIsDrawerOpen(false);
      }
    };
    if (isDrawerOpen) document.addEventListener("mousedown", handleOutside);
    else document.removeEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isDrawerOpen]);

  const handleSearch = (term: string) =>
    setFilters((prev) => ({ ...prev, searchTerm: term }));
  const handleFilterByAddress = (address: string) =>
    setFilters((prev) => ({ ...prev, address }));
  const handleFilterByLicenseName = (name: string) =>
    setFilters((prev) => ({ ...prev, licenseName: name }));
  const handleFilterByAddressType = (type: string) =>
    setFilters((prev) => ({ ...prev, addressType: type }));
  const handleFilterByCountry = (country: string) =>
    setFilters((prev) => ({ ...prev, country }));

  const handlePageChange = (page: number) => setCurrentPage(page);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const tableRows: RowProps[] = filteredData.map((item) => {
    const status = getStatusFromType(item.addressType);
    return {
      id: item.id,
      address: status,
      licenseName: item.licenseName,
      addressType: item.addressType,
      extraColumn: item.country,
    };
  });

  const addressTypes = Array.from(new Set(allData.map((i) => i.addressType)));
  const countries = Array.from(new Set(allData.map((i) => i.country)));

  return (
    <div>
      <div className={styles.mainsWithCountry}>
        <SearchBar onSearch={handleSearch} />

        <div className="flex gap-4 items-center">
          <CountryFilter
            value={filters.country}
            options={countries}
            onChange={handleFilterByCountry}
          />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      {loading ? (
        <TableSkeleton
          lables={["Company Name", "Status", "License Type", "Country"]}
          columnOrder={["license", "addressType", "address"]}
        />
      ) : (
        <>
          <Table
            lables={["Company Name", "Status", "License Type", "Country"]}
            tableData={tableRows}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onFilterByLicenseName={handleFilterByLicenseName}
            onFilterByAdress={handleFilterByAddress}
            addressTypes={addressTypes}
            onFilterByAddressType={handleFilterByAddressType}
            extraFilterOptions={countries}
            onExtraFilter={handleFilterByCountry}
            columnOrder={["license", "addressType", "address"]}
          />
          <div className="relative mb-2 flex justify-center items-center">
            <div className="text-lg">
              Last Update:{" "}
              {allData.length > 0 && allData[0].lastUpdatedDate.slice(0, 10)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CombinedTable;
