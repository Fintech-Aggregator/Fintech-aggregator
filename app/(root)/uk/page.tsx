"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "@/src/components/shared/HomeContentTemaplate/search-bar";
import Pagination from "@/src/components/shared/TablesExpanded/pagination";
import { Table } from "@/src/components/shared/TablesExpanded/Table";
import { TableSkeleton } from "@/src/components/shared/TablesExpanded/TableSkeleton";
import styles from "../all-tables-style.module.css";

interface RowProps {
  licenseName: string;
  address: string;
  addressType: string;
}
interface Props1 {
  EmoneyStatusEffectiveDate: string;
  FirmName: string;
  EmoneyRegisterStatus: string;
}
interface Props2 {
  PSDStatusEffectiveDate: string;
  FirmName: string;
  PSDFirmStatus: string;
}

const UkTable: React.FC = () => {
  const [eMoneyFirmsData, setEMoneyFirmsData] = useState<Props1[]>([]);
  const [filteredData1, setFilteredData1] = useState<Props1[]>([]);

  const [filteredData2, setFilteredData2] = useState<Props2[]>([]);
  const [firmPsdPermissionData, setFirmPsdPermissionData] = useState<Props2[]>(
    []
  );

  const [filters1, setFilters1] = useState({
    searchTerm: "",
    EmoneyStatusEffectiveDate: "",
    FirmName: "",
    EmoneyRegisterStatus: "",
  });

  const [filters2, setFilters2] = useState({
    searchTerm: "",
    PSDStatusEffectiveDate: "",
    FirmName: "",
    PSDFirmStatus: "",
  });

  const [currentPage1, setCurrentPage1] = useState(0);
  const [currentPage2, setCurrentPage2] = useState(0);
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
        setFilteredData2(data["firmPSDPermission"]);
      } catch (error) {
        console.log(error);
      }
      setLoading2(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const applyFilters1 = () => {
      let filtered = eMoneyFirmsData;

      if (filters1.searchTerm) {
        filtered = filtered.filter((item) =>
          Object.values(item).some((value) =>
            String(value)
              .toLowerCase()
              .includes(filters1.searchTerm.toLowerCase())
          )
        );
      }

      if (filters1.EmoneyStatusEffectiveDate) {
        filtered = filtered.filter((item) =>
          item.EmoneyStatusEffectiveDate.toLowerCase().includes(
            filters1.EmoneyStatusEffectiveDate.toLowerCase()
          )
        );
      }
      if (filters1.FirmName) {
        filtered = filtered.filter((item) =>
          item.FirmName.toLowerCase().includes(filters1.FirmName.toLowerCase())
        );
      }
      if (filters1.EmoneyRegisterStatus) {
        filtered = filtered.filter(
          (item) => item.EmoneyRegisterStatus === filters1.EmoneyRegisterStatus
        );
      }
      setFilteredData1(filtered);
    };

    applyFilters1();
  }, [filters1]);

  useEffect(() => {
    const applyFilters2 = () => {
      let filtered = firmPsdPermissionData || [];

      if (filters2.searchTerm) {
        filtered = filtered.filter((item) =>
          Object.values(item).some((value) =>
            String(value)
              .toLowerCase()
              .includes(filters2.searchTerm.toLowerCase())
          )
        );
      }

      if (filters2.PSDStatusEffectiveDate) {
        filtered = filtered.filter((item) =>
          item.PSDStatusEffectiveDate.toLowerCase().includes(
            filters2.PSDStatusEffectiveDate.toLowerCase()
          )
        );
      }
      if (filters2.FirmName) {
        filtered = filtered.filter((item) =>
          item.FirmName.toLowerCase().includes(filters2.FirmName.toLowerCase())
        );
      }
      if (filters2.PSDFirmStatus) {
        filtered = filtered.filter(
          (item) => item.PSDFirmStatus === filters2.PSDFirmStatus
        );
      }
      setFilteredData2(filtered);
    };

    applyFilters2();
  }, [filters2]);

  const handleSearch1 = (term: string) => {
    setFilters1((prev) => ({ ...prev, searchTerm: term }));
  };

  const handleSearch2 = (term: string) => {
    setFilters2((prev) => ({ ...prev, searchTerm: term }));
  };

  const handleFilterByEmoneyStatusEffectiveDate = (name: string) => {
    setFilters1((prev) => ({ ...prev, EmoneyStatusEffectiveDate: name }));
  };

  const handleFilterByFirmName1 = (name: string) => {
    setFilters1((prev) => ({ ...prev, FirmName: name }));
  };

  const handleFilterByEmoneyRegisterStatus = (addressType: string) => {
    setFilters1((prev) => ({ ...prev, EmoneyRegisterStatus: addressType }));
  };

  const handleFilterByFirmName2 = (name: string) => {
    setFilters2((prev) => ({ ...prev, FirmName: name }));
  };

  const handleFilterByPSDFirmStatus = (addressType: string) => {
    setFilters2((prev) => ({ ...prev, PSDFirmStatus: addressType }));
  };

  const getUniqueAddressTypes1 = () => {
    const uniqueTypes = Array.from(
      new Set(eMoneyFirmsData.map((item: any) => item.EmoneyRegisterStatus))
    );
    return uniqueTypes;
  };
  const getUniqueAddressTypes2 = () => {
    const uniqueTypes = Array.from(
      new Set(firmPsdPermissionData.map((item: any) => item.PSDFirmStatus))
    );
    return uniqueTypes;
  };

  const handlePageChange1 = (page: number) => {
    setCurrentPage1(page);
  };
  const handlePageChange2 = (page: number) => {
    setCurrentPage2(page);
  };
  const totalPages1 = Math.ceil(filteredData1.length / rowsPerPage);
  const totalPages2 = Math.ceil(filteredData2.length / rowsPerPage);

  return (
    <div>
      {loading1 && loading2 ? (
        <>
          <div className={styles.mains}>
            <SearchBar
              size="medium"
              onSearch={(value) => handleSearch1(value)}
            />
            <Pagination
              totalPages={totalPages1}
              currentPage={currentPage1}
              onPageChange={handlePageChange1}
            />
          </div>
          <TableSkeleton
            lables={[
              "EmoneyStatusEffectiveDate",
              "FirmName",
              "EmoneyRegisterStatus",
            ]}
          />
          <div className={styles.mains}>
            <SearchBar
              size="medium"
              onSearch={(value) => handleSearch2(value)}
            />
            <Pagination
              totalPages={totalPages2}
              currentPage={currentPage2}
              onPageChange={handlePageChange2}
            />
          </div>
          <TableSkeleton
            lables={["PSDStatusEffectiveDate", "FirmName", "PSDFirmStatus"]}
          />
        </>
      ) : (
        <>
          <div className={styles.mains}>
            <SearchBar
              size="medium"
              onSearch={(value) => handleSearch1(value)}
            />
            <Pagination
              totalPages={totalPages1}
              currentPage={currentPage1}
              onPageChange={handlePageChange1}
            />
          </div>
          <Table
            lables={[
              "EmoneyStatusEffectiveDate",
              "FirmName",
              "EmoneyRegisterStatus",
            ]}
            tableData={filteredData1}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage1}
            onPageChange={handlePageChange1}
            onFilterByLicenseName={handleFilterByEmoneyStatusEffectiveDate}
            onFilterByAdress={handleFilterByFirmName1}
            addressTypes={getUniqueAddressTypes1()}
            onFilterByAddressType={handleFilterByEmoneyRegisterStatus}
          />
          <div className={styles.mains}>
            <SearchBar
              size="medium"
              onSearch={(value) => handleSearch2(value)}
            />
            <Pagination
              totalPages={totalPages2}
              currentPage={currentPage2}
              onPageChange={handlePageChange2}
            />
          </div>
          <Table
            lables={["PSDStatusEffectiveDate", "FirmName", "PSDFirmStatus"]}
            tableData={filteredData2}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage2}
            onPageChange={handlePageChange2}
            onFilterByLicenseName={handleFilterByEmoneyStatusEffectiveDate}
            onFilterByAdress={handleFilterByFirmName2}
            addressTypes={getUniqueAddressTypes2()}
            onFilterByAddressType={handleFilterByPSDFirmStatus}
          />
        </>
      )}
    </div>
  );
};

export default UkTable;
