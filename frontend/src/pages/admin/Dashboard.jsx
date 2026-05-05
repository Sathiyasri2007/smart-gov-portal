import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFileText, FiUsers, FiCheckCircle, FiClock } from 'react-icons/fi';
import api from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalSchemes: 0,
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data.data || response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="card border-t-4 border-purple-500 hover:shadow-xl transition-all hover:scale-105">
          <FiFileText className="text-4xl text-purple-600 dark:text-purple-400 mb-4" />
          <h3 className="text-2xl font-bold text-purple-700 dark:text-white">{stats.totalSchemes}</h3>
          <p className="text-gray-600 dark:text-gray-300">Total Schemes</p>
        </div>
        <div className="card border-t-4 border-emerald-500 hover:shadow-xl transition-all hover:scale-105">
          <FiUsers className="text-4xl text-emerald-600 dark:text-emerald-400 mb-4" />
          <h3 className="text-2xl font-bold text-purple-700 dark:text-white">{stats.totalApplications}</h3>
          <p className="text-gray-600 dark:text-gray-300">Applications</p>
        </div>
        <div className="card border-t-4 border-orange-500 hover:shadow-xl transition-all hover:scale-105">
          <FiClock className="text-4xl text-orange-600 dark:text-orange-400 mb-4" />
          <h3 className="text-2xl font-bold text-purple-700 dark:text-white">{stats.pendingApplications}</h3>
          <p className="text-gray-600 dark:text-gray-300">Pending</p>
        </div>
        <div className="card border-t-4 border-emerald-600 hover:shadow-xl transition-all hover:scale-105">
          <FiCheckCircle className="text-4xl text-emerald-600 dark:text-emerald-400 mb-4" />
          <h3 className="text-2xl font-bold text-purple-700 dark:text-white">{stats.approvedApplications}</h3>
          <p className="text-gray-600 dark:text-gray-300">Approved</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Link to="/admin/schemes" className="card hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-2">Manage Schemes</h3>
          <p className="text-gray-600 dark:text-gray-300">Add, edit, or delete schemes</p>
        </Link>
        <Link to="/admin/applications" className="card hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-2">View Applications</h3>
          <p className="text-gray-600 dark:text-gray-300">Review and process applications</p>
        </Link>
        <Link to="/admin/analytics" className="card hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-2">Analytics</h3>
          <p className="text-gray-600 dark:text-gray-300">View detailed statistics</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
