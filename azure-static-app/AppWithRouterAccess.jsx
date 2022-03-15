import "./App.css";

import { useNavigate, Route, Routes } from "react-router-dom";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security, LoginCallback } from "@okta/okta-react";

import Home from "./Home";

const oktaAuth = new OktaAuth({
  issuer: "{yourOktaIssuer}",
  clientId: "{yourClientId}",
  redirectUri: window.location.origin + "/login/callback",
});

function AppWithRouterAccess() {
  //change from useHistory
  const navigate = useNavigate();

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || "/", window.location.origin));
  };
  //end Change

  //change add routes
  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/callback" element={<LoginCallback />} />
      </Routes>
    </Security>
  );
}
//end change

export default AppWithRouterAccess;
