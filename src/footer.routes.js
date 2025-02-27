// // @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import YouTubeIcon from "@mui/icons-material/YouTube";

// Material Kit 2 React components
import MKTypography from "components/MKTypography";

// Images
import logoCT from "assets/images/logo-ct-dark.png";

const date = new Date().getFullYear();

export default {
  brand: {
    name: "Material Kit 2",
    image: logoCT,
    route: "/",
  },
  socials: [],
  menus: [
    {
      name: "company",
      items: [{ name: "about us", href: "https://www.creative-tim.com/presentation" }],
    },
    {
      name: "resources",
      items: [{ name: "illustrations", href: "https://iradesign.io/" }],
    },
    {
      name: "help & support",
      items: [{ name: "contact us", href: "" }],
    },
    {
      name: "legal",
      items: [{ name: "terms & conditions", href: "https://www.creative-tim.com/terms" }],
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      All rights reserved. Copyright &copy; {date} Material Kit by{" "}
      <MKTypography
        component="a"
        target="_blank"
        rel="noreferrer"
        variant="button"
        fontWeight="regular"
      >
        NeSt24
      </MKTypography>
      .
    </MKTypography>
  ),
};
