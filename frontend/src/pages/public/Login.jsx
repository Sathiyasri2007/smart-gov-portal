import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      const redirectPath = user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(formData.email, formData.password);
      
      addNotification('Login successful!', 'success');
      
      // Navigate based on user role
      setTimeout(() => {
        const redirectPath = user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
        navigate(redirectPath, { replace: true });
      }, 100);
      
    } catch (error) {
      addNotification(error.response?.data?.message || 'Login failed', 'error');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-white">Email</label>
            <input
              type="email"
              required
              className="input-field"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="your@email.com"
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
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-white">
          Don't have an account? <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
          <br />
          <Link to="/admin-login" className="text-blue-400 hover:underline">Admin Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
