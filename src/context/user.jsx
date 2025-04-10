import { createContext, useState } from "react";
import http from "../http";
import Swal from "sweetalert2";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
  fetchUser: () => {},
});

export function ProfileProvider(props) {
  const [user, setUser] = useState(null);

  async function fetchUser() {
    try {
      const { data } = await http({
        method: "GET",
        url: "/profile",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setUser(data);
      console.log("User data fetched:", data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
