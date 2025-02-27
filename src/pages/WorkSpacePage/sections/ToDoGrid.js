import React, { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKTypography from "components/MKTypography";
import TaskModal from "pages/WorkSpacePage/sections/ToDoModal";
import RainbowButton from "components/RainbowButton";

function TodoGrid({ todos, refreshTodos }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  const handleTaskChange = () => {
    console.log("Task updated/created. Refresh list.");
    refreshTodos();
  };

  const openCreateModal = () => {
    setSelectedTask(null);
    setModalOpen(true);
  };

  return (
    <>
      <RainbowButton sx={{ mb: 3 }} backgroundType="blue" width="200px" onClick={openCreateModal}>
        Create Task
      </RainbowButton>
      <Grid container spacing={3}>
        {todos.map((task) => (
          <Grid key={task.id} item xs={12} sm={6} md={4}>
            <Card onClick={() => handleCardClick(task)} sx={{ cursor: "pointer", p: 2 }}>
              <MKTypography
                variant="h6"
                color="secondary"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {task.title}
              </MKTypography>
              <MKTypography
                variant="body2"
                color="secondary"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {task.description}
              </MKTypography>
            </Card>
          </Grid>
        ))}
      </Grid>
      {modalOpen && (
        <TaskModal
          open={modalOpen}
          task={selectedTask}
          onClose={closeModal}
          onTaskCreated={handleTaskChange}
          onTaskUpdated={handleTaskChange}
          onTaskDeleted={handleTaskChange}
        />
      )}
    </>
  );
}

TodoGrid.propTypes = {
  todos: PropTypes.array.isRequired,
  refreshTodos: PropTypes.func.isRequired,
};

export default TodoGrid;
