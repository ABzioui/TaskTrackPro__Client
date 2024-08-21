import React, { useState } from "react";
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import OverviewChart from "components/OverviewChart";
import PageHeader from "components/PageHeader";

const Overview = () => {
  const [view, setView] = useState("hours");
  const [year, setYear] = useState("2021");

  return (
    <Box m="1.5rem 2.5rem">
      <PageHeader
        title="OVERVIEW"
        subtitle="Overview of general hours and tasks"
      />
      <Box height="75vh">
        <Box display="flex" justifyContent="flex-end">
          <Box>
            <FormControl sx={{ mt: "1rem" }}>
              <InputLabel>View</InputLabel>
              <Select
                value={view}
                label="View"
                onChange={(e) => setView(e.target.value)}
              >
                <MenuItem value="hours">Hours</MenuItem>
                <MenuItem value="tasks">Tasks</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ ml: "1rem" }}>
            <FormControl sx={{ mt: "1rem" }}>
              <InputLabel>Year</InputLabel>
              <Select
                value={year}
                label="Year"
                onChange={(e) => setYear(e.target.value)}
              >
                <MenuItem value="2021">2021</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <OverviewChart view={view} year={year} />
      </Box>
    </Box>
  );
};

export default Overview;
