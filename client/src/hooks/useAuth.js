import { useState } from 'react';
import socket from '../socket';

function useAuth() {
  const [username, setUsername] = useState(
    localStorage.getItem('username') || '',
  );
  const [temporaryName, setTemporaryName] = useState('');

  const login = (submitEvent) => {
    submitEvent.preventDefault();

    const trimmedName = temporaryName.trim();

    if (trimmedName) {
      localStorage.setItem('username', trimmedName);
      setUsername(trimmedName);
      socket.emit('set_username', trimmedName);
    }
  };

  const logout = () => {
    localStorage.removeItem('username');
    setUsername('');
  };

  return {
    username,
    temporaryName,
    setTemporaryName,
    login,
    logout,
  };
}

export default useAuth;
