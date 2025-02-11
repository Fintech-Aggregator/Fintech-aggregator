"use client";
import React, { useEffect, useState } from "react";

interface Props {
  id: number;
  licenseName: string;
  address: string;
  addressType: string;
}

const UkTable: React.FC = () => {
  const [ukData, setUkData] = useState<Props[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/uk");
        const data = await res.json();
        setUkData(data["ukData"] || []);
      } catch (error) {
        console.log(error);
        setUkData([]);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Завантаження...</div>;
  }

  return (
    <div>
      {ukData.length === 0 ? (
        <div>Немає даних</div>
      ) : (
        ukData.map((item) => (
          <div key={item.id}>
            <p>ID: {item.id}</p>
            <p>Назва ліцензії: {item.licenseName}</p>
            <p>Адреса: {item.address}</p>
            <p>Тип адреси: {item.addressType}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default UkTable;
