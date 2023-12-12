import { useState, useEffect } from 'react';

export const usePushNotification = () => {
  const [notificationPermission, setNotificationPermission] =
    useState('default');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  const checkNotificationPermission = () => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  };

  const setNotification = (title, body) => {
    setTitle(title);
    setBody(body);
  };

  const showNotification = () => {
    if ('Notification' in window) {
      if (notificationPermission === 'granted') {
        new Notification(title, { body });
      } else if (notificationPermission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          setNotificationPermission(permission);
          if (permission === 'granted') {
            new Notification(title, { body });
          }
        });
      }
    }
  };

  return { showNotification, setNotification };
};
