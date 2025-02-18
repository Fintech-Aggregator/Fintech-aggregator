"use client";
import React, { useEffect, useState } from "react";

interface Props {
  id: number;
  licenseName: string;
  address: string;
  addressType: string;
}

const UkTable: React.FC = () => {
  const [UKData, setUKData] = useState<Props[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/uk");
        const data = await res.json();
        console.log(data);
        //setUKData(data["hongKongData"]);
        //setFilteredData(data["hongKongData"]);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);
  return <div>Test</div>;
};

export default UkTable;
