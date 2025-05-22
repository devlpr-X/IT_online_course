"use client";

import { useEffect, useState, useRouter } from "react";
import { useRouter } from "next/navigation";
import { sendRequest } from "../../utils/api";

interface Response {
  resultCode: number;
  resultMessage: string;
  data: any[]; // Adjust this type as needed
  size: number;
  action: string;
  curdate: string;
}

export default function Verified() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Initially set to true
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();
  const token = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        setError("Verification token is missing.");
        setLoading(false);
        return;
      }

      try {
        const surl = `http://localhost:8000/user/?token=${token}`;
        const smethod = "GET";

        const response: Response = await sendRequest(surl, smethod);

        if (response.resultCode === 3010 || response.resultCode === 3011) {
          setSuccessMessage(response.resultMessage);
          setError(null);
        } else {
          setError(response.resultMessage);
          setSuccessMessage(null);
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while verifying your account.");
        setSuccessMessage(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [token]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Хаяг баталгаажуулалт
      </h1>
      {successMessage && (
        <p className="text-green-600 text-center text-lg">{successMessage}</p>
      )}
      {error && (
        <p className="text-red-600 text-center text-lg">{error}</p>
      )}
      {!error && !successMessage && (
        <p className="text-gray-600 text-center text-lg">
          No verification updates.
        </p>
      )}      
      <p className="text-gray-600 text-center text-lg">

      <button
      style={{
        padding: "10px 20px",
        backgroundColor: "blue",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
      onClick={() => router.push("/")}
    >
      Нүүр хуудас руу
    </button>
        </p>
    </div>
  );
}