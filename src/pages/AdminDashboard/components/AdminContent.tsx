import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UsersManagement from './UsersManagement';
import PropertiesManagement from './PropertiesManagement';
import RequestsManagement from './RequestsManagement';
import AdminProfile from './AdminProfile';
import AdminPassword from './AdminPassword';
import AdminSettings from './AdminSettings';

const AdminContent = () => {
  return (
    <Routes>
      <Route path="/users" element={<UsersManagement />} />
      <Route path="/properties" element={<PropertiesManagement />} />
      <Route path="/requests" element={<RequestsManagement />} />
      <Route path="/profile" element={<AdminProfile />} />
      <Route path="/password" element={<AdminPassword />} />
      <Route path="/settings" element={<AdminSettings />} />
    </Routes>
  );
};

export default AdminContent;