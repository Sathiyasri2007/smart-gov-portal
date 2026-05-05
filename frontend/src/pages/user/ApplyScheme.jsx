import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { schemeService } from '../../services/schemeService';
import { applicationService } from '../../services/applicationService';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/Loader';
import api from '../../services/api';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const ApplyScheme = () => {
  const { schemeId } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const { user } = useAuth();
  const [scheme, setScheme] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    income: '',
    familyMembers: '',
    documents: null
  });
  const [documentFiles, setDocumentFiles] = useState({});

  useEffect(() => {
    fetchScheme();
    fetchUserProfile();
  }, [schemeId]);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/auth/me');
      setUserProfile(response.data.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchScheme = async () => {
    try {
      const response = await schemeService.getSchemeById(schemeId);
      setScheme(response.data.data || response.data);
    } catch (error) {
      addNotification('Failed to load scheme', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getRequiredDocuments = () => {
    const occupation = userProfile?.occupation || 'other';
    
    const baseDocuments = [
      { id: 'aadhaar', name: 'Aadhaar Card', required: true, description: 'Government issued ID proof' }
    ];

    if (occupation === 'student') {
      return [
        ...baseDocuments,
        { id: 'studentId', name: 'Student ID Card', required: true, description: 'Valid student identification' },
        { id: 'bonafide', name: 'Bonafide Certificate', required: false, description: 'From your educational institution' }
      ];
    } else if (occupation === 'employed' || occupation === 'self-employed') {
      return [
        ...baseDocuments,
        { id: 'income', name: 'Income Certificate', required: true, description: 'Proof of annual income' },
        { id: 'employment', name: 'Employment Letter', required: false, description: 'From your employer (if employed)' }
      ];
    } else {
      return [
        ...baseDocuments,
        { id: 'income', name: 'Income Certificate', required: false, description: 'If applicable' }
      ];
    }
  };

  const handleFileChange = (documentId, file) => {
    setDocumentFiles(prev => ({
      ...prev,
      [documentId]: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required documents
    const requiredDocs = getRequiredDocuments();
    const missingDocs = requiredDocs
      .filter(doc => doc.required && !documentFiles[doc.id])
      .map(doc => doc.name);
    
    if (missingDocs.length > 0) {
      addNotification(`Please upload required documents: ${missingDocs.join(', ')}`, 'error');
      return;
    }
    
    const data = new FormData();
    data.append('schemeId', schemeId);
    data.append('income', formData.income);
    data.append('familyMembers', formData.familyMembers);
    
    // Append all uploaded documents
    Object.values(documentFiles).forEach(file => {
      if (file) {
        data.append('documents', file);
      }
    });

    try {
      await applicationService.applyForScheme(data);
      addNotification('Application submitted successfully', 'success');
      navigate('/user/applications');
    } catch (error) {
      addNotification('Failed to submit application', 'error');
    }
  };

  if (loading) return <Loader />;

  const requiredDocuments = getRequiredDocuments();

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white">Apply for {scheme?.name}</h1>
      
      {/* Document Requirements Info */}
      <div className="card mb-6 bg-blue-50 dark:bg-blue-grey-800 border-l-4 border-primary">
        <div className="flex items-start gap-3">
          <FiAlertCircle className="text-primary mt-1 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-bold text-lg mb-2 text-white">Required Documents</h3>
            <p className="text-sm text-white mb-3">
              Based on your profile as <span className="font-semibold capitalize">{userProfile?.occupation || 'applicant'}</span>, 
              please prepare the following documents:
            </p>
            <ul className="space-y-2">
              {requiredDocuments.map((doc, index) => (
                <li key={index} className="flex items-start gap-2">
                  {doc.required ? (
                    <FiCheckCircle className="text-red-500 mt-1 flex-shrink-0" size={16} />
                  ) : (
                    <FiCheckCircle className="text-gray-400 mt-1 flex-shrink-0" size={16} />
                  )}
                  <div>
                    <span className={`font-medium text-white ${doc.required ? 'text-red-600 dark:text-red-400' : ''}`}>
                      {doc.name} {doc.required && <span className="text-red-500">*</span>}
                    </span>
                    <p className="text-xs text-white">{doc.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-xs text-white mt-3">
              Accepted formats: PDF, JPG, JPEG, PNG (Max 5MB per file)
            </p>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-white">
              {userProfile?.occupation === 'student' ? 'Family Annual Income (₹)' : 'Annual Income (₹)'}
            </label>
            <input 
              type="number" 
              required 
              className="input-field"
              placeholder={userProfile?.occupation === 'student' ? 'Enter your family\'s annual income' : 'Enter your annual income'}
              value={formData.income}
              onChange={(e) => setFormData({...formData, income: e.target.value})} 
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium text-white">Number of Family Members</label>
            <input 
              type="number" 
              required 
              className="input-field"
              placeholder="Enter number of family members"
              value={formData.familyMembers}
              onChange={(e) => setFormData({...formData, familyMembers: e.target.value})} 
            />
          </div>
          
          {/* Document Upload Section */}
          <div className="border-t border-blue-grey-600 pt-6">
            <h3 className="text-xl font-bold mb-4 text-white">Upload Documents</h3>
            <div className="space-y-4">
              {requiredDocuments.map((doc) => (
                <div key={doc.id} className="bg-blue-grey-700 p-4 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <label className="block font-medium text-white">
                        {doc.name} 
                        {doc.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <p className="text-sm text-blue-grey-300 mt-1">{doc.description}</p>
                    </div>
                    {documentFiles[doc.id] && (
                      <FiCheckCircle className="text-green-500 flex-shrink-0 ml-2" size={20} />
                    )}
                  </div>
                  <input 
                    type="file" 
                    className="input-field mt-2"
                    accept=".pdf,.jpg,.jpeg,.png"
                    required={doc.required}
                    onChange={(e) => handleFileChange(doc.id, e.target.files[0])}
                  />
                  {documentFiles[doc.id] && (
                    <p className="text-sm text-green-400 mt-2">
                      ✓ {documentFiles[doc.id].name} ({(documentFiles[doc.id].size / 1024).toFixed(2)} KB)
                    </p>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-blue-grey-400 mt-3">
              Accepted formats: PDF, JPG, JPEG, PNG (Max 5MB per file)
            </p>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="btn-primary flex-1">
              Submit Application
            </button>
            <button 
              type="button" 
              onClick={() => navigate(-1)} 
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyScheme;
