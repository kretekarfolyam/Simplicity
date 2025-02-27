import Icon from "@mui/material/Icon";

// @mui icons

// Pages
import MainPage from "pages/MainPage";
import SignInPage from "pages/SignInPage";
import SignUpPage from "pages/SignUpPage";
import AboutUs from "pages/AboutUsPage";
import ContactUsPage from "pages/ContactUsPage";

const routes = [
  {
    name: "pages",
    icon: <Icon>dashboard</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "landing pages",
        collapse: [
          {
            name: "main page",
            route: "/",
            component: <MainPage />,
          },
          {
            name: "about us",
            route: "/about-us",
            component: <AboutUs />,
          },
          { name: "contact us", route: "/contact-us", component: <ContactUsPage /> },
        ],
      },
      {
        name: "account",
        collapse: [
          {
            name: "sign in",
            route: "/sign-in",
            component: <SignInPage />,
          },
          {
            name: "sign up",
            route: "/sign-up",
            component: <SignUpPage />,
          },
        ],
      },
    ],
  },
];

export default routes;
