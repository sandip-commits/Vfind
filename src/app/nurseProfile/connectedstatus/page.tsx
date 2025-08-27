"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface ConnectionRequest {
  id: number;
  nurse_profiles_id: number;
  employer_profiles_id: number;
  status: "pending" | "accepted" | "rejected" | "";
  created_at?: string;
  _employer_profiles?: {
    id: number;
    fullName?: string;
    companyName?: string;
    email?: string;
    mobile?: string;
  };
}

export default function NurseStatusPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<ConnectionRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  const fetchRequests = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch(
        "https://x8ki-letl-twmt.n7.xano.io/api:LP_rdOtV/getNurseNotifications",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error("Failed to fetch requests");
      let data: ConnectionRequest[] = await res.json();
      console.log(data)

      const hiddenIds: number[] = JSON.parse(localStorage.getItem("hiddenNotifications") || "[]");
      data = data.filter((item) => !hiddenIds.includes(item.id));

      data.sort((a, b) => b.id - a.id);
      setRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleUpdateStatus = async (requestId: number, newStatus: "accepted" | "rejected") => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Unauthorized");

    try {
      const res = await fetch(
        `https://x8ki-letl-twmt.n7.xano.io/api:LP_rdOtV/connections/${requestId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!res.ok) throw new Error("Failed to update request");

      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId ? { ...req, status: newStatus } : req
        )
      );

      const affectedRequest = requests.find((r) => r.id === requestId);
      const employerName =
        affectedRequest?._employer_profiles?.companyName ||
        affectedRequest?._employer_profiles?.fullName ||
        "Employer";

      if (newStatus === "accepted") {
        setMessageType("success");
        setSuccessMessage(
          `You’ve successfully connected with ${employerName}. You will soon receive a confirmation email with further details from the employer.`
        );
      } else if (newStatus === "rejected") {
        setMessageType("error");
        setSuccessMessage(
          `You have declined the connection request from ${employerName}. No further action is required.`
        );
      }

      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.error(err);
      alert("Failed to update request");
    }
  };

 const handleCardClick = (employerId: number | undefined) => {
  if (!employerId) return;
  router.push(`/nurseProfile/connectedstatus/${employerId}`);
};



  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Connection Requests from Employers</h1>
      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p className="text-gray-500">No connection requests at the moment.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req.id}
            onClick={() => handleCardClick(req._employer_profiles?.id)}

            className="flex flex-col gap-2 p-4 rounded-xl border border-gray-200 hover:shadow-lg transition bg-gray-50 mb-4 cursor-pointer"
          >
            <p className="text-gray-800">
              Request from{" "}
              <span className="font-semibold text-blue-600">
                {req._employer_profiles?.companyName ||
                  req._employer_profiles?.fullName ||
                  "N/A"}
              </span>
            </p>
            {req._employer_profiles && (
              <div className="text-sm text-gray-500 space-y-1 mt-1">
                {req._employer_profiles.email && <p>Email: {req._employer_profiles.email}</p>}
                {req._employer_profiles.mobile && <p>Mobile: {req._employer_profiles.mobile}</p>}
              </div>
            )}
            <p className="text-sm text-gray-500 mt-1">Status: {req.status}</p>
            {req.created_at && (
              <p className="text-xs text-gray-400 mt-1">
                {new Date(req.created_at).toLocaleString()}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {req.status === "pending" && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateStatus(req.id, "accepted");
                    }}
                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium transition flex-1"
                  >
                    Accept
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateStatus(req.id, "rejected");
                    }}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition flex-1"
                  >
                    Reject
                  </button>
                </>
              )}
              {req.status === "accepted" && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold text-sm">
                  Connected
                </span>
              )}
              {req.status === "rejected" && (
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full font-semibold text-sm">
                  Rejected
                </span>
              )}
            </div>
          </div>
        ))
      )}

      {/* Toast */}
      {successMessage && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-sm transition-all duration-300 transform ${
            messageType === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {successMessage}
        </div>
      )}
    </div>
  );
}
