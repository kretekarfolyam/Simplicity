import React from "react";
import { useSelector } from "react-redux"; // Replace with Context API if you're not using Redux
import LandingPage from "pages/LandingPage/index"; // Unauthenticated main page
import WorkSpacePage from "pages/WorkSpacePage/index"; // Authenticated main page

const MainPage = () => {
  // Get authentication state from Redux or Context
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);

  return isAuthenticated ? <WorkSpacePage /> : <LandingPage />;
};

export default MainPage;
