import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFileText, FiCheckCircle, FiClock } from 'react-icons/fi';
import { applicationService } from '../../services/applicationService';

const UserDashboard = () => {
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await applicationService.getUserApplications();
      const apps = response.data.data || [];
      setStats({
        total: apps.length,
        pending: apps.filter(a => a.status === 'pending').length,
        approved: apps.filter(a => a.status === 'approved').length
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card border-t-4 border-purple-500 hover:shadow-xl transition-all hover:scale-105">
          <FiFileText className="text-4xl text-purple-600 dark:text-purple-400 mb-4" />
          <h3 className="text-2xl font-bold text-purple-700 dark:text-white">{stats.total}</h3>
          <p className="text-gray-600 dark:text-gray-300">Total Applications</p>
        </div>
        <div className="card border-t-4 border-orange-500 hover:shadow-xl transition-all hover:scale-105">
          <FiClock className="text-4xl text-orange-600 dark:text-orange-400 mb-4" />
          <h3 className="text-2xl font-bold text-purple-700 dark:text-white">{stats.pending}</h3>
          <p className="text-gray-600 dark:text-gray-300">Pending</p>
        </div>
        <div className="card border-t-4 border-emerald-500 hover:shadow-xl transition-all hover:scale-105">
          <FiCheckCircle className="text-4xl text-emerald-600 dark:text-emerald-400 mb-4" />
          <h3 className="text-2xl font-bold text-purple-700 dark:text-white">{stats.approved}</h3>
          <p className="text-gray-600 dark:text-gray-300">Approved</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link to="/schemes" className="card hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-2">Browse Schemes</h3>
          <p className="text-gray-600 dark:text-gray-300">Explore available government schemes</p>
        </Link>
        <Link to="/user/recommended" className="card hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-2">Recommended for You</h3>
          <p className="text-gray-600 dark:text-gray-300">Personalized scheme recommendations</p>
        </Link>
        <Link to="/user/bookmarks" className="card hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-2">Bookmarked Schemes</h3>
          <p className="text-gray-600 dark:text-gray-300">View your saved schemes</p>
        </Link>
        <Link to="/user/compare" className="card hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-2">Compare Schemes</h3>
          <p className="text-gray-600 dark:text-gray-300">Compare schemes side-by-side</p>
        </Link>
        <Link to="/eligibility-checker" className="card hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-2">Eligibility Checker</h3>
          <p className="text-gray-600 dark:text-gray-300">Find schemes you qualify for</p>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
