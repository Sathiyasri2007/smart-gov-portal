import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeNotification(id), 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notif => (
          <div key={notif.id} className={`card p-4 min-w-[300px] ${
            notif.type === 'success' ? 'bg-green-500' :
            notif.type === 'error' ? 'bg-red-500' :
            notif.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
          } text-white`}>
            {notif.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
