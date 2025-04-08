import { Route, Routes } from "react-router";
import Register from "./pages/Register";
import PublicLayout from "./components/PublicLayout";
import PrivateLayout from "./components/PrivateLayout";
import AboutYou from "./pages/AboutYou";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import { Navigate } from "react-router";
function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/about" element={<AboutYou />} />
        <Route path="/chat" element={<Chat />} />
      </Route>
    </Routes>
  );
}

export default App;
