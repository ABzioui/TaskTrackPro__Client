import React, { useState } from "react";
import { Box, useTheme, Button, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTasksQuery } from "state/api";
import PageHeader from "components/PageHeader";

const Tasks = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetTasksQuery();
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formValues, setFormValues] = useState({
    taskID: "",
    taskName: "",
    description: "",
    startDate: "",
    endDate: "",
    projectID: "",
  });
  const [deleteTaskID, setDeleteTaskID] = useState("");

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleCancelClick = () => {
    setIsAdding(false);
    setIsDeleting(false);
  };

  const handleDeleteClick = () => {
    setIsDeleting(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDeleteIDChange = (e) => {
    setDeleteTaskID(e.target.value);
  };

  const handleSubmit = async () => {
    console.log("New Task:", formValues);
    const formData = new FormData();
    for (let value in formValues) {
      formData.append(value, formValues[value]);
    }
    const savedUserResponse = await fetch(
      "http://localhost:5001/control/addTask",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    setIsAdding(false);
    setFormValues({
      taskID: "",
      taskName: "",
      description: "",
      startDate: "",
      endDate: "",
      projectID: "",
    });
  };

  const handleDeleteSubmit = async () => {
    console.log("Delete Task ID:", deleteTaskID);

    const response = await fetch(
      `http://localhost:5001/control/deleteTask/${deleteTaskID}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      console.log("User deleted successfully");
    } else {
      console.error("Failed to delete user");
    }
    setIsDeleting(false);
  };

  const columns = [
    { field: "taskID", headerName: "TaskID", flex: 1 },
    { field: "taskName", headerName: "Task Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "endDate", headerName: "End Date", flex: 1 },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <PageHeader
        title="TASKS DETAILS"
        subtitle="List Of Tasks & Their Details"
      />
      {isAdding ? (
        <Box>
          <TextField
            margin="dense"
            name="taskID"
            label="Task ID"
            type="number"
            fullWidth
            value={formValues.taskID}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="taskName"
            label="Task Name"
            type="text"
            fullWidth
            value={formValues.taskName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={formValues.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="startDate"
            label="Start Date"
            type="date"
            fullWidth
            value={formValues.startDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            name="endDate"
            label="End Date"
            type="date"
            fullWidth
            value={formValues.endDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            name="projectID"
            label="Project ID"
            type="number"
            fullWidth
            value={formValues.projectID}
            onChange={handleChange}
          />
          <Box display="flex" justifyContent="space-between" mt="1rem">
            <Button
              onClick={handleCancelClick}
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.background.alt,
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.secondary.main,
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
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
          </Box>
        </Box>
      ) : (
        <>
          <Button
            onClick={handleAddClick}
            sx={{
              width: "47%",
              m: "2rem 0",
              p: "1rem",
              ml: "2rem",
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.background.alt,
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.secondary.main,
              },
            }}
          >
            ADD
          </Button>
          <Button
            onClick={handleDeleteClick}
            type="submit"
            sx={{
              width: "47%",
              m: "2rem 0",
              p: "1rem",
              ml: "1rem",
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.background.alt,
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.secondary.main,
              },
            }}
          >
            DELETE
          </Button>
          {isDeleting && (
            <Box mt="1rem">
              <TextField
                margin="dense"
                name="deleteTaskID"
                label="Task ID"
                type="text"
                fullWidth
                value={deleteTaskID}
                onChange={handleDeleteIDChange}
              />
              <Box display="flex" justifyContent="space-between" mt="1rem">
                <Button
                  onClick={handleCancelClick}
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.background.alt,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.secondary.main,
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteSubmit}
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.background.alt,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.secondary.main,
                    },
                  }}
                >
                  Process
                </Button>
              </Box>
            </Box>
          )}
          <Box
            mt="40px"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-root": { borderBottom: "none" },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.primary.light,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.secondary[100],
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[200]} !important`,
              },
            }}
          >
            <DataGrid
              loading={isLoading || !data}
              getRowId={(row) => row._id}
              rows={data || []}
              columns={columns}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Tasks;
