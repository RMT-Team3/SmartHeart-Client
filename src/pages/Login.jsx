import { useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      console.log(email, password);
      throw new Error("Simulated error"); // Simulate an error for testing, ini nanti delete aja

      // Handle logic di sini
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message
      });
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full bg-white p-8 rounded-lg shadow-md lg:max-w-md md:max-w-4/5">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form
          className="flex flex-col justify-start gap-4"
          onSubmit={handleSubmit}
        >
          <fieldset className="flex flex-col">
            <p className="text-sm font-medium text-gray-700">Email</p>
            <div className="container mt-1 flex items-center gap-2 px-2 py-2 border border-gray-300 rounded-lg shadow-sm focus-within:outline-2">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="focus:outline-none border-none w-full"
                required
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </fieldset>

          <fieldset className="flex flex-col">
            <p className="text-sm font-medium text-gray-700">Password</p>
            <div className="container mt-1 flex items-center gap-2 px-2 py-2 border border-gray-300 rounded-lg shadow-sm focus-within:outline-2">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="focus:outline-none border-none w-full"
                required
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </fieldset>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
