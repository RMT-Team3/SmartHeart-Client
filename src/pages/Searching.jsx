import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import http from "../http";
import Swal from "sweetalert2";

export default function Searching() {
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await http({
          method: "GET",
          url: "/match",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        console.log("Match data:", data);

        navigate("/match", { state: { matchData: data } });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response?.data?.message || "Something went wrong!",
        });
        navigate(-1); // go back if failed
      }
    }

    fetchData();
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center">
          <div className="relative h-24 w-24 ">
            <div className="absolute inset-0 rounded-full bg-pink-100 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-pink-100 "></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 "
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="#FF5A79"
                />
              </svg>
            </div>
          </div>
          <h1 className="mt-2 text-3xl font-bold text-pink-500">SmartHeart</h1>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-semiBold text-gray-900">
              Finding your match...
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
