import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/login/login';
import Signup from '../components/signup/signup';
import Dashboard from '../pages/dashboard';
import UserPage from '../pages/userPage';
import SettingsPage from '../pages/settingsPage';
import InfoPage from '../pages/infoPage';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/user" element={<UserPage />} />
    <Route path="/settings" element={<SettingsPage />} />
    <Route path="/info" element={<InfoPage />} />
  </Routes>
);

export default AppRoutes;
