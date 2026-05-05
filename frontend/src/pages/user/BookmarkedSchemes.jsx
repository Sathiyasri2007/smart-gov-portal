import React, { useState, useEffect } from 'react';
import { bookmarkService } from '../../services/bookmarkService';
import SchemeCard from '../../components/SchemeCard';
import Loader from '../../components/Loader';
import { FiBookmark } from 'react-icons/fi';

const BookmarkedSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const response = await bookmarkService.getBookmarkedSchemes();
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
      <div className="flex items-center mb-6">
        <FiBookmark className="text-3xl text-purple-600 mr-3" />
        <h1 className="text-3xl font-bold">Bookmarked Schemes</h1>
      </div>
      
      {schemes.length === 0 ? (
        <div className="card text-center py-12">
          <FiBookmark className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg">No bookmarked schemes yet</p>
          <p className="text-gray-400 dark:text-gray-500 mt-2">Browse schemes and bookmark your favorites</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map(scheme => (
            <SchemeCard key={scheme._id} scheme={scheme} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkedSchemes;
