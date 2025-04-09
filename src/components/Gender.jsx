import React, { useState } from "react";
import { ChevronLeft, Mars, Venus } from "lucide-react";

export default function Gender({ onNext, onBack }) {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleSelect = (gender) => {
    setSelectedGender(gender);
  };
  const isSelected = (gender) => selectedGender === gender;

  const handleContinue = () => {
    if (selectedGender) {
      onNext(selectedGender);
    }
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
            <h1 className="text-2xl font-bold text-black">Select Gender</h1>
            <p className="text-sm text-gray-400">Please select your gender</p>
          </div>

          <div className="flex flex-col gap-6 items-center mt-24">
            <div
              className={`w-52 h-52 rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all ${
                isSelected("male")
                  ? "border-pink-400 bg-pink-50"
                  : "border-gray-200 bg-white"
              }`}
              onClick={() => handleSelect("male")}
            >
              <Mars
                className={`w-10 h-10 mb-2 ${
                  isSelected("male") ? "text-pink-500" : "text-gray-700"
                }`}
              />
              <span
                className={`font-medium ${
                  isSelected("male") ? "text-pink-500" : "text-gray-700"
                }`}
              >
                Male
              </span>
            </div>

            <div
              className={`w-52 h-52 rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all ${
                isSelected("female")
                  ? "border-pink-400 bg-pink-50"
                  : "border-gray-200 bg-white"
              }`}
              onClick={() => handleSelect("female")}
            >
              <Venus
                className={`w-10 h-10 mb-2 ${
                  isSelected("female") ? "text-pink-500" : "text-gray-700"
                }`}
              />
              <span
                className={`font-medium ${
                  isSelected("female") ? "text-pink-500" : "text-gray-700"
                }`}
              >
                Female
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-md mx-auto px-1 pt-4">
        <button
          className={`w-full py-3 rounded-3xl text-base font-semibold transition-colors cursor-pointer ${
            selectedGender
              ? "bg-pink-500 text-white hover:bg-pink-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!selectedGender}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
