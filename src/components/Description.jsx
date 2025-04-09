import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function Description({ onNext }) {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [personalities, setPersonalities] = useState("");

  function handlePrev() {
    localStorage.removeItem("access_token");
    navigate("/register");
  }

  const isFormValid = imageUrl.trim() !== "" && personalities.trim() !== "";

  const handleContinue = () => {
    if (isFormValid) {
      onNext({ imageUrl, personalities }); // Pass both imageUrl and description
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white px-4 py-6">
      <div className="mb-4">
        <button onClick={handlePrev}>
          <ChevronLeft className="w-6 h-6 text-gray-700 cursor-pointer" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="w-full max-w-md mx-auto">
          <div className="space-y-2 mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Add Profile Details
            </h2>
            <p className="text-sm text-gray-400">
              Please add your profile details here
            </p>
          </div>

          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Profile Picture
            </label>
            <input
              type="text"
              id="first_name"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 outline-none transition-all"
              placeholder="Image URL"
            />
          </div>

          <div>
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Tell me about yourself
            </label>
            <textarea
              id="text"
              rows="8"
              value={personalities}
              onChange={(e) => setPersonalities(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 outline-none transition-all"
              placeholder="How do you describe yourself?"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto px-1 pt-4">
        <button
          onClick={handleContinue}
          className={`w-full py-3 rounded-3xl text-base font-semibold transition-colors cursor-pointer ${
            isFormValid
              ? "bg-pink-500 text-white hover:bg-pink-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
