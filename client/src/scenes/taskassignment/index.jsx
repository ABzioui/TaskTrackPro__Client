import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  Button,
  Box,
  useTheme,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useGetUsersQuery, useGetTasksQuery } from "state/api"; // Update this with your API file
import PageHeader from "components/PageHeader";

const TaskAssignment = () => {
  const theme = useTheme();
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedTask, setSelectedTask] = useState("");

  const { data: userData, isLoading: isUserLoading } = useGetUsersQuery();
  const { data: taskData, isLoading: isTaskLoading } = useGetTasksQuery();

  const handleAssignTask = async () => {
    if (!selectedUser || !selectedTask) {
      console.error("Please select both a user and a task.");
      return;
    }

    const user = userData.find((user) => user._id === selectedUser);
    const task = taskData.find((task) => task._id === selectedTask);

    console.log("Assigned Task:", task, "to User:", user);

    try {
      const response = await fetch(
        `http://localhost:5001/control/task/${task._id}/assign/${user.userID}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        console.log("Task updated successfully");
      } else {
        console.error("Failed to update user");
      }

      // Clear selected values after assignment
      setSelectedUser("");
      setSelectedTask("");
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };

  if (isUserLoading || isTaskLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box m="1.5rem 2.5rem">
      <PageHeader
        title="OVERVIEW"
        subtitle="Overview of general hours and tasks"
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>User</InputLabel>
            <Select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              label="User"
            >
              {userData.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.firstName} {user.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Task</InputLabel>
            <Select
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
              label="Task"
            >
              {taskData.map((task) => (
                <MenuItem key={task._id} value={task._id}>
                  {task.taskName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <Button
            onClick={handleAssignTask}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.background.alt,
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.secondary.main,
              },
            }}
          >
            Valid
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskAssignment;
