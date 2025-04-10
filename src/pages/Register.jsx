import React, { useState } from "react";
import { useNavigate } from "react-router";
import http from "../http";
import Swal from "sweetalert2";
export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await http({
        method: "POST",
        url: "/register",
        data: {
          name: name,
          email: email,
          password: password,
        },
      });
      Swal.fire({
        icon: "success",
        text: "Account created!",
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center">
          <div className="relative h-24 w-24">
            <div className="absolute inset-0 rounded-full bg-pink-100"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
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
            <h2 className="text-xl font-bold text-gray-900">
              Let's find your match today!
            </h2>
            <p className="text-sm mt-2 text-gray-400">Register to continue</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-3">
              <div>
                <label
                  htmlFor="full_name"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Full name
                </label>
                <input
                  type="text"
                  id="full_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 outline-none transition-all"
                placeholder="your@email.com"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 outline-none transition-all"
                placeholder="•••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-pink-500 text-white border-none rounded-3xl text-base font-semibold cursor-pointer transition-colors hover:bg-pink-600"
            >
              Submit
            </button>
          </form>

          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-pink-500 underline cursor-pointer hover:text-pink-600"
              >
                Login here
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
