import React from "react";
import { useGetPerformanceQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress, Box, useTheme } from "@mui/material";
import PageHeader from "components/PageHeader";

const Performance = () => {
  const theme = useTheme();
  const { data: userWorkHours, error, isLoading } = useGetPerformanceQuery();
  console.log("Data : ", userWorkHours);

  const columns = [
    { field: "userID", headerName: "User ID", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "hours", headerName: "Hours", width: 100 },
  ];

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box m="1.5rem 2.5rem">
      <PageHeader
        title="POINTING DETAILS"
        subtitle="List Of Users & Their Pointings History"
      />
      <Box
        mt="40px"
        height="75vph"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-root": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.palette,
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
          rows={userWorkHours}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row._id} // Assuming workHoursID is unique
        />
      </Box>
    </Box>
  );
};

export default Performance;
