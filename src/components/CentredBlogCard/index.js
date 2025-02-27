// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function CenteredBlogCard({ title, description }) {
  return (
    <Card sx={{ p: 3, borderRadius: "lg", boxShadow: 3 }}>
      <MKBox textAlign="left">
        <MKTypography variant="h5" textTransform="capitalize" fontWeight="bold">
          {title}
        </MKTypography>
        <MKBox mt={1}>
          <MKTypography variant="body2" component="p" color="text">
            {description}
          </MKTypography>
        </MKBox>
      </MKBox>
    </Card>
  );
}

// Typechecking props for the CenteredBlogCard
CenteredBlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CenteredBlogCard;
