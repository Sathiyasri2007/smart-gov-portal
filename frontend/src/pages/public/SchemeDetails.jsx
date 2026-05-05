import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { schemeService } from '../../services/schemeService';
import Loader from '../../components/Loader';
import { useAuth } from '../../context/AuthContext';

const SchemeDetails = () => {
  const { id } = useParams();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchScheme();
  }, [id]);

  const fetchScheme = async () => {
    try {
      const response = await schemeService.getSchemeById(id);
      setScheme(response.data.data || response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (!scheme) return <div>Scheme not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{scheme.name}</h1>
        <div className="mb-6">
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full">{scheme.category}</span>
        </div>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Description</h2>
            <p className="text-gray-600 dark:text-gray-300">{scheme.description}</p>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-2">Eligibility</h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
              {scheme.eligibility?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-2">Benefits</h2>
            <p className="text-gray-600 dark:text-gray-300">{scheme.benefits}</p>
          </div>
          
          {user && user.role === 'user' && (
            <Link to={`/user/apply/${scheme._id}`} className="btn-primary inline-block">
              Apply Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemeDetails;
