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

        let loginUser = JSON.parse(data.user)
        localStorage.setItem("token", data.token);
        localStorage.setItem("user" , data.user)
        console.log(data)
        navigate("/");
        setToken(data.token)
        setUser(loginUser)
      },
      redirect_uri: 'postmessage',
      flow: 'auth-code',
    });
  
    const logout = () => {
      googleLogout();
      navigate("/");
      setLoggedIn(false);
      setToken("")
      setUser(undefined)
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    };

    const checkLoggedIn = () => {
      const loggedInUser = localStorage.getItem("user");
      const userToken = localStorage.getItem("token");
      if (loggedInUser && userToken) {
        const foundUser = JSON.parse(loggedInUser);
        setUser(foundUser);
        setToken(userToken)
        setLoggedIn(true)
      }
    }
  
    return (
      <AuthContext.Provider value={{token, loggedIn, user, login, logout, checkLoggedIn }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthProvider;