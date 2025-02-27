import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

const RainbowButton = forwardRef(function RainbowButton(props, ref) {
  const { backgroundType, width, height, children, sx, ...other } = props;
  const theme = useTheme();

  return (
    <Button
      ref={ref}
      {...other}
      sx={{
        position: "relative",
        zIndex: 0,
        width: width,
        height: height,
        borderRadius: "10px",
        overflow: "hidden",
        padding: "1rem",
        fontFamily: "sans-serif",
        fontWeight: "bold",
        fontSize: "16px",
        color: "#000",
        textTransform: "uppercase",
        background: "white",
        border: "none",
        cursor: "pointer",
        [theme.breakpoints.down("sm")]: {
          width: "auto",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          zIndex: "-2",
          left: "-50%",
          top: "-50%",
          width: "200%",
          height: "200%",
          backgroundColor: "#399953",
          backgroundRepeat: "no-repeat",
          backgroundSize: "50% 50%, 50% 50%",
          backgroundPosition: "0 0, 100% 0, 100% 100%, 0 100%",
          backgroundImage:
            backgroundType === "red"
              ? "linear-gradient(#c83a3a, #c83a3a), linear-gradient(#e15a5a, #e15a5a), linear-gradient(#f58787, #f58787), linear-gradient(#ffb3b3, #ffb3b3)" // Red gradient
              : backgroundType === "blue"
              ? "linear-gradient(#3a5fc8, #3a5fc8), linear-gradient(#5a83e1, #5a83e1), linear-gradient(#87aef5, #87aef5), linear-gradient(#b3d1ff, #b3d1ff)" // Blue gradient
              : "linear-gradient(#2e7d32, #2e7d32), linear-gradient(#4caf50, #4caf50), linear-gradient(#81c784, #81c784), linear-gradient(#c8e6c9, #c8e6c9)",
          animation: "rotate 4s linear infinite",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          zIndex: "-1",
          left: "4px",
          top: "4px",
          width: "calc(100% - 8px)",
          height: "calc(100% - 8px)",
          background: "white",
          borderRadius: "8px",
        },
        "@keyframes rotate": {
          "100%": {
            transform: "rotate(1turn)",
          },
        },
        "&:hover": {
          color: "#2c58a0", // Darker blue text on hover
        },
        ...sx, // allow custom sx overrides
      }}
    >
      {children}
    </Button>
  );
});

RainbowButton.propTypes = {
  backgroundType: PropTypes.oneOf(["red", "blue", "green"]),
  width: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default RainbowButton;
