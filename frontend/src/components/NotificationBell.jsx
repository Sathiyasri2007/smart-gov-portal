import React, { useState, useEffect, useRef } from 'react';
import { FiBell, FiCheck, FiCheckCircle } from 'react-icons/fi';
import { getNotifications, getUnreadCount, markAsRead, markAllAsRead } from '../services/notificationService';
import { useAuth } from '../context/AuthContext';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUnreadCount();
      // Refresh every 30 seconds
      const interval = setInterval(fetchUnreadCount, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const response = await getUnreadCount();
      setUnreadCount(response.data.count);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await getNotifications();
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBellClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      fetchNotifications();
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications(notifications.map(n => 
        n._id === id ? { ...n, isRead: true } : n
      ));
      setUnreadCount(Math.max(0, unreadCount - 1));
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return '🎉';
      case 'warning':
        return '⏰';
      case 'error':
        return '❌';
      default:
        return '📄';
    }
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return new Date(date).toLocaleDateString();
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon */}
      <button
        onClick={handleBellClick}
        className="relative p-2 rounded-lg hover:bg-blue-grey-50 dark:hover:bg-blue-grey-800 text-primary dark:text-blue-grey-200 transition"
      >
        <FiBell size={22} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-blue-grey-800 rounded-xl shadow-lg border border-blue-grey-200 dark:border-blue-grey-700 z-50 max-h-[500px] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-blue-grey-200 dark:border-blue-grey-700 flex justify-between items-center">
            <h3 className="font-bold text-lg text-primary dark:text-white">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm text-primary hover:text-primary-light transition flex items-center gap-1"
              >
                <FiCheckCircle size={16} />
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto flex-1">
            {loading ? (
              <div className="p-8 text-center text-blue-grey-500">
                Loading...
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center text-blue-grey-500">
                <FiBell size={48} className="mx-auto mb-4 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`p-4 border-b border-blue-grey-100 dark:border-blue-grey-700 hover:bg-blue-grey-50 dark:hover:bg-blue-grey-700 transition ${
                    !notification.isRead ? 'bg-blue-50 dark:bg-blue-grey-900' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-primary dark:text-white text-sm">
                          {notification.title}
                        </h4>
                        {!notification.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(notification._id)}
                            className="text-primary hover:text-primary-light transition flex-shrink-0"
                            title="Mark as read"
                          >
                            <FiCheck size={16} />
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-blue-grey-600 dark:text-blue-grey-300 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-blue-grey-500 dark:text-blue-grey-400 mt-2">
                        {getTimeAgo(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-blue-grey-200 dark:border-blue-grey-700 text-center">
              <button className="text-sm text-primary hover:text-primary-light transition font-medium">
                View All Notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
