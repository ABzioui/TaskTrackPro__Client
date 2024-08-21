import React, { useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useGetOverviewQuery } from "state/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DailyChart = ({ year }) => {
  const initialStartDate = new Date("2023-02-01");
  const initialEndDate = new Date("2023-03-01");

  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  useMemo(() => {
    if (year == "2021") {
      setStartDate(new Date("2021-02-01"));
      setEndDate(new Date("2021-03-01"));
    } else if (year == "2022") {
      setStartDate(new Date("2022-02-01"));
      setEndDate(new Date("2022-03-01"));
    } else {
      setStartDate(new Date("2023-02-01"));
      setEndDate(new Date("2023-03-01"));
    }
  }, [year]);

  const { data, isLoading } = useGetOverviewQuery();
  const theme = useTheme();

  const formattedData = useMemo(() => {
    if (!data) return [];

    let yearData = data.find((d) => d.year == year);
    if (!yearData) {
      console.log(`No data found for year: ${year}`);
      return [];
    }

    const { dailyData } = yearData;
    const totalHoursLine = {
      id: "totalHours",
      color: theme.palette.secondary.main,
      data: [],
    };
    const totalTasksLine = {
      id: "totalTasks",
      color: theme.palette.secondary[600],
      data: [],
    };

    Object.values(dailyData).forEach(({ date, totalHours, totalTasks }) => {
      const dateFormatted = new Date(date);
      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = date.substring(date.indexOf("-") + 1);
        totalHoursLine.data.push({ x: splitDate, y: totalHours });
        totalTasksLine.data.push({ x: splitDate, y: totalTasks });
      }
    });

    return [totalHoursLine, totalTasksLine];
  }, [
    data,
    startDate,
    endDate,
    theme.palette.secondary.main,
    theme.palette.secondary[600],
  ]);

  return (
    <Box height="75vh">
      <Box display="flex" justifyContent="flex-end">
        <Box>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </Box>
        <Box>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </Box>
      </Box>

      {data ? (
        <ResponsiveLine
          data={formattedData}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: theme.palette.secondary[200],
                },
              },
              legend: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              ticks: {
                line: {
                  stroke: theme.palette.secondary[200],
                  strokeWidth: 1,
                },
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
            },
            legends: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            tooltip: {
              container: {
                color: theme.palette.primary.main,
              },
            },
          }}
          colors={{ datum: "color" }}
          margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.2f"
          curve="catmullRom"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 90,
            legend: "Month",
            legendOffset: 60,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Total",
            legendOffset: -50,
            legendPosition: "middle",
          }}
          enableGridX={false}
          enableGridY={false}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "top-right",
              direction: "column",
              justify: false,
              translateX: 50,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default DailyChart;
