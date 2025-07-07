import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Complaints from './pages/Complaints';
import Leaderboard from './pages/Leaderboard';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/complaints" element={<ProtectedRoute><Complaints /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
      </Routes>
    </>
  );
}
