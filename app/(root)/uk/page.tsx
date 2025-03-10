"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "@/src/components/shared/HomeContentTemaplate/search-bar";
import Pagination from "@/src/components/shared/TablesExpanded/pagination";
import { Table } from "@/src/components/shared/TablesExpanded/Table";
import { TableSkeleton } from "@/src/components/shared/TablesExpanded/TableSkeleton";
import styles from "@/app/(root)/hong-kong/hong-kong-list.module.css";
interface Props {
  id: number;
  licenseName: string;
  address: string;
  addressType: string;
}

const UkTable: React.FC = () => {
  const [eMoneyFirmsData, setEMoneyFirmsData] = useState<Props[]>([]);
  const [filteredData1, setFilteredData1] = useState<Props[]>([]);
  const [firmPsdPermissionData, setFirmPsdPermissionData] = useState<Props[]>([]); // prettier-ignore
  const [filters, setFilters] = useState({
    searchTerm: "",
    id: null as number | null,
    licenseName: "",
    adress: "",
    addressType: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/uk/e-money-firms");
        const data = await res.json();
        setEMoneyFirmsData(data["eMoneyFirms"]);
        setFilteredData1(data["eMoneyFirms"]);
      } catch (error) {
        console.log(error);
      }
      setLoading1(false);

      try {
        const res = await fetch("/api/uk/firm-psd-permission");
        const data = await res.json();
        setFirmPsdPermissionData(data["firmPSDPermission"]);
      } catch (error) {
        console.log(error);
      }
      setLoading2(false);
    };

    fetchData();
  }, []);
  useEffect(() => {
    const applyFilters = () => {
      let filtered = eMoneyFirmsData;

      if (filters.searchTerm) {
        filtered = filtered.filter((item) =>
          Object.values(item).some((value) =>
            String(value)
              .toLowerCase() //test
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
      setFilteredData1(filtered);
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
      new Set(eMoneyFirmsData.map((item: any) => item.EmoneyRegisterStatus))
    );
    return uniqueTypes;
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredData1.length / rowsPerPage);
  return (
    <div>
      <div className={styles.mains}>
        <SearchBar size="medium" onSearch={(value) => handleSearch(value)} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      {loading1 && loading2 ? (
        <TableSkeleton />
      ) : (
        <Table
          tableData={filteredData1}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onFilterByLicenseName={handleFilterByLicenseName}
          onFilterByAdress={handleFilterByAdress}
          addressTypes={getUniqueAddressTypes()}
          onFilterByAddressType={handleFilterByAddressType}
        />
        // <div>
        //   <h1 className="text-2xl font-bold text-red-950 mb-4">Table 2</h1>
        //   <div className="space-y-4">
        //     {firmPsdPermissionData.map((row: any) => (
        //       <div className="p-4 border rounded-lg shadow-md" key={row.FRN}>
        //         <div className="font-semibold">{row.FRN}</div>
        //         <div>{row.FirmName}</div>
        //         <div>{row.PSDFirmStatus}</div>
        //         <div>{row.PSDStatusEffectiveDate}</div>
        //       </div>
        //     ))}
        //   </div>
        // </div>
      )}
    </div>
  );
};

export default UkTable;
