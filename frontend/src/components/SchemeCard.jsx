import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiUsers, FiArrowRight, FiBookmark } from 'react-icons/fi';
import { bookmarkService } from '../services/bookmarkService';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';

const SchemeCard = ({ scheme }) => {
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const { addNotification } = useNotification();
  const { user } = useAuth();

  const handleBookmark = async (e) => {
    e.preventDefault();
    try {
      const response = await bookmarkService.toggleBookmark(scheme._id);
      setIsBookmarked(response.data.bookmarked);
      addNotification(response.data.message, 'success');
    } catch (error) {
      addNotification('Failed to update bookmark', 'error');
    }
  };

  return (
    <div className="card hover:shadow-xl transition-all hover:scale-105 border-l-4 border-purple-500">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-white">{scheme.name}</h3>
        <div className="flex gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            scheme.status === 'active' ? 'bg-emerald-600 text-white' : 'bg-gray-500 text-white'
          }`}>
            {scheme.status}
          </span>
          {user && (
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-full transition-colors ${
                isBookmarked 
                  ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-purple-50'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark scheme'}
            >
              <FiBookmark className={isBookmarked ? 'fill-current' : ''} />
            </button>
          )}
        </div>
      </div>
      
      <p className="text-white mb-4 line-clamp-3">{scheme.description}</p>
      
      <div className="flex items-center gap-4 text-sm text-white mb-4">
        <div className="flex items-center">
          <FiCalendar className="mr-1" />
          <span>Deadline: {new Date(scheme.deadline).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <FiUsers className="mr-1" />
          <span>{scheme.category}</span>
        </div>
      </div>
      
      <Link to={`/schemes/${scheme._id}`} className="flex items-center text-white hover:text-gray-200 font-medium transition-colors">
        View Details <FiArrowRight className="ml-2" />
      </Link>
    </div>
  );
};

export default SchemeCard;
