import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "assets/theme";
import routes from "routes";
import MainPage from "pages/MainPage";
import GlobalModal from "components/Modal/GlobalModal";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.flatMap((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse); // Recursively process nested routes
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component} // Directly render the JSX component
            key={route.route} // Use the route as the unique key
          />
        );
      }

      return [];
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalModal />
      <Routes>
        {getRoutes(routes)}
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}
