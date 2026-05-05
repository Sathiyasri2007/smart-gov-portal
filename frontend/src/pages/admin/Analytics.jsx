import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import api from '../../services/api';
import Loader from '../../components/Loader';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [analyticsRes, statsRes] = await Promise.all([
        api.get('/admin/analytics'),
        api.get('/admin/stats')
      ]);
      setAnalyticsData(analyticsRes.data.data);
      setStatsData(statsRes.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  // Prepare Application Status Pie Chart Data
  const statusData = analyticsData?.applicationsByStatus || [];
  const statusLabels = statusData.map(item => {
    const status = item._id || 'unknown';
    return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
  });
  const statusCounts = statusData.map(item => item.count);

  const pieData = {
    labels: statusLabels.length > 0 ? statusLabels : ['No Data'],
    datasets: [{
      data: statusCounts.length > 0 ? statusCounts : [1],
      backgroundColor: [
        '#10b981', // green for approved
        '#f59e0b', // yellow for pending
        '#ef4444', // red for rejected
        '#3b82f6'  // blue for under_review
      ],
      borderColor: '#1f2937',
      borderWidth: 2
    }]
  };

  // Prepare Applications by Scheme Bar Chart Data
  const schemeData = analyticsData?.applicationsByScheme || [];
  const schemeLabels = schemeData.map(item => item.schemeName || 'Unknown');
  const schemeCounts = schemeData.map(item => item.count);

  const barData = {
    labels: schemeLabels.length > 0 ? schemeLabels : ['No Data'],
    datasets: [{
      label: 'Applications',
      data: schemeCounts.length > 0 ? schemeCounts : [0],
      backgroundColor: '#68727A',
      borderColor: '#9FA2A4',
      borderWidth: 1
    }]
  };

  // Prepare Applications by Category Bar Chart Data
  const categoryData = analyticsData?.applicationsByCategory || [];
  const categoryLabels = categoryData.map(item => item._id || 'Unknown');
  const categoryCounts = categoryData.map(item => item.count);

  const categoryBarData = {
    labels: categoryLabels.length > 0 ? categoryLabels : ['No Data'],
    datasets: [{
      label: 'Applications',
      data: categoryCounts.length > 0 ? categoryCounts : [0],
      backgroundColor: '#9FA2A4',
      borderColor: '#68727A',
      borderWidth: 1
    }]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff'
        }
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#ffffff',
          stepSize: 1
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: '#ffffff',
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#ffffff',
          padding: 15,
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white">Analytics Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card bg-gradient-to-br from-green-600 to-green-700">
          <h3 className="text-white text-sm font-medium mb-2">Approved</h3>
          <p className="text-3xl font-bold text-white">{statsData?.approvedApplications || 0}</p>
        </div>
        <div className="card bg-gradient-to-br from-yellow-600 to-yellow-700">
          <h3 className="text-white text-sm font-medium mb-2">Pending</h3>
          <p className="text-3xl font-bold text-white">{statsData?.pendingApplications || 0}</p>
        </div>
        <div className="card bg-gradient-to-br from-red-600 to-red-700">
          <h3 className="text-white text-sm font-medium mb-2">Rejected</h3>
          <p className="text-3xl font-bold text-white">{statsData?.rejectedApplications || 0}</p>
        </div>
        <div className="card bg-gradient-to-br from-blue-600 to-blue-700">
          <h3 className="text-white text-sm font-medium mb-2">Total Applications</h3>
          <p className="text-3xl font-bold text-white">{statsData?.totalApplications || 0}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4 text-white">Application Status Distribution</h2>
          <div className="flex justify-center items-center" style={{ height: '400px' }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
        <div className="card">
          <h2 className="text-xl font-bold mb-4 text-white">Applications by Category</h2>
          <div style={{ height: '400px' }}>
            <Bar data={categoryBarData} options={barOptions} />
          </div>
        </div>
      </div>

      {/* Full Width Chart */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-white">Top 10 Schemes by Applications</h2>
        <div style={{ height: '400px' }}>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
