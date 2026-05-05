import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', address: '', state: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

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
      await register(formData);
      addNotification('Registration successful!', 'success');
      navigate('/user/dashboard');
    } catch (error) {
      addNotification(error.response?.data?.message || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Full Name</label>
            <input type="text" required className="input-field"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input type="email" required className="input-field"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input type="password" required className="input-field"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Phone</label>
            <input type="tel" className="input-field"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="Enter your phone number" />
          </div>
          <div>
            <label className="block mb-2 font-medium">State</label>
            <select 
              required 
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
            <label className="block mb-2 font-medium">Address</label>
            <textarea 
              className="input-field" 
              rows="2"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder="Enter your address"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-primary-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
