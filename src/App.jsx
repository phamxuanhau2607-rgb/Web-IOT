import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MockProvider } from "./contexts/MockContext";

// --- Pages ---
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyCode from "./pages/VerifyCode";
import Hello from "./pages/Hello";
import Spaces from "./pages/Spaces";

// --- Sidebar Pages ---
import CreateSpace from "./pages/CreateSpace";
import Statistics from "./pages/Statistics";
import Profile from "./pages/Profile";
import Rooms from "./pages/Rooms";
import RoomDetail from "./pages/RoomDetail";
import DeviceDetail from "./pages/DeviceDetail";

// --- New Create Space Flow (Import các file vừa tạo) ---
import EmptySpace from "./pages/EmptySpace";
import AddRooms from "./pages/AddRooms";
import SpaceBuilder from "./pages/SpaceBuilder";


// --- Components ---
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <MockProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/hello" element={<Hello />} />

          {/* Create Space Flow 
             (Các trang này tự quản lý Layout bên trong nó nên để ngoài Wrapper)
          */}
          {/* Main Application Layout Wrapper 
             (Dành cho các trang Dashboard thông thường)
          */}
          <Route element={<MainLayout />}>
            <Route path="/empty-space" element={<EmptySpace />} />
            {/* Was /dashboard -> Now /create-space for the Wizard flow */}
            <Route path="/create-space" element={<CreateSpace />} />
            <Route path="/space-builder" element={<SpaceBuilder />} />
            <Route path="/add-rooms" element={<AddRooms />} />
            <Route path="/spaces" element={<Spaces />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<RoomDetail />} />
            <Route path="/rooms/:roomId/device/:id" element={<DeviceDetail />} />
          </Route>

        </Routes>
      </Router>
    </MockProvider>
  );
}

export default App;