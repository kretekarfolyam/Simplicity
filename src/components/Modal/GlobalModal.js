import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Slide } from "@mui/material";
import { closeModal } from "features/modalSlice/slice";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
// import AlertTitle from "@mui/material/AlertTitle";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="down" ref={ref} {...props} />
));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translate(-50%, -100%)",
    width: "400px",
    borderRadius: "10px",
    backgroundColor: "white",
    padding: 0,
    opacity: 0,
    transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
    [theme.breakpoints.down("sm")]: {
      width: "250px",
      left: "43%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "600px",
      left: "50%",
    },
  },
  "&.MuiDialog-root .MuiDialog-paper": {
    opacity: 1,
    transform: "translate(-50%, 20px)",
  },
}));

export default function GlobalModal() {
  const dispatch = useDispatch();
  const { isOpen, message, type, time } = useSelector((state) => state.ui);

  const handleClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        handleClose();
      }, time);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen, handleClose]);

  return (
    <StyledDialog open={isOpen} onClose={handleClose} TransitionComponent={Transition}>
      <Alert severity={type || "info"}>{message}</Alert>
    </StyledDialog>
  );
}
