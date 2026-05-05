import React, { useState, useEffect } from 'react';
import { schemeService } from '../../services/schemeService';
import SchemeCard from '../../components/SchemeCard';
import Loader from '../../components/Loader';

const RecommendedSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommended();
  }, []);

  const fetchRecommended = async () => {
    try {
      const response = await schemeService.getRecommended();
      setSchemes(response.data.data || []);
    } catch (error) {
      console.error(error);
      setSchemes([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Recommended Schemes</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemes.map(scheme => (
          <SchemeCard key={scheme._id} scheme={scheme} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedSchemes;
