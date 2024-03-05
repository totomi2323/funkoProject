import React, { createContext, useContext, useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigate} from "react-router-dom";

const AuthContext = createContext();

  
  export const useAuth = () => {
    return useContext(AuthContext);
  };

  const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState("")
    const [user, setUser] = useState(undefined)

    const navigate = useNavigate();
  
    const login = useGoogleLogin({
      onSuccess: async ({ code }) => {
        setLoggedIn(true);
        const data = await fetch('http://127.0.0.1:5000/googleAuth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        }).then((response) => response.json());

        localStorage.setItem("token", data.token);
        navigate("/");
        setToken(data.token)
        setUser(data.userDetails)
      },
      redirect_uri: 'postmessage',
      flow: 'auth-code',
    });
  
    const logout = () => {
      googleLogout();
      setLoggedIn(false);
      setToken("")
      setUser(undefined)
      localStorage.removeItem("token")
    };
  
    return (
      <AuthContext.Provider value={{token, loggedIn, user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthProvider;