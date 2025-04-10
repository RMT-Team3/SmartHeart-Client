import React, { useEffect, useContext } from "react";
import { Mars, Venus, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import dummy2 from "../assets/dummy2.jpg";

import { UserContext } from "../context/user";
import socket from "../config/socket";
export default function Profile() {
  const { user, fetchUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleSearch() {
    navigate("/search");
  }

  function handleChat() {
    const roomId = localStorage.getItem("roomId");
    if (roomId) {
      navigate(`/chat/${roomId}`);
    }
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }
  useEffect(() => {
    fetchUser();
    socket.on("foundMatch:" + localStorage.getItem("userId"), (data) => {
      navigate(`/chat/${data.roomId}`);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleLogout}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-100/80 text-gray-700 rounded-full hover:bg-gray-200 transition"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="relative">
          <img
            src={user?.imageUrl || dummy2}
            alt={user?.name || "User"}
            className="w-full h-[380px] object-cover rounded-b-3xl"
          />
        </div>

        <div className="px-6 pt-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-black">{user?.name}</h1>
            <p className="text-gray-500 flex items-center gap-1">
              {user?.gender === "Male" ? (
                <Mars className="w-4 h-4" />
              ) : (
                <Venus className="w-4 h-4" />
              )}{" "}
              {user?.gender}
            </p>
          </div>

          <div className="h-px bg-gray-200 w-full mb-6"></div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-black mb-2">About You</h2>
            <p className="text-gray-700 mb-2">{user?.personalities}</p>
          </div>

          <div className="h-px bg-gray-200 w-full mb-6"></div>

          <div>
            <h2 className="text-lg font-semibold text-black mb-4">Interest</h2>
            <div className="grid grid-cols-2 gap-2">
              {user?.interests?.map((interest, index) => (
                <div
                  key={index}
                  className="text-sm flex items-center justify-center px-4 py-2 rounded-full bg-pink-100 text-pink-600"
                >
                  {interest}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            {user?.foundMatch ? (
              <button
                onClick={handleChat}
                className="w-full py-3 rounded-3xl text-base font-semibold transition-colors mb-4 cursor-pointer border border-pink-500 text-pink-500 hover:text-white hover:bg-pink-600"
              >
                See Your Chat
              </button>
            ) : (
              <button
                onClick={handleSearch}
                className="w-full py-3 rounded-3xl text-base font-semibold transition-colors cursor-pointer bg-pink-500 text-white hover:bg-pink-600"
              >
                Find your Match!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
