import React from "react";
import {
  ChevronLeft,
  BookOpen,
  Music,
  Camera,
  ChefHat,
  Gamepad2,
  LayoutDashboard,
  Venus,
} from "lucide-react";
import { useNavigate } from "react-router";
import dummy from "../assets/dummy.jpg";

export default function ProfilePage() {
  const navigate = useNavigate();
  const interests = [
    { label: "Snooker", icon: Gamepad2 },
    { label: "Books Reading", icon: BookOpen },
    { label: "Photography", icon: Camera },
    { label: "Design", icon: LayoutDashboard },
    { label: "Music", icon: Music },
    { label: "Cooking", icon: ChefHat },
  ];
  function handleChat() {
    navigate("/chat");
  }
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-4 z-10"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <div className="flex-1 overflow-y-auto">
        <div className="relative">
          <img
            src={dummy}
            alt="Perry Kate"
            className="w-full h-[380px] object-cover rounded-b-3xl"
          />
        </div>

        <div className="px-6 pt-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-black">Perry Kate</h1>
            <p className="text-gray-500 flex items-center gap-1">
              <Venus className="w-4 h-4" /> Female
            </p>
          </div>
          <div className="h-px bg-gray-200 w-full mb-6"></div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-black mb-2">About</h2>
            <p className="text-gray-700 mb-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos ut quas illo distinctio reprehenderit temporibus
              numquam tempore ullam placeat quam.
            </p>
          </div>

          <div className="h-px bg-gray-200 w-full mb-6"></div>

          {/* Interests section */}
          <div>
            <h2 className="text-lg font-semibold text-black mb-4">Interest</h2>
            <div className="grid grid-cols-2 gap-2">
              {interests.map((interest) => {
                const IconComponent = interest.icon;
                return (
                  <div
                    key={interest.label}
                    className="text-sm flex items-center gap-2 px-4 py-2 rounded-full  bg-pink-100 text-pink-600"
                  >
                    <IconComponent className="w-4 h-4" />
                    {interest.label}
                  </div>
                );
              })}
            </div>
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
