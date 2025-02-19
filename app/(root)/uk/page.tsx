"use client";
import React, { useEffect, useState } from "react";
import { TableSkeleton } from "@/src/components/shared/TablesExpanded/TableSkeleton";

interface Props {
  id: number;
  licenseName: string;
  address: string;
  addressType: string;
}

const UkTable: React.FC = () => {
  const [eMoneyFirmsData, setEMoneyFirmsData] = useState<Props[]>([]);
  const [firmPsdPermissionData, setFirmPsdPermissionData] = useState<Props[]>(
    []
  );
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/uk/e-money-firms");
        const data = await res.json();
        setEMoneyFirmsData(data["eMoneyFirms"]);
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

  return (
    <div>
      {loading1 && loading2 ? (
        <TableSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          <div>
            <h1 className="text-2xl font-bold text-red-500 mb-4">Table 1</h1>
            <div className="space-y-4">
              {eMoneyFirmsData.map((row: any) => (
                <div className="p-4 border rounded-lg shadow-md" key={row.FRN}>
                  <div className="font-semibold">{row.FRN}</div>
                  <div>{row.FirmName}</div>
                  <div>{row.EmoneyRegisterStatus}</div>
                  <div>{row.EmoneyStatusEffectiveDate}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-red-950 mb-4">Table 2</h1>
            <div className="space-y-4">
              {firmPsdPermissionData.map((row: any) => (
                <div className="p-4 border rounded-lg shadow-md" key={row.FRN}>
                  <div className="font-semibold">{row.FRN}</div>
                  <div>{row.FirmName}</div>
                  <div>{row.PSDFirmStatus}</div>
                  <div>{row.PSDStatusEffectiveDate}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UkTable;
