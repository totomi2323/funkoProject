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
    };

    const checkLoggedIn = async () => {


      const userToken = localStorage.getItem("token");
      if (userToken) {
        const data = await fetch('http://127.0.0.1:5000/googleAuth/protected', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${userToken}`
          }
        }).then((response) => {
          response.json().then((data) => {
            if (response.status === 401) {
            console.log(response.statusText)
            } else {
          
              setUser(data.user.userDetails)
              setToken(userToken)
              setLoggedIn(true)
              navigate("/");
            }
          
          });
        });
    
      }
    }
  
  const updateUser = (data) => {
  
    let parsedUser = JSON.parse(data.user)
    setUser(parsedUser)
    setToken(data.token)
    localStorage.setItem("token", data.token);
    localStorage.setItem("user" , data.user) 
  }
    return (
      <AuthContext.Provider value={{token, loggedIn, user, login, logout, checkLoggedIn, updateUser }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthProvider;