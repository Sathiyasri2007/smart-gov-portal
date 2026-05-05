import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import api from '../../services/api';

const Profile = () => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    state: user?.state || '',
    occupation: user?.occupation || 'other'
  });
  const [loading, setLoading] = useState(false);

  const states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi',
    'Jammu and Kashmir',
    'Ladakh',
    'Lakshadweep',
    'Puducherry'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/users/profile', formData);
      addNotification('Profile updated successfully', 'success');
    } catch (error) {
      addNotification('Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white">My Profile</h1>
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-white">Name</label>
            <input type="text" className="input-field" value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="block mb-2 font-medium text-white">Email</label>
            <input type="email" className="input-field" value={formData.email} disabled />
          </div>
          <div>
            <label className="block mb-2 font-medium text-white">Phone</label>
            <input type="tel" className="input-field" value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          </div>
          <div>
            <label className="block mb-2 font-medium text-white">Occupation</label>
            <select 
              className="input-field" 
              value={formData.occupation}
              onChange={(e) => setFormData({...formData, occupation: e.target.value})}
            >
              <option value="student">Student</option>
              <option value="employed">Employed</option>
              <option value="self-employed">Self-Employed</option>
              <option value="retired">Retired</option>
              <option value="other">Other</option>
            </select>
            <p className="text-sm text-white mt-1">
              This helps us show you relevant document requirements when applying for schemes
            </p>
          </div>
          <div>
            <label className="block mb-2 font-medium text-white">State</label>
            <select 
              className="input-field" 
              value={formData.state}
              onChange={(e) => setFormData({...formData, state: e.target.value})}
            >
              <option value="">Select Your State</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium text-white">Address</label>
            <textarea className="input-field" rows="3" value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})} />
          </div>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
