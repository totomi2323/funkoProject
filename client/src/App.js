import React from "react";
import Router from "./components/Router";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div>
        <Router />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
