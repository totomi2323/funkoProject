import React from 'react';
import { useAuth } from '../hooks/AuthProvider'

const GoogleAuthButton = () => {
  const { loggedIn, login, logout } = useAuth();

  return (
    <div>
      {loggedIn ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Google Login</button>
      )}
    </div>
  );
};

export default GoogleAuthButton;