// This file is part of Cloudreve Pro edition source code, Reference ID: 1380
import SessionManager from "../../session";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LandingPage from "./Landing/LandingPage.tsx";

export const HomeRedirect = () => {
  const navigate = useNavigate();
  const loggedIn = !!SessionManager.currentLoginOrNull();

  useEffect(() => {
    if (loggedIn) {
      navigate("/home", { replace: true });
    }
  }, [loggedIn, navigate]);

  return loggedIn ? <div></div> : <LandingPage />;
};
