import React, { useEffect } from "react";
import { ChevronLeft, Venus, Mars } from "lucide-react";
import { useNavigate } from "react-router";
import dummy from "../assets/dummy.jpg";
import { useLocation } from "react-router";
import http from "../http";
import Swal from "sweetalert2";
import socket from "../config/socket";
export default function Match() {
  const location = useLocation();
  const matchData = location.state?.matchData;
  const navigate = useNavigate();
  console.log(matchData);
  async function handleChat() {
    try {
      const { data } = await http({
        method: "POST",
        url: "/rooms",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      navigate(`/chat/${data.room.id}`);
      localStorage.setItem("roomId", data.room.id);
      socket.emit("foundMatch", {
        userId: localStorage.getItem("userId"),
        roomId: data.room.id,
        matchId: data.room.user2.id,
      });
      localStorage.setItem("matchId", data.room.user2.id);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  }
  useEffect(() => {
    socket.on("foundMatch:" + localStorage.getItem("userId"), (data) => {
      console.log("foundMatch", data);
      navigate(`/chat/${data.roomId}`);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 overflow-y-auto">
        <div className="relative">
          <img
            src={matchData?.imageUrl || dummy}
            alt="Perry Kate"
            className="w-full h-[380px] object-cover rounded-b-3xl"
          />
        </div>

        <div className="px-6 pt-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-black">{matchData?.name}</h1>
            <p className="text-gray-500 flex items-center gap-1">
              {matchData?.gender === "Male" ? (
                <Mars className="w-4 h-4" />
              ) : (
                <Venus className="w-4 h-4" />
              )}{" "}
              {matchData?.gender}
            </p>
          </div>
          <div className="h-px bg-gray-200 w-full mb-6"></div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-black mb-2">About</h2>
            <p className="text-gray-700 mb-2">{matchData?.personalities}</p>
          </div>

          <div className="h-px bg-gray-200 w-full mb-6"></div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold text-black mb-4">Interest</h2>
            <div className="grid grid-cols-2 gap-2">
              {matchData?.interests?.map((interest, index) => (
                <div
                  key={index}
                  className="text-sm flex items-center justify-center px-4 py-2 rounded-full bg-pink-100 text-pink-600"
                >
                  {interest}
                </div>
              ))}
            </div>
          </div>
          <div className="h-px bg-gray-200 w-full mb-6"></div>
          <div>
            <h2 className="text-lg font-semibold text-black mb-4">
              AI Insight
            </h2>
            <p>{matchData?.message}</p>
          </div>

          <div className="mt-6">
            <button
              onClick={handleChat}
              className="w-full py-3 rounded-3xl text-base font-semibold transition-colors mb-4 cursor-pointer bg-pink-500 text-white hover:bg-pink-600"
            >
              Chat Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
