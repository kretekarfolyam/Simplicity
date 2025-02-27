/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// // react-router-dom components
import { Link } from "react-router-dom";
import React, { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Material Kit 2 React example components
import DefaultNavbar from "components/Navbar";
import Footer from "components/Footer";

// Material Kit 2 React page layout routes
import routes from "routes";
import authService from "api/authService";
import { useNavigate } from "react-router-dom";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorPassword("");
    setErrorEmail("");
    setErrorUsername("");

    if (!username || !password || !email) {
      setErrorPassword("Please enter password.");
      setErrorEmail("Please enter email.");
      setErrorUsername("Please enter username.");
      return;
    }

    if (!(password.length >= 8)) {
      setErrorPassword("Password must be 8 characters");
      return;
    }

    try {
      await authService.register({ username, email, password });
      setSuccess(true);
      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        console.error("Unexpected Error:", err.message);

        if (errorData.email) {
          setErrorEmail(errorData.email[0]);
        }
        if (errorData.username) {
          setErrorUsername(errorData.username[0]);
        }
      } else {
        console.error("Unexpected Error:", err.message);
      }
    }
  };

  return (
    <>
      <DefaultNavbar routes={routes} transparent light />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Sign up
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form" onSubmit={handleSubmit}>
                  <MKTypography
                    variant="caption"
                    sx={{
                      color: "red", // Manually set error text to red
                      display: "block", // Ensure it's treated as a block-level element
                      fontWeight: 500,

                      mt: 0.5,
                      mb: 2,
                      ml: 1,
                    }}
                  >
                    {errorUsername}
                  </MKTypography>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Login"
                      fullWidth
                      value={username}
                      onChange={(e) => {
                        if (errorUsername) setErrorUsername("");
                        setUsername(e.target.value);
                      }}
                      error={Boolean(errorUsername)}
                      success={success && !errorUsername}
                      helperText={errorUsername}
                      autoComplete="username"
                    />
                  </MKBox>
                  <MKTypography
                    variant="caption"
                    sx={{
                      color: "red", // Manually set error text to red
                      display: "block", // Ensure it's treated as a block-level element
                      fontWeight: 500,

                      mt: 0.5,
                      mb: 2,
                      ml: 1,
                    }}
                  >
                    {errorEmail}
                  </MKTypography>
                  <MKBox mb={2}>
                    <MKInput
                      type="email"
                      label="Email"
                      fullWidth
                      value={email}
                      onChange={(e) => {
                        if (errorEmail) setErrorEmail("");
                        setEmail(e.target.value);
                      }}
                      error={Boolean(errorEmail)}
                      success={success && !errorEmail}
                      helperText={errorEmail}
                    />
                  </MKBox>
                  <MKTypography
                    variant="caption"
                    sx={{
                      color: "red", // Manually set error text to red
                      display: "block", // Ensure it's treated as a block-level element
                      fontWeight: 500,

                      mt: 0.5,
                      mb: 2,
                      ml: 1,
                    }}
                  >
                    {errorPassword}
                  </MKTypography>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Password"
                      fullWidth
                      value={password}
                      onChange={(e) => {
                        if (errorPassword) setErrorPassword("");
                        setPassword(e.target.value);
                      }}
                      error={Boolean(errorPassword)}
                      autoComplete="current-password"
                    />
                  </MKBox>
                  <MKBox display="flex" alignItems="center" ml={-1}></MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="info" fullWidth type="submit">
                      sign up
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Do you have already an account?{" "}
                      <MKTypography
                        component={Link}
                        to={"/sign-IN"}
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign in
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <Footer light />
      </MKBox>
    </>
  );
}

export default SignUpPage;
