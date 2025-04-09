import React, { useState } from "react";
import { Send } from "lucide-react";
import { useNavigate } from "react-router";
import dummy from "../assets/dummy.jpg"; // Import the dummy image

export default function Chat() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const messages = [
    {
      id: 1,
      sender: "them",
      text: "Do you want starbucks? 😊",
    },
    {
      id: 2,
      sender: "you",
      text: "That would be awesome!",
    },
  ];
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };
  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img
              src={dummy}
              alt="User"
              className="w-10 h-10 rounded-full object-cover bg-pink-300 flex items-center justify-center text-white font-bold"
            />

            <div>
              <h2 className="font-semibold text-gray-900">Perry Kate</h2>
            </div>
          </div>
        </div>
        <button className="cursor-pointer" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          return (
            <div key={msg.id} className="space-y-2">
              <div
                className={`flex ${
                  msg.sender === "you" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                    msg.sender === "you"
                      ? "bg-pink-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-3 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type something..."
            className="flex-1 border border-gray-200 rounded-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
          <button
            onClick={handleSend}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <Send className="w-5 h-5 text-pink-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
