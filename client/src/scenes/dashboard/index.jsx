import React, { useState } from "react";
import FlexBetween from "components/FlexBetween";
import PageHeader from "components/PageHeader";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
  Close,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import StatBox from "components/StatBox";
import {
  useGetDashboardQuery,
  useGetUsersQuery,
  useGetTasksQuery,
  useGetProjectsQuery,
  useGetPerformanceQuery,
} from "state/api";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();
  console.log("Dashboard :", data);

  const [openDownloadDialog, setOpenDownloadDialog] = useState(false);
  const [selectedReports, setSelectedReports] = useState([]);

  const { data: usersData, isLoading: isUserLoading } = useGetUsersQuery();
  const { data: tasksData, isLoading: isTaskLoading } = useGetTasksQuery();
  const { data: projectsData, isLoading: isProjectLoading } =
    useGetProjectsQuery();
  const { data: workhoursData, isLoading: isPerformanceLoading } =
    useGetPerformanceQuery();

  const handleDownloadReportsClick = () => {
    setOpenDownloadDialog(true);
  };

  const handleCloseDownloadDialog = () => {
    setOpenDownloadDialog(false);
    setSelectedReports([]);
  };

  const handleCheckboxChange = (event) => {
    const report = event.target.value;
    if (event.target.checked) {
      setSelectedReports([...selectedReports, report]);
    } else {
      setSelectedReports(selectedReports.filter((r) => r !== report));
    }
  };
  const UserSchema = {
    userID: "Number",
    firstName: "String",
    lastName: "String",
    email: "String",
    password: "String",
    picturePath: "String",
    role: "String",
    location: "String",
    occupation: "String",
    phoneNumber: "String",
  };

  const ProjectSchema = {
    projectID: "Number",
    projectName: "String",
    description: "String",
    startDate: "Date",
    endDate: "Date",
    finished: "Boolean",
  };

  const TaskSchema = {
    taskID: "Number",
    taskName: "String",
    description: "String",
    startDate: "Date",
    endDate: "Date",
    projectID: "Number",
    userID: "Number",
  };

  const WorkHourSchema = {
    workHoursID: "Number",
    userID: "Number",
    date: "Date",
    hours: "Number",
    tasks: "Array",
  };
  const generateCSVFromData = (data, schema) => {
    const headers = Object.keys(schema);
    const csvRows = [];

    // Add headers
    csvRows.push(headers.join(","));

    // Add data rows
    data.forEach((item) => {
      const values = headers.map((header) => {
        const value = item[header];
        return value !== undefined ? value.toString() : "";
      });
      csvRows.push(values.join(","));
    });

    return csvRows.join("\n");
  };
  const downloadFile = (content, fileName) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadClick = () => {
    const downloadFiles = async () => {
      try {
        if (selectedReports.includes("users")) {
          const usersCSV = generateCSVFromData(usersData, UserSchema);
          downloadFile(usersCSV, "users.csv");
        }

        if (selectedReports.includes("projects")) {
          const projectsCSV = generateCSVFromData(projectsData, ProjectSchema);
          downloadFile(projectsCSV, "projects.csv");
        }

        if (selectedReports.includes("tasks")) {
          const tasksCSV = generateCSVFromData(tasksData, TaskSchema);
          downloadFile(tasksCSV, "tasks.csv");
        }

        if (selectedReports.includes("workhours")) {
          const workhoursCSV = generateCSVFromData(
            workhoursData,
            WorkHourSchema
          );
          downloadFile(workhoursCSV, "workhours.csv");
        }
      } catch (error) {
        console.error("Error downloading files:", error);
      }
    };

    downloadFiles();
    handleCloseDownloadDialog();
  };

  const columns = [
    { field: "userID", headerName: "User ID", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "hours", headerName: "Hours", width: 100 },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <PageHeader title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleDownloadReportsClick}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Dialog
              open={openDownloadDialog}
              onClose={handleCloseDownloadDialog}
              PaperProps={{
                style: {
                  width: "400px",
                },
              }}
            >
              <DialogTitle>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">Download Reports</Typography>
                  <Close
                    onClick={handleCloseDownloadDialog}
                    style={{ cursor: "pointer" }}
                  />
                </Box>
              </DialogTitle>
              <DialogContent>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox value="users" onChange={handleCheckboxChange} />
                    }
                    label={<Typography variant="body1">Users</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="projects"
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={<Typography variant="body1">Projects</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox value="tasks" onChange={handleCheckboxChange} />
                    }
                    label={<Typography variant="body1">Tasks</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="workhours"
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={<Typography variant="body1">Work Hours</Typography>}
                  />
                </FormGroup>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleDownloadClick}
                  color="primary"
                  variant="contained"
                >
                  Download
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <StatBox
          title="Total Workers"
          value={data && data.totalWorkers}
          increase="+14%"
          description="Since last year"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Tasks Finished Today"
          value={data && data.todayStats.totalTasks}
          increase="+21%"
          description="Since last month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="hours" year="2023" isDashboard={true} />
        </Box>
        <StatBox
          title="Tasks Finished this month"
          value={data && data.thisMonthStats.totalTasks}
          increase="+5%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Yearly Worked Hours"
          value={data && data.yearlyWorkedHours}
          increase="+43%"
          description="Since last Year"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
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
            rows={(data && data.userWorkHours) || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Finished Projects By Category
          </Typography>
          <BreakdownChart year="2023" isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for finished
            projects for this year .
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
