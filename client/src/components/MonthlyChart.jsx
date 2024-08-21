import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetOverviewQuery } from "state/api";
import { Box } from "@mui/material";

const MonthlyChart = ({ year }) => {
  const { data, isLoading } = useGetOverviewQuery();
  const theme = useTheme();
  console.log("year :", year);

  const [formattedData] = useMemo(() => {
    if (!data) return [[], []];

    let yearData = null;
    for (let i = 0; i < data.length; i++) {
      console.log("data array: ", data[i]);
      if (data[i].year == year) {
        console.log("data[i]", data[i]);
        yearData = data[i];
        break;
      }
    }
    if (!yearData) {
      console.log(`No data found for year: ${year}`);
      return [[], []];
    }

    const { monthlyData } = yearData;
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

    Object.values(monthlyData).forEach(({ month, totalHours, totalTasks }) => {
      totalHoursLine.data = [
        ...totalHoursLine.data,
        { x: month, y: totalHours },
      ];
      totalTasksLine.data = [
        ...totalTasksLine.data,
        { x: month, y: totalTasks },
      ];
    });

    const formattedData = [totalHoursLine, totalTasksLine];
    return [formattedData];
  }, [data, year, theme.palette.secondary.main, theme.palette.secondary[600]]);

  if (!data || isLoading) return "Loading.....";

  return (
    <Box m="1.5rem 2.5rem">
      <Box height="75vh">
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
            // curve="catmullRom"
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
    </Box>
  );
};

export default MonthlyChart;
