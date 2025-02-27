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

// import { store } from "store/store";
import { store } from "store/store";
// @mui material components
import Card from "@mui/material/Card";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import React, { useEffect, useState } from "react";

// Material Kit 2 React examples
import DefaultNavbar from "components/Navbar";

// Author page sections
import SimpleFooter from "components/Footer";
// Routes
import routes from "routes";

// Images
import bgImage from "assets/images/bg-about-us.jpg";
import Divider from "@mui/material/Divider";
import MKInput from "../../components/MKInput";
import RainbowButton from "../../components/RainbowButton";
import { useTheme } from "@mui/material/styles";
import { showModal } from "../../features/modalSlice/slice";

function ContactUs() {
  const theme = useTheme();

  // Contact form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Error states for each field
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Whenever the modal closes or opens, reset form states
  useEffect(() => {
    if (!open) {
      setName("");
      setEmail("");
      setMessage("");
      setErrorName("");
      setErrorEmail("");
      setErrorMessage("");
    }
  }, [open]);

  // Simple validation for email format
  const validateEmail = (emailValue) => {
    return /\S+@\S+\.\S+/.test(emailValue);
  };

  const handleSendMessage = async () => {
    // Validate fields
    let hasError = false;

    if (!name) {
      setErrorName("Please enter your name");
      hasError = true;
    }
    if (!email) {
      setErrorEmail("Please enter your email");
      hasError = true;
    } else if (!validateEmail(email)) {
      setErrorEmail("Please enter a valid email address");
      hasError = true;
    }
    if (!message) {
      setErrorMessage("Please enter your message");
      hasError = true;
    }

    if (hasError) return;

    store.dispatch(
      showModal({
        message: "Thanks for reaching out! Don`t forget to keep things simple.",
        status: 200,
        time: 2000,
        type: "success",
      })
    );
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <MKBox display="flex" flexDirection="column" minHeight="100vh">
      <DefaultNavbar
        brand="Simplicity"
        routes={routes}
        transparent
        light
        action={{
          type: "internal",
          route: "/sign-in",
          label: "Sign In",
          color: "default",
        }}
      />
      <MKBox
        minHeight="40vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      ></MKBox>

      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -7,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 1),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
          placeItems: "center",
        }}
      >
        <MKTypography variant="h1" verticalAlign="middle" mx={10} mt={2}>
          Contact us!
        </MKTypography>
        <MKTypography variant="h3" verticalAlign="middle" mx={10}>
          Have a question or feedback?
        </MKTypography>
        <MKTypography variant="h3" verticalAlign="middle" mx={10}>
          Send us a message!
        </MKTypography>
        <MKBox
          position="relative"
          display="flex"
          flexDirection="column"
          borderRadius="xl"
          bgColor="white"
          sx={{
            [theme.breakpoints.down("sm")]: {
              width: "300px",
            },
            [theme.breakpoints.up("sm")]: {
              width: "500px",
            },
            [theme.breakpoints.up("md")]: {
              width: "600px",
            },
            [theme.breakpoints.up("lg")]: {
              width: "700px",
            },
          }}
        >
          <Divider sx={{ my: 2 }} />

          <MKBox p={2}>
            {/* Name Field */}
            {errorName && (
              <MKTypography
                variant="caption"
                sx={{
                  color: "red",
                  display: "block",
                  fontWeight: 500,
                  mt: 0.5,
                  mb: 1,
                  ml: 1,
                }}
              >
                {errorName}
              </MKTypography>
            )}
            <MKInput
              type="text"
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => {
                if (errorName) setErrorName("");
                setName(e.target.value);
              }}
              error={Boolean(errorName)}
              sx={{ mb: 2 }}
            />

            {/* Email Field */}
            {errorEmail && (
              <MKTypography
                variant="caption"
                sx={{
                  color: "red",
                  display: "block",
                  fontWeight: 500,
                  mt: 0.5,
                  mb: 1,
                  ml: 1,
                }}
              >
                {errorEmail}
              </MKTypography>
            )}
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
              sx={{ mb: 2 }}
            />

            {/* Message Field */}
            {errorMessage && (
              <MKTypography
                variant="caption"
                sx={{
                  color: "red",
                  display: "block",
                  fontWeight: 500,
                  mt: 0.5,
                  mb: 1,
                  ml: 1,
                }}
              >
                {errorMessage}
              </MKTypography>
            )}
            <MKInput
              type="text"
              label="Message"
              multiline
              rows={4}
              fullWidth
              value={message}
              onChange={(e) => {
                if (errorMessage) setErrorMessage("");
                setMessage(e.target.value);
              }}
              error={Boolean(errorMessage)}
              sx={{ mb: 0 }}
            />
          </MKBox>
          <Divider sx={{ my: 1, display: "none" }} />

          {/* FOOTER / BUTTONS */}
          <MKBox display="flex" justifyContent="center" width="100%" mt={2}>
            {" "}
            <RainbowButton
              justifycontent="flex-end"
              backgroundType="blue"
              width="100%"
              onClick={handleSendMessage}
            >
              Send
            </RainbowButton>
          </MKBox>
        </MKBox>
        <MKTypography variant="h4" color="info" textGradient sx={{ pt: 4 }} mb={5}>
          Simplicity that sticks.
        </MKTypography>
      </Card>
      <MKBox pt={6} px={0} mt="auto">
        <SimpleFooter />
      </MKBox>
    </MKBox>
  );
}

export default ContactUs;
