import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import icon from "../assets/icon.png";
import socket from "../config/socket";

export default function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [senderId, setSenderId] = useState(null);

  localStorage.setItem("roomId", id);
  // const messages = [
  //   {
  //     id: 1,
  //     sender: "them",
  //     text: "Do you want starbucks? 😊",
  //   },
  //   {
  //     id: 2,
  //     sender: "you",
  //     text: "That would be awesome!",
  //   },
  // ];
  const handleProfile = () => {
    navigate("/profile");
  };
  const handleSend = () => {
    if (newMessage.trim()) {
      const message = {
        roomId: id, // Contoh roomId
        senderId: senderId, // Contoh senderId
        content: newMessage
      };

      // console.log("Sender ID di handleSend:", message.senderId);
      // Emit pesan ke server
      socket.emit("newChat", message);
      setNewMessage("");
    }
  };

  // console.log(socket);

  useEffect(() => {
    setSenderId(localStorage.getItem("userId"));
    // console.log(senderId, "Sender ID di useEffect");

    socket.emit("joinRoom", id); // Emit event joinRoom dengan roomId
    // socket.disconnect().connect();
    socket.on("onlineUsers", (users) => {
      console.log("Online users:", users);
    });

    // socket.on("chat message", (msg) => {
    //   console.log("Received message:", msg);
    //   setMessage(msg.text); // Update the message state with the received message
    // });

    socket.on("newChat", (msg) => {
      console.log("New chat message:", msg);
      // setNewMessage(msg.content); // Update the message state with the new chat message
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    socket.on("previousMessages", (msg) => {
      // console.log("New chat message:", msg);
      // setNewMessage(msg.content); // Update the message state with the new chat message
      setMessages(msg);
    });

    return () => {
      socket.off("chat message");
      socket.off("onlineUsers");
      socket.off("newChat");
      socket.off("previousMessages");
    };
  }, [id, senderId]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img
              src={icon}
              alt="User"
              className="w-10 h-10 rounded-full object-cover bg-pink-300 flex items-center justify-center text-white font-bold"
            />

            <div>
              <h2 className="font-semibold text-gray-900">Your Match</h2>
            </div>
          </div>
        </div>
        <button className="cursor-pointer" onClick={handleProfile}>
          My Profile
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isYou = msg.senderId == localStorage.getItem("userId");
          return (
            <div key={msg.id} className="space-y-2">
              <div
                className={`flex ${isYou ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                    isYou
                      ? "bg-pink-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-3 border-t border-gray-200">
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            socket.emit("chat message", newMessage);
          }}
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type something..."
            className="flex-1 border border-gray-200 rounded-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
          <button
            onClick={handleSend}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <Send className="w-5 h-5 text-pink-500" />
          </button>
        </form>
      </div>
    </div>
  );
}
