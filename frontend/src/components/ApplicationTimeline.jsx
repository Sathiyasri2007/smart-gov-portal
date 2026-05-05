import React from 'react';
import { FiCheckCircle, FiClock, FiXCircle, FiFileText } from 'react-icons/fi';

const ApplicationTimeline = ({ statusHistory }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <FiCheckCircle className="text-green-500" />;
      case 'rejected':
        return <FiXCircle className="text-red-500" />;
      case 'under_review':
        return <FiClock className="text-yellow-500" />;
      default:
        return <FiFileText className="text-blue-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'border-green-500 bg-green-50 dark:bg-green-900';
      case 'rejected':
        return 'border-red-500 bg-red-50 dark:bg-red-900';
      case 'under_review':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900';
      default:
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'approved':
        return 'APPROVED';
      case 'rejected':
        return 'REJECTED';
      case 'under_review':
        return 'UNDER REVIEW';
      case 'pending':
        return 'APPLICATION SUBMITTED';
      default:
        return status.toUpperCase();
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (!statusHistory || statusHistory.length === 0) {
    return null;
  }

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-white mb-6">Application Timeline</h3>
      
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
        
        {/* Timeline items */}
        <div className="space-y-6">
          {statusHistory.map((item, index) => (
            <div key={index} className="relative flex items-start">
              {/* Icon */}
              <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 ${getStatusColor(item.status)}`}>
                <div className="text-2xl">
                  {getStatusIcon(item.status)}
                </div>
              </div>
              
              {/* Content */}
              <div className="ml-6 flex-1">
                <div className={`p-4 rounded-lg border-l-4 ${getStatusColor(item.status)}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-white">
                      {getStatusLabel(item.status)}
                    </h4>
                    <span className="text-sm text-gray-400">
                      {formatDate(item.timestamp)}
                    </span>
                  </div>
                  
                  {item.remarks && (
                    <p className="text-gray-300 text-sm mb-2">
                      {item.remarks}
                    </p>
                  )}
                  
                  {item.changedBy && (
                    <p className="text-xs text-gray-400">
                      Updated by: {item.changedBy.name || 'System'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationTimeline;
