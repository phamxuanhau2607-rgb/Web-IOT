import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyCode from "./pages/VerifyCode";
import Hello from "./pages/Hello";
import EmptySpace from "./pages/EmptySpace";
import LinkDevices from "./pages/LinkDevices";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import { MockProvider } from "./contexts/MockContext";

import Spaces from "./pages/Spaces";
import Statistics from "./pages/Statistics";
import Profile from "./pages/Profile";
import Rooms from "./pages/Rooms";
import RoomDetail from "./pages/RoomDetail";
import DeviceDetail from "./pages/DeviceDetail";

function App() {
  return (
    <MockProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/hello" element={<Hello />} />

          {/* Main Application Layout */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/spaces" element={<Spaces />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<RoomDetail />} />
            <Route path="/rooms/:roomId/device/:id" element={<DeviceDetail />} />
            <Route path="/empty-space" element={<EmptySpace />} />
            <Route path="/link-devices" element={<LinkDevices />} />
            {/* Placeholder routes for other sidebar items */}
          </Route>
        </Routes>
      </Router>
    </MockProvider>
  );
}

export default App;
