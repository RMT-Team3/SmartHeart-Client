import { Route, Routes } from "react-router";
import Register from "./pages/Register";
import PublicLayout from "./components/PublicLayout";
import PrivateLayout from "./components/PrivateLayout";
import AboutYou from "./pages/AboutYou";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
function App() {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-100">
      <div className="w-[375px] h-full bg-white overflow-hidden flex flex-col">
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Onboarding />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateLayout />}>
            <Route path="/about" element={<AboutYou />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
