import React, { useState, useEffect } from 'react';
import { applicationService } from '../../services/applicationService';
import { useNotification } from '../../context/NotificationContext';
import Loader from '../../components/Loader';

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await applicationService.getAllApplications();
      setApplications(response.data.data || []);
    } catch (error) {
      addNotification('Failed to load applications', 'error');
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await applicationService.updateApplicationStatus(id, status);
      addNotification('Status updated', 'success');
      fetchApplications();
    } catch (error) {
      addNotification('Update failed', 'error');
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white">Applications Management</h1>
      
      {applications.length === 0 ? (
        <div className="card text-center py-8">
          <p className="text-gray-400 text-lg">No applications found</p>
          <p className="text-gray-500 mt-2">Applications will appear here once users start applying for schemes</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map(app => (
          <div key={app._id} className="card">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column - Application Details */}
              <div>
                <h3 className="text-xl font-bold text-white mb-3">{app.scheme?.name}</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold text-white">Category:</span> <span className="text-gray-300">{app.scheme?.category}</span></p>
                  <p><span className="font-semibold text-white">Application ID:</span> <span className="text-gray-300">{app._id}</span></p>
                  <p><span className="font-semibold text-white">Applied On:</span> <span className="text-gray-300">{new Date(app.createdAt).toLocaleDateString()}</span></p>
                  <p><span className="font-semibold text-white">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
                      app.status === 'approved' ? 'bg-green-100 text-green-800' :
                      app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {app.status?.toUpperCase()}
                    </span>
                  </p>
                </div>
              </div>

              {/* Right Column - Applicant Details */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Applicant Details</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold text-white">Name:</span> <span className="text-gray-300">{app.user?.name || 'N/A'}</span></p>
                  <p><span className="font-semibold text-white">Email:</span> <span className="text-gray-300">{app.user?.email || 'N/A'}</span></p>
                  <p><span className="font-semibold text-white">Phone:</span> <span className="text-gray-300">{app.user?.phone || 'N/A'}</span></p>
                  <p><span className="font-semibold text-white">
                    {app.user?.occupation === 'student' ? 'Family Annual Income:' : 'Annual Income:'}
                  </span> <span className="text-gray-300">₹{app.income?.toLocaleString() || 'N/A'}</span></p>
                  <p><span className="font-semibold text-white">Family Members:</span> <span className="text-gray-300">{app.familyMembers || 'N/A'}</span></p>
                  <p><span className="font-semibold text-white">State:</span> <span className="text-gray-300">{app.user?.state || 'N/A'}</span></p>
                  <p><span className="font-semibold text-white">Occupation:</span> <span className="text-gray-300">{app.user?.occupation || 'N/A'}</span></p>
                </div>
              </div>
            </div>

            {/* Documents Section */}
            {app.documents && app.documents.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-600">
                <h4 className="text-lg font-semibold text-white mb-2">Submitted Documents</h4>
                <div className="flex flex-wrap gap-2">
                  {app.documents.map((doc, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      Document {index + 1}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-600">
              {app.status === 'pending' && (
                <>
                  <button 
                    onClick={() => updateStatus(app._id, 'approved')}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    ✓ Approve
                  </button>
                  <button 
                    onClick={() => updateStatus(app._id, 'rejected')}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    ✗ Reject
                  </button>
                </>
              )}
              {app.status !== 'pending' && (
                <div className="text-gray-400 italic">
                  Application has been {app.status}
                </div>
              )}
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default ViewApplications;
