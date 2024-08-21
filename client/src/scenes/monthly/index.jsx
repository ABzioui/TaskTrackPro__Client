import React, { useState } from "react";
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import MonthlyChart from "components/MonthlyChart";
import PageHeader from "components/PageHeader";

const Monthly = () => {
  const [year, setYear] = useState("2021");

  return (
    <Box m="1.5rem 2.5rem">
      <PageHeader title="MONTHLY STATS" subtitle="Chart of monthly stats" />
      <Box height="75vh">
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
        <MonthlyChart year={year} />
      </Box>
    </Box>
  );
};

export default Monthly;
