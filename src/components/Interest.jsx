import React, { useState } from "react";
import {
  ChevronLeft,
  Film,
  BookOpen,
  Music,
  ShoppingCart,
  Camera,
  Paintbrush,
  ChefHat,
  Gamepad2,
  Waves,
  LayoutDashboard,
} from "lucide-react";
import { useNavigate } from "react-router";
export default function Interest({ onBack }) {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigate = useNavigate();
  const interests = [
    { label: "Movie", icon: Film },
    { label: "Snooker", icon: Gamepad2 },
    { label: "Books Reading", icon: BookOpen },
    { label: "Swimming", icon: Waves },
    { label: "Design", icon: LayoutDashboard },
    { label: "Photography", icon: Camera },
    { label: "Music", icon: Music },
    { label: "Shopping", icon: ShoppingCart },
    { label: "Cooking", icon: ChefHat },
    { label: "Art", icon: Paintbrush },
  ];

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const isSelected = (interest) => selectedInterests.includes(interest);
  const handleSearch = () => {
    navigate("/search");
  };
  return (
    <div className="flex flex-col min-h-screen bg-white px-4 py-6">
      <div className="mb-4">
        <button onClick={onBack}>
          <ChevronLeft className="w-6 h-6 text-black cursor-pointer" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="w-full max-w-md mx-auto">
          <div className="space-y-2 mb-6">
            <h1 className="text-2xl font-bold text-black">
              Select your Interest
            </h1>
            <p className="text-sm text-gray-400">
              Select a few of your interest to match with users who have similar
              things in common.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {interests.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.label}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-full border text-sm cursor-pointer transition-all ${
                    isSelected(item.label)
                      ? "bg-pink-500 text-white border-pink-500"
                      : "bg-white text-black border-gray-300"
                  }`}
                  onClick={() => toggleInterest(item.label)}
                >
                  <IconComponent className="w-4 h-4" />
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto px-1 pt-4">
        <button
          onClick={handleSearch}
          className="w-full py-3 bg-pink-500 text-white border-none rounded-3xl text-base font-semibold transition-colors hover:bg-pink-600 cursor-pointer disabled:bg-gray-300  disabled:text-gray-500 disabled:cursor-not-allowed"
          disabled={selectedInterests.length === 0}
        >
          Find your Match!
        </button>
      </div>
    </div>
  );
}
