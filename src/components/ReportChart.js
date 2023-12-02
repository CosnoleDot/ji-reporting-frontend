import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export const ReportChart = ({ res, type }) => {
  const monthlyChartRef = useRef(null);
  const getData = async () => {
    if (!monthlyChartRef.current) {
      const monthlyCtx = document.getElementById("monthlyChart");
      monthlyChartRef.current = new Chart(monthlyCtx, {
        type: "bar",
        data: res,
        options: {
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
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 24,
                },
              },
            },
          },
        },
      });
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      <span className="capitalize font-semibold">
        {type?.split("-").join(" ")}
      </span>
      <div
        className=" "
        style={{ width: "100%", height: "100%", fontSize: "16px" }}
      >
        <canvas id="monthlyChart" className="p-0 h-[300px] "></canvas>
      </div>
    </div>
  );
};
