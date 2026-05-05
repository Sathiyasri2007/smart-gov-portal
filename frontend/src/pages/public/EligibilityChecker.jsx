import React, { useState } from 'react';
import { FiCheckCircle, FiXCircle, FiSearch } from 'react-icons/fi';
import api from '../../services/api';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';

const EligibilityChecker = () => {
  const [formData, setFormData] = useState({
    age: '',
    income: '',
    category: '',
    occupation: '',
    state: ''
  });
  const [eligibleSchemes, setEligibleSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const categories = ['General', 'SC', 'ST', 'OBC', 'EWS'];
  const occupations = ['Student', 'Farmer', 'Self-Employed', 'Salaried'];
  const states = [
    'All India',
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
      const response = await api.post('/schemes/check-eligibility', formData);
      setEligibleSchemes(response.data.data || []);
      setChecked(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Eligibility Checker
        </h1>
        <p className="text-white text-lg">
          Find out which government schemes you're eligible for in seconds!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Enter Your Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-medium text-white">Age</label>
              <input
                type="number"
                required
                className="input-field"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                placeholder="Enter your age"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-white">Occupation</label>
              <select
                required
                className="input-field"
                value={formData.occupation}
                onChange={(e) => setFormData({...formData, occupation: e.target.value})}
              >
                <option value="">Select Occupation</option>
                <option value="student">Student</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="retired">Retired</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium text-white">
                {formData.occupation === 'student' ? 'Family Annual Income (₹)' : 'Annual Income (₹)'}
              </label>
              <input
                type="number"
                required
                className="input-field"
                value={formData.income}
                onChange={(e) => setFormData({...formData, income: e.target.value})}
                placeholder={formData.occupation === 'student' ? 'Enter family annual income' : 'Enter your annual income'}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-white">Category</label>
              <select
                required
                className="input-field"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium text-white">State</label>
              <select
                required
                className="input-field"
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
              >
                <option value="">Select State</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center">
              <FiSearch className="mr-2" />
              {loading ? 'Checking...' : 'Check Eligibility'}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Eligible Schemes
          </h2>
          
          {loading && <Loader />}
          
          {!loading && !checked && (
            <div className="text-center py-12">
              <FiSearch className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-white">Fill the form to check your eligibility</p>
            </div>
          )}

          {!loading && checked && eligibleSchemes.length === 0 && (
            <div className="text-center py-12">
              <FiXCircle className="text-6xl text-red-400 mx-auto mb-4" />
              <p className="text-white">
                No schemes found matching your criteria
              </p>
            </div>
          )}

          {!loading && checked && eligibleSchemes.length > 0 && (
            <div className="space-y-4">
              <div className="bg-emerald-50 dark:bg-emerald-900 p-4 rounded-lg mb-4">
                <div className="flex items-center text-emerald-700 dark:text-emerald-300">
                  <FiCheckCircle className="text-2xl mr-2" />
                  <span className="font-bold">
                    You're eligible for {eligibleSchemes.length} scheme(s)!
                  </span>
                </div>
              </div>

              {eligibleSchemes.map(scheme => (
                <div key={scheme._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <h3 className="font-bold text-lg text-white mb-2">
                    {scheme.name}
                  </h3>
                  <p className="text-white text-sm mb-3 line-clamp-2">
                    {scheme.description}
                  </p>
                  <div className="flex gap-2">
                    <Link to={`/schemes/${scheme._id}`} className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                      View Details →
                    </Link>
                    <Link to={`/user/apply/${scheme._id}`} className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">
                      Apply Now →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EligibilityChecker;
