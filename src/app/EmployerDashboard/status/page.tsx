"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface StatusItem {
  id: number;
  status: "pending" | "accepted" | "rejected" | string;
  created_at: string;
  nurseName: string;
  nurse_profiles_id: number;
  employerName: string;
  message?: string;
}

export default function StatusPage() {
  const router = useRouter();
  const [data, setData] = useState<StatusItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Unauthorized: No token found");

      const res = await fetch(
        "https://x8ki-letl-twmt.n7.xano.io/api:LP_rdOtV/getEmployerNotifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch data: ${text}`);
      }

      const apiData: StatusItem[] = await res.json();

      const mapped = apiData.map((n) => ({
        ...n,
        message: `Connection request ${n.status} with Nurse ${n.nurseName}`,
      }));

      mapped.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setData(mapped);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(true), 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    if (status === "pending") return "bg-yellow-100 border-yellow-400";
    if (status === "accepted") return "bg-green-100 border-green-400";
    if (status === "rejected") return "bg-red-100 border-red-400";
    return "bg-gray-100 border-gray-300";
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Status</h1>

      {loading && data.length === 0 ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500">No status updates</p>
      ) : (
        <div className="space-y-4">
          {data.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                router.push(`/EmployerDashboard/Candidatelist/${item.nurse_profiles_id}`)
              }
              className={`p-4 rounded-lg border cursor-pointer transition hover:shadow-md ${getStatusColor(
                item.status
              )}`}
            >
              <p className="font-medium">{item.message}</p>
              <p className="text-gray-500 text-sm">
                {new Date(item.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
