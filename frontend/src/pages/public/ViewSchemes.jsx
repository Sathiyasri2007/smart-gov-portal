import React, { useState, useEffect } from 'react';
import { schemeService } from '../../services/schemeService';
import SchemeCard from '../../components/SchemeCard';
import SearchFilter from '../../components/SearchFilter';
import Loader from '../../components/Loader';
import { useNotification } from '../../context/NotificationContext';

const ViewSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { addNotification } = useNotification();

  const categories = ['Education', 'Healthcare', 'Agriculture', 'Employment', 'Housing'];

  useEffect(() => {
    fetchSchemes();
  }, [search, category]);

  const fetchSchemes = async () => {
    try {
      setLoading(true);
      const response = await schemeService.getAllSchemes({ search, category });
      setSchemes(response.data.data || []);
    } catch (error) {
      addNotification('Failed to load schemes', 'error');
      setSchemes([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white">Available Schemes</h1>
      <SearchFilter 
        search={search} 
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={categories}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemes && schemes.length > 0 ? (
          schemes.map(scheme => (
            <SchemeCard key={scheme._id} scheme={scheme} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-300 text-lg">No schemes found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSchemes;
