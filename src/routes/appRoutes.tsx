import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { RootState } from '../redux/store';
import Login from '../components/login/login';
import Signup from '../components/signup/signup';
import Dashboard from '../pages/dashboard';
import UserPage from '../pages/userPage';
import SettingsPage from '../pages/settingsPage';
import InfoPage from '../pages/infoPage';

const AppRoutes: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // If not authenticated
  let routes = (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="*"
        element={<div> Not Found or You do not have permission.</div>}
      />
    </Routes>
  );

  // If authenticated (after login)
  if (isAuthenticated) {
    routes = (
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route
          path="*"
          element={<div> Not Found or You do not have permission.</div>}
        />
      </Routes>
    );
  }
  return routes;
};

export default AppRoutes;
