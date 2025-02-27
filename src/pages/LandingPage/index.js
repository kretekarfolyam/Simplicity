/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// Material Kit 2 React examples
import DefaultNavbar from "components/Navbar";
import SimpleFooter from "components/Footer";
import Team from "pages/LandingPage/sections/Team";
import Featuring from "pages/LandingPage/sections/Featuring";

// Routes
import routes from "routes";
import { useNavigate } from "react-router-dom";

// Images
import bgImage from "assets/images/bg-about-us.jpg";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <DefaultNavbar
        brand="Simplicity"
        routes={routes}
        action={{
          type: "internal",
          route: "/sign-in",
          label: "Sign In",
          color: "default",
        }}
        transparent
        light
      />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={8}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ mx: "auto", textAlign: "center" }}
          >
            <MKTypography
              variant="h1"
              color="white"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Minimal steps, maximum relief
            </MKTypography>
            <MKTypography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
              Welcome to Simplicity – the no-fuss, sticky-note style to-do. We believe in doing
              less, so you can focus on what matters: jot down your task, set a deadline if needed,
              and let go of the clutter. Simplicity that sticks.
            </MKTypography>
            <MKButton
              color="default"
              sx={{ color: ({ palette: { dark } }) => dark.main }}
              onClick={() => navigate("/sign-up")}
            >
              create account
            </MKButton>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Featuring />
        <Grid
          container
          item
          xs={10}
          lg={6}
          justifyContent="center"
          sx={{ mx: "auto", textAlign: "center", mb: 10 }}
        >
          <MKTypography variant="h2" mb={2} mx={0.5}>
            Trusted by
          </MKTypography>
          <MKTypography variant="h2" color="info" textGradient mx={0.5}>
            2+ ADHD people
          </MKTypography>
          <MKTypography variant="body1" color="text">
            We assume this means way more, but they got distracted before filling out the form.
          </MKTypography>
        </Grid>
        <Team />
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <SimpleFooter />
      </MKBox>
    </>
  );
}

export default LandingPage;
