import React, { useState, useEffect } from 'react';
import { applicationService } from '../../services/applicationService';
import Loader from '../../components/Loader';
import ApplicationTimeline from '../../components/ApplicationTimeline';
import { FiDownload, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { generateApplicationReceipt } from '../../utils/pdfGenerator';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const ApplicationStatus = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [expandedApp, setExpandedApp] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchApplications();
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/auth/me');
      setUserProfile(response.data.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await applicationService.getUserApplications();
      setApplications(response.data.data || []);
    } catch (error) {
      console.error(error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReceipt = (application) => {
    try {
      console.log('Download receipt clicked for:', application);
      console.log('User profile:', userProfile);
      if (!application || !application._id) {
        alert('Invalid application data');
        return;
      }
      if (!userProfile) {
        alert('User profile not loaded. Please wait and try again.');
        return;
      }
      generateApplicationReceipt(application, userProfile);
      console.log('PDF generation completed successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      console.error('Error details:', error.message, error.stack);
      alert(`Failed to generate receipt: ${error.message}`);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white">My Applications</h1>
      <div className="space-y-4">
        {applications && applications.length > 0 ? (
          applications.map(app => (
            <div key={app._id}>
              <div className="card">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{app.scheme?.name}</h3>
                    <p className="text-gray-300">
                      Applied on: {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Application ID: {app._id}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 rounded-full font-semibold ${
                      app.status === 'approved' ? 'bg-green-100 text-green-800' :
                      app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {app.status.toUpperCase()}
                    </span>
                    <button
                      onClick={() => handleDownloadReceipt(app)}
                      className="btn-secondary flex items-center gap-2"
                      title="Download Receipt"
                    >
                      <FiDownload /> Receipt
                    </button>
                    <button
                      onClick={() => setExpandedApp(expandedApp === app._id ? null : app._id)}
                      className="btn-primary flex items-center gap-2"
                      title="View Timeline"
                    >
                      {expandedApp === app._id ? <FiChevronUp /> : <FiChevronDown />}
                      Timeline
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Timeline - Show when expanded */}
              {expandedApp === app._id && app.statusHistory && (
                <div className="mt-4">
                  <ApplicationTimeline statusHistory={app.statusHistory} />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="card text-center py-12">
            <p className="text-gray-300 text-lg">No applications yet</p>
            <p className="text-gray-400 mt-2">Browse schemes and apply to see them here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationStatus;
