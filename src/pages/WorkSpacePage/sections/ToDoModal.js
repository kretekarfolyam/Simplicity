import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import todoService from "api/todoService";
import { useDispatch } from "react-redux";
import { logout } from "features/authSlice/slice";
import { format, isValid } from "date-fns";
import { useTheme } from "@mui/material/styles";
import RainbowButton from "components/RainbowButton";

const ModalMode = Object.freeze({
  CREATE: "create",
  EDIT: "edit",
  READ: "read",
});

function TaskModal({
  task,
  open,
  readOnly = false,
  onClose,
  onTaskCreated,
  onTaskUpdated,
  onTaskDeleted,
}) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const initialMode = !task ? ModalMode.CREATE : ModalMode.READ;
  const [mode, setMode] = useState(initialMode);

  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [deadline, setDeadline] = useState(task ? task.deadline : "");

  const [errorTitle, setErrorTitle] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorDeadline, setErrorDeadline] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setDeadline(task.deadline || "");
    } else {
      setTitle("");
      setDescription("");
      setDeadline("");
    }
    setMode(!task ? ModalMode.CREATE : ModalMode.READ);
  }, [task]);

  const setNoError = () => {
    setErrorTitle("");
    setErrorDescription("");
    setErrorDescription("");
  };

  const closeModal = () => {
    setNoError();
    if (mode === ModalMode.EDIT && task) {
      setMode(ModalMode.READ);
    }
    onClose();
  };

  const handleEditToggle = () => {
    setNoError();
    setMode(ModalMode.EDIT);
  };

  const handleBackToggle = () => {
    setNoError();
    setMode(ModalMode.READ);
    setTitle(task.title);
    setDescription(task.description);
    setDeadline(task.deadline);
  };

  // Handle updating an existing task.
  const handleUpdateTask = async () => {
    if (!title) {
      setErrorTitle("Please fill title");
    }

    if (!description) {
      setErrorDescription("Please fill description");
    }

    if (!deadline) {
      setErrorDeadline("Please fill deadline");
    }

    if (!title || !description || !deadline) {
      return;
    }
    try {
      const updatedTask = {
        title,
        description,
        completed: false,
        deadline,
      };
      await todoService.updateTodo(task.id, updatedTask);
      setMode(ModalMode.READ);
      if (onTaskUpdated) onTaskUpdated();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        dispatch(logout());
        localStorage.removeItem("accessToken");
      }
    }
  };

  // Handle deleting a task.
  const handleDeleteTask = async () => {
    try {
      await todoService.deleteTodo(task.id);
      if (onTaskDeleted) onTaskDeleted();
      closeModal();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        dispatch(logout());
        localStorage.removeItem("accessToken");
      }
    }
  };

  // Handle creating a new task.
  const handleCreateTask = async () => {
    if (!title) {
      setErrorTitle("Please fill title");
    }

    if (!description) {
      setErrorDescription("Please fill description");
    }

    if (!deadline) {
      setErrorDeadline("Please fill deadline");
    }

    if (!title || !description || !deadline) {
      return;
    }

    try {
      const taskData = { title, description, deadline, completed: false };
      await todoService.createTodo(taskData);
      setTitle("");
      setDescription("");
      setDeadline("");
      if (onTaskCreated) onTaskCreated();
      closeModal();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        dispatch(logout());
        localStorage.removeItem("accessToken");
      }
    }
  };

  const editable = mode === ModalMode.CREATE || mode === ModalMode.EDIT;

  return (
    <Modal open={open} onClose={closeModal} sx={{ display: "grid", placeItems: "center" }}>
      <Slide direction="down" in={open} timeout={500}>
        <MKBox
          position="relative"
          width="500px"
          display="flex"
          flexDirection="column"
          borderRadius="xl"
          bgColor="white"
          shadow="xl"
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
          <MKBox display="flex" alignItems="center" justifyContent="space-between" p={2}>
            <MKTypography variant="h5">
              {mode === ModalMode.CREATE && "Create Task"}
              {mode === ModalMode.EDIT && "Edit Task"}
              {mode === ModalMode.READ && "Task Details"}
            </MKTypography>
            <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={closeModal} />
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox p={2}>
            {editable ? (
              <>
                {errorTitle && (
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
                    {errorTitle}
                  </MKTypography>
                )}
                <MKInput
                  type="text"
                  label="Title"
                  fullWidth
                  value={title}
                  onChange={(e) => {
                    if (errorTitle) setErrorTitle("");
                    setTitle(e.target.value);
                  }}
                  error={Boolean(errorTitle)}
                  sx={{ mb: 2 }}
                />
                {errorDescription && (
                  <MKTypography
                    variant="caption"
                    sx={{
                      color: "red", // Manually set error text to red
                      display: "block", // Ensure it's treated as a block-level element
                      fontWeight: 500,
                      mt: 0.5,
                      mb: 1,
                      ml: 1,
                    }}
                  >
                    {errorDescription}
                  </MKTypography>
                )}

                <MKInput
                  type="text"
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => {
                    if (errorDescription) setErrorDescription("");
                    setDescription(e.target.value);
                  }}
                  error={Boolean(errorDescription)}
                  sx={{ mb: 2 }}
                />
                {errorDeadline && (
                  <MKTypography
                    variant="caption"
                    sx={{
                      color: "red", // Manually set error text to red
                      display: "block", // Ensure it's treated as a block-level element
                      fontWeight: 500,

                      mt: 0.5,
                      mb: 1,
                      ml: 1,
                    }}
                  >
                    {errorDeadline}
                  </MKTypography>
                )}

                <MKInput
                  type="datetime-local"
                  fullWidth
                  value={
                    isValid(new Date(deadline))
                      ? format(new Date(deadline), "yyyy-MM-dd'T'HH:mm")
                      : ""
                  }
                  onChange={(e) => {
                    if (errorDeadline) setErrorDeadline("");
                    setDeadline(e.target.value);
                  }}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
              </>
            ) : (
              <>
                <MKTypography
                  variant="h3" // Larger text for the title
                  sx={{
                    wordWrap: "break-word",
                    fontWeight: "bold", // Bold the title
                    mb: 1, // Add margin below the title
                  }}
                >
                  {title}
                </MKTypography>
                <Divider sx={{ my: 1 }} />
                <MKTypography
                  variant="body1" // Default size for the description
                  sx={{
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                    mb: 2, // Add margin below the description
                  }}
                >
                  {description}
                </MKTypography>
                <Divider sx={{ my: 1 }} />

                <MKTypography
                  variant="body2" // Smaller text for the date
                  sx={{
                    color: "gray", // Optional: Make the date text gray
                    mt: 1, // Add margin above the date
                  }}
                >
                  {" "}
                  {isValid(new Date(deadline))
                    ? format(new Date(deadline), "dd MMMM yyyy, HH:mm")
                    : "Invalid Date"}
                </MKTypography>
              </>
            )}
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox display="flex" justifyContent="space-between" p={1.5} sx={{ ml: 0.5, mr: 0.5 }}>
            {mode === ModalMode.CREATE && (
              <RainbowButton backgroundType="blue" onClick={handleCreateTask}>
                Create
              </RainbowButton>
            )}
            {mode === ModalMode.EDIT && (
              <>
                <RainbowButton
                  width="100px"
                  backgroundType="green"
                  height="20px"
                  onClick={handleUpdateTask}
                >
                  Save
                </RainbowButton>
                <RainbowButton
                  width="100px"
                  backgroundType="blue"
                  height="20px"
                  onClick={handleBackToggle}
                >
                  Back
                </RainbowButton>
              </>
            )}
            {mode === ModalMode.READ && task && (
              <>
                {!readOnly && (
                  <RainbowButton
                    width="100px"
                    backgroundType="blue"
                    height="20px"
                    onClick={handleEditToggle}
                  >
                    Edit
                  </RainbowButton>
                )}
                <RainbowButton
                  width="100px"
                  height="20px"
                  backgroundType="red"
                  onClick={handleDeleteTask}
                >
                  Delete
                </RainbowButton>
              </>
            )}
          </MKBox>
        </MKBox>
      </Slide>
    </Modal>
  );
}

TaskModal.propTypes = {
  task: PropTypes.object, // If not provided, the modal will operate in create mode.
  open: PropTypes.bool.isRequired,
  readOnly: PropTypes.bool, // Optional flag to force read-only mode.
  onClose: PropTypes.func.isRequired,
  onTaskCreated: PropTypes.func, // Callback for when a task is created.
  onTaskUpdated: PropTypes.func, // Callback for when a task is updated.
  onTaskDeleted: PropTypes.func, // Callback for when a task is deleted.
};

export default TaskModal;
