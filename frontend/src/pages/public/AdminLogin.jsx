import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { FiShield } from 'react-icons/fi';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: 'admin@smartgov.in', password: '' });
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  // Redirect if already logged in as admin
  React.useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(formData.email, formData.password);
      
      // Check if user is admin
      if (user.role !== 'admin') {
        addNotification('Access denied. Admin credentials required.', 'error');
        setLoading(false);
        return;
      }
      
      addNotification('Admin login successful!', 'success');
      
      setTimeout(() => {
        navigate('/admin/dashboard', { replace: true });
      }, 100);
      
    } catch (error) {
      addNotification(error.response?.data?.message || 'Login failed', 'error');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <div className="text-center mb-6">
          <FiShield className="text-6xl text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">Admin Login</h2>
          <p className="text-blue-grey-200 mt-2">Administrative Access Only</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-white">Admin Email</label>
            <input
              type="email"
              required
              className="input-field"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="admin@smartgov.in"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-white">Password</label>
            <input
              type="password"
              required
              className="input-field"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Enter admin password"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Logging in...' : 'Login as Admin'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <Link to="/login" className="text-blue-400 hover:text-blue-300 underline">
            ← Back to User Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;