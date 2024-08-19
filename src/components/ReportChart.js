import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { translate } from "../context/localization";

export const ReportChart = ({ res, type }) => {
  const monthlyChartRef = useRef(null);

  const getData = async () => {
    if (!monthlyChartRef.current) {
      const monthlyCtx = document.getElementById("monthlyChart");

      monthlyChartRef.current = new Chart(monthlyCtx, {
        type: "bar",
        data: res,
        options: {
          plugins: {
            datalabels: {
              anchor: "end",
              align: "top",
              formatter: (value) => value, // Format data label
              color: "#444", // Color of the labels
              font: {
                size: 14,
              },
              padding: 5, // Padding from the bar
              rotation: 90, // Adjust rotation if needed
            },
            legend: {
              labels: {
                font: {
                  size: 24,
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                font: {
                  size: 14,
                },
              },
            },
            x: {
              ticks: {
                font: {
                  size: 14,
                },
                autoSkip: false,
              },
              grid: {
                offset: true,
              },
              // Adjust bar percentage and category percentage to control bar width and space
              barPercentage: 0.8, // This controls the width of the bars
              categoryPercentage: 1.0, // This controls the width of the space for each category
            },
          },
        },
        plugins: [ChartDataLabels], // Include the plugin here
      });
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      <span className="capitalize">{translate(type?.split("-")?.join(" "))}</span>
      <div
        className=" "
        style={{
          minWidth: "600px",
          width: "100%",
          height: "100%",
          fontSize: "16px",
          overflow: "hidden",
          overflowX: "scroll",
        }}
      >
        <canvas id="monthlyChart" className="p-0 h-[300px] "></canvas>
      </div>
    </div>
  );
};
