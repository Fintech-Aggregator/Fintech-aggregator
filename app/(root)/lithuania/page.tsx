"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "@/src/components/shared/HomeContentTemaplate/search-bar";
import Pagination from "@/src/components/shared/TablesExpanded/pagination";
import { Table } from "@/src/components/shared/TablesExpanded/Table";
import { TableSkeleton } from "@/src/components/shared/TablesExpanded/TableSkeleton";
import styles from "../all-tables-style.module.css";

interface Props {
  id: number;
  Licence: string;
  FirmName: string;
  Address: string;
  lastUpdatedDate: string;
}
const Lithuania: React.FC = () => {
  const [LithuaniaData, setLithuaniaData] = useState<Props[]>([]);
  const [filteredData, setFilteredData] = useState<Props[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    searchTerm: "",
    id: null as number | null,
    Licence: "",
    FirmName: "",
    Address: "",
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

  return (
    <div>
      <div>{LithuaniaData[0]?.lastUpdatedDate}</div>
      {LithuaniaData.map((data) => (
        <div className="mb-8" key={data.id}>
          {data.FirmName}
          {data.Address}
          {data.Licence}
        </div>
      ))}
    </div>
  );
};
export default Lithuania;
