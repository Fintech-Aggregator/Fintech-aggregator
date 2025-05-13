"use client";
import React, { useEffect, useRef, useState } from "react";
import SearchBar from "@/src/components/shared/HomeContentTemaplate/search-bar";
import Pagination from "@/src/components/shared/TablesExpanded/pagination";
import { Table } from "@/src/components/shared/TablesExpanded/Table";
import { TableSkeleton } from "@/src/components/shared/TablesExpanded/TableSkeleton";
import styles from "../all-tables-style.module.css";
import { FileDrawer } from "@/src/components/ui/file-drawer";
import type { RowProps } from "@/src/components/shared/TablesExpanded/Table";
import Image from "next/image";

interface Props1 {
  FRN: number;
  EmoneyStatusEffectiveDate: string;
  FirmName: string;
  EmoneyRegisterStatus: string;
  lastUpdatedDate: string;
}
interface Props2 {
  FRN: number;
  FirmName: string;
  PSDStatusEffectiveDate: string;
  PSDFirmStatus: string;
  lastUpdatedDate: string;
}

interface EMoneyFirmsData {
  eMoneyFirms: Props1[];
}

interface FirmPSDPermissionData {
  firmPSDPermission: Props2[];
}

const UkTable: React.FC = () => {
  const [eMoneyFirmsData, setEMoneyFirmsData] = useState<Props1[]>([]);
  const [filteredData1, setFilteredData1] = useState<Props1[]>([]);

  const [filteredData2, setFilteredData2] = useState<Props2[]>([]);
  const [firmPsdPermissionData, setFirmPsdPermissionData] = useState<Props2[]>([]);
  const [loading, setLoading] = useState(true);

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
  const rowsPerPage = 10;

  const [currentPage1, setCurrentPage1] = useState(0);
  const [currentPage2, setCurrentPage2] = useState(0);
  const [isDrawerOpen1, setIsDrawerOpen1] = useState(false);
  const [isDrawerOpen2, setIsDrawerOpen2] = useState(false);
  const drawerRef1 = useRef<HTMLDivElement>(null);
  const drawerRef2 = useRef<HTMLDivElement>(null);

  const tableRows1: RowProps[] = filteredData1.map((item) => ({
    id: item.FRN,
    address: item.EmoneyStatusEffectiveDate,
    addressType: item.EmoneyRegisterStatus,
    licenseName: item.FirmName,
  }));

  const tableRows2: RowProps[] = filteredData2.map((item) => ({
    id: item.FRN,
    address: item.PSDStatusEffectiveDate === "" ? "-" : item.PSDStatusEffectiveDate,
    addressType: item.PSDFirmStatus,
    licenseName: item.FirmName,
  }));

  useEffect(() => {
    const fetchData = async () => {
      const urls = ["/api/uk/e-money-firms", "/api/uk/firm-psd-permission"];
      try {
        const data = await Promise.all(urls.map((url) => fetch(url).then((res) => res.json())));
        const eMoneyFirmsData = data[0] as EMoneyFirmsData;
        const firmPSDPermission = data[1] as FirmPSDPermissionData;
        setEMoneyFirmsData(eMoneyFirmsData.eMoneyFirms);
        setFirmPsdPermissionData(firmPSDPermission.firmPSDPermission);

        setFilteredData1(eMoneyFirmsData.eMoneyFirms);
        setFilteredData2(firmPSDPermission.firmPSDPermission);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const applyFilters1 = () => {
      let filtered = eMoneyFirmsData;

      if (filters1.searchTerm) {
        filtered = filtered.filter((item) =>
          Object.values(item).some((value) =>
            String(value).toLowerCase().includes(filters1.searchTerm.toLowerCase())
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
        filtered = filtered.filter((item) => item.EmoneyRegisterStatus === filters1.EmoneyRegisterStatus);
      }
      setFilteredData1(filtered);
    };

    applyFilters1();
    setCurrentPage1(0);
  }, [filters1, eMoneyFirmsData]);

  useEffect(() => {
    const applyFilters2 = () => {
      let filtered = firmPsdPermissionData || [];

      if (filters2.searchTerm) {
        filtered = filtered.filter((item) =>
          Object.values(item).some((value) =>
            String(value).toLowerCase().includes(filters2.searchTerm.toLowerCase())
          )
        );
      }

      if (filters2.PSDStatusEffectiveDate) {
        filtered = filtered.filter((item) =>
          item.PSDStatusEffectiveDate.toLowerCase().includes(filters2.PSDStatusEffectiveDate.toLowerCase())
        );
      }
      if (filters2.FirmName) {
        filtered = filtered.filter((item) =>
          item.FirmName.toLowerCase().includes(filters2.FirmName.toLowerCase())
        );
      }
      if (filters2.PSDFirmStatus) {
        filtered = filtered.filter((item) => item.PSDFirmStatus === filters2.PSDFirmStatus);
      }
      setFilteredData2(filtered);
      setCurrentPage2(0);
    };

    applyFilters2();
  }, [filters2, firmPsdPermissionData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef1.current && !drawerRef1.current.contains(event.target as Node)) {
        setIsDrawerOpen1(false);
      }
    };

    if (isDrawerOpen1) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDrawerOpen1]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef2.current && !drawerRef2.current.contains(event.target as Node)) {
        setIsDrawerOpen2(false);
      }
    };

    if (isDrawerOpen2) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDrawerOpen2]);

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
  const handleFilterByPSDStatusEffectiveDate = (name: string) => {
    setFilters2((prev) => ({ ...prev, PSDStatusEffectiveDate: name }));
  };
  const handleFilterByFirmName2 = (name: string) => {
    setFilters2((prev) => ({ ...prev, FirmName: name }));
  };

  const handleFilterByPSDFirmStatus = (addressType: string) => {
    setFilters2((prev) => ({ ...prev, PSDFirmStatus: addressType }));
  };

  const getUniqueAddressTypes1 = () => {
    const uniqueTypes = Array.from(new Set(eMoneyFirmsData.map((item: any) => item.EmoneyRegisterStatus)));
    return uniqueTypes;
  };
  const getUniqueAddressTypes2 = () => {
    const uniqueTypes = Array.from(new Set(firmPsdPermissionData.map((item: any) => item.PSDFirmStatus)));
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
      {loading ? (
        <>
          <div className={styles.mains}>
            <SearchBar onSearch={(value) => handleSearch1(value)} />
            <div className="flex gap-4 relative items-center justify-center">
              <Pagination
                totalPages={totalPages1}
                currentPage={currentPage1}
                onPageChange={handlePageChange1}
              />
              <div className={styles.drawer}>
                <div className="cursor-pointer border border-black rounded-xl w-10 h-10 flex items-center justify-center">
                  <Image
                    width={20}
                    height={20}
                    src={"/images/download.jpg"}
                    onClick={() => setIsDrawerOpen1((prev) => !prev)}
                    className="w-8 h-8"
                    alt={"download icon"}
                  />
                </div>
                <FileDrawer register="uk/e-money-firms" isDrawerOpen={isDrawerOpen1} ref={drawerRef1} />
              </div>
            </div>
          </div>

          <TableSkeleton lables={["Company Name", "Date", "Address Type"]} />
        </>
      ) : (
        <>
          <div className={styles.mains}>
            <SearchBar onSearch={(value) => handleSearch1(value)} />
            <div className="flex gap-4 relative items-center justify-center">
              <Pagination
                totalPages={totalPages1}
                currentPage={currentPage1}
                onPageChange={handlePageChange1}
              />
              <div className={styles.drawer}>
                <div className="cursor-pointer border border-black rounded-xl w-10 h-10 flex items-center justify-center">
                  <Image
                    width={20}
                    height={20}
                    src={"/images/download.jpg"}
                    onClick={() => setIsDrawerOpen2((prev) => !prev)}
                    className="w-8 h-8"
                    alt={"download icon"}
                  />
                </div>
                <FileDrawer register="uk/e-money-firms" isDrawerOpen={isDrawerOpen1} ref={drawerRef1} />
              </div>
            </div>
          </div>
          <Table
            lables={["Company Name", "Date", "Address Type"]}
            tableData={tableRows1}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage1}
            onPageChange={handlePageChange1}
            onFilterByLicenseName={handleFilterByFirmName1}
            onFilterByAdress={handleFilterByEmoneyStatusEffectiveDate}
            addressTypes={getUniqueAddressTypes1()}
            onFilterByAddressType={handleFilterByEmoneyRegisterStatus}
          />
          <div className="relative mb-2 flex justify-center items-center">
            <div className="text-lg">Last Update: {eMoneyFirmsData[0].lastUpdatedDate.slice(0, 10)}</div>
          </div>
        </>
      )}
      {loading ? (
        <>
          <div className={styles.mains}>
            <SearchBar onSearch={(value) => handleSearch2(value)} />
            <div className="flex gap-4 relative items-center justify-center">
              <Pagination
                totalPages={totalPages2}
                currentPage={currentPage2}
                onPageChange={handlePageChange2}
              />
              <div className={styles.drawer}>
                <button
                  onClick={() => setIsDrawerOpen2((prev) => !prev)}
                  className="cursor-pointer border w-10 h-10 border-black rounded-xl flex flex-col gap-1 justify-evenly p-2">
                  <div className="bg-black w-full h-[2px]"></div>
                  <div className="bg-black w-full h-[2px]"></div>
                  <div className="bg-black w-full h-[2px]"></div>
                </button>
                <FileDrawer register="uk/firm-psd-permission" isDrawerOpen={isDrawerOpen2} ref={drawerRef2} />
              </div>
            </div>
          </div>
          <TableSkeleton lables={["Company Name", "Date", "Address Type"]} />
        </>
      ) : (
        <>
          <div className={styles.mains}>
            <SearchBar onSearch={(value) => handleSearch2(value)} />
            <div className="flex gap-4 relative items-center justify-center">
              <Pagination
                totalPages={totalPages2}
                currentPage={currentPage2}
                onPageChange={handlePageChange2}
              />
              <div className={styles.drawer}>
                <button
                  onClick={() => setIsDrawerOpen2((prev) => !prev)}
                  className="cursor-pointer border w-10 h-10 border-black rounded-xl flex flex-col gap-1 justify-evenly p-2">
                  <div className="bg-black w-full h-[2px]"></div>
                  <div className="bg-black w-full h-[2px]"></div>
                  <div className="bg-black w-full h-[2px]"></div>
                </button>
                <FileDrawer register="uk/firm-psd-permission" isDrawerOpen={isDrawerOpen2} ref={drawerRef2} />
              </div>
            </div>
          </div>
          <Table
            lables={["Company Name", "Date", "Address Type"]}
            tableData={tableRows2}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage2}
            onPageChange={handlePageChange2}
            onFilterByLicenseName={handleFilterByFirmName2}
            onFilterByAdress={handleFilterByPSDStatusEffectiveDate}
            addressTypes={getUniqueAddressTypes2()}
            onFilterByAddressType={handleFilterByPSDFirmStatus}
          />
          <div className="relative mb-2 flex justify-center items-center">
            <div className="text-lg">Last Update: {eMoneyFirmsData[0].lastUpdatedDate.slice(0, 10)}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default UkTable;
