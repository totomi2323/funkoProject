import React from "react";
import Router from "./components/Router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthProvider from "../src/hooks/AuthProvider";
import "./App.css"
function App() {
  return (
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <div className="main">
          <Router />
        </div>
      </GoogleOAuthProvider>
  );
}

export default App;
