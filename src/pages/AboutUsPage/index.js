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
import Card from "@mui/material/Card";
// import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "components/Navbar";

// Author page sections
import SimpleFooter from "components/Footer";
import HorizontalTeamCard from "components/Cards/TeamCards/HorizontalTeamCard";
// Routes
import routes from "routes";

// Images
import bgImage from "assets/images/bg-about-us.jpg";
import adhd from "assets/images/adhd.jpg";
import team2 from "assets/images/image.png";

function AboutUs() {
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
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
          placeItems: "center",
        }}
      >
        <MKTypography variant="h1" verticalAlign="middle" mx={10} mt={8}>
          Welcome to Simplicity!
        </MKTypography>
        <MKTypography variant="h3" verticalAlign="middle" mx={10}>
          The to-do list for people who can’t deal with to-do lists.
        </MKTypography>
        <MKTypography
          variant="body1"
          verticalAlign="middle"
          color="text"
          mb={1}
          mt={4}
          mx={5}
          sx={{ maxWidth: 1200 }}
        >
          We could’ve gone all out. We could’ve added fancy features, colorful tags, priority
          levels, and a million customization options… but then we would’ve gotten overwhelmed and
          never finished. We could’ve made a sleek, AI-powered, customizable task management suite
          that syncs with your calendar, predicts your habits, and plays calming productivity
          sounds. But let’s be real—would we use that? Probably not.
        </MKTypography>
        <MKTypography variant="body1" color="text" mb={1} mt={1} mx={5} sx={{ maxWidth: 1200 }}>
          Instead, we did the absolute least—on purpose. Just tasks, deadlines (if you feel like
          it), and descriptions. That’s it. Because productivity shouldn’t be a project of its own.
        </MKTypography>
        <MKTypography variant="body1" color="text" mb={1} mt={1} mx={5} sx={{ maxWidth: 1200 }}>
          The more complicated an app gets, the less you actually use it. And if you’re anything
          like us, the moment something feels like work, you’ll suddenly remember that your kitchen
          needs reorganizing, your inbox needs sorting, and maybe now is a great time to research
          the lifespan of sea turtles.
        </MKTypography>
        <MKTypography variant="body1" color="text" mb={8} mt={6} mx={4} sx={{ maxWidth: 1200 }}>
          That’s why we made Simplicity ridiculously simple—so you can stop organizing and actually
          get things done.
        </MKTypography>

        <MKTypography variant="h4" color="info" textGradient mb={10}>
          Simplicity that sticks.
        </MKTypography>

        <MKTypography variant="h2" color="text" textGradient mb={4}>
          Who are we?
        </MKTypography>

        <Grid item xs={12} lg={6} mb={8} sx={{ maxWidth: 1200 }}>
          <MKBox mb={1}>
            <HorizontalTeamCard
              image={adhd}
              width="60%"
              name="Ali"
              position={{ color: "info", label: "The Idea Guy" }}
              description="Living with ADHD means constantly battling distractions, jumping between hyperfocus and where-did-the-last-three-hours-go?, juggling a million ideas, hyperfocusing on the wrong ones, and forgetting why you opened the app in the first place  and feeling overwhelmed by complex task managers. Frustrated with apps that had too many options, I wanted something simple—just the essentials, nothing more. That’s how Simplicity was born: a to-do list that actually works for brains like mine (and probably yours too)."
            />
          </MKBox>
        </Grid>
        <Grid item xs={12} lg={6} sx={{ maxWidth: 1200 }}>
          <MKBox mb={1}>
            <HorizontalTeamCard
              image={team2}
              width="60%"
              name="Atai"
              position={{ color: "info", label: "The Builder" }}
              description="When Ali shared his vision, I knew it was something special, yet I immediately forgot half of it—but the part I remembered sounded great. Too many productivity tools try to do everything and end up making you do nothing. So we built Simplicity with one rule: Keep it ridiculously easy. My goal? Make sure you spend more time doing things and less time organizing them. Because let’s be honest, if an app needs a tutorial, we’re probably not using it."
            />
          </MKBox>
        </Grid>
      </Card>
      <MKBox pt={6} px={1} mt="auto">
        <SimpleFooter />
      </MKBox>
    </MKBox>
  );
}

export default AboutUs;
