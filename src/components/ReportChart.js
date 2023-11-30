import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import instance from "../api/instrance";

export const ReportChart = () => {
  const monthlyChartRef = useRef(null);
  const yearlyChartRef = useRef(null);

  const getData = async () => {
    const res = await instance
      .post("compare/halqa/other-activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          duration: [
            {
              year: 2022,
              month: 11,
            },
            {
              year: 2023,
              month: 11,
            },
            {
              year: 2022,
              month: 12,
            },
          ],
          duration_type: "month",
        }),
      })
      .then((res) => res.json())
      .then((res) => res.data);
    console.log(res);
    if (!monthlyChartRef.current) {
      const monthlyCtx = document.getElementById("monthlyChart");
      monthlyChartRef.current = new Chart(monthlyCtx, {
        type: "bar",
        data: resizeBy,
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
  }, []);

  return (
    <div className="flex justify-around p-8">
      <div>Infradi Quwat Chart</div>
      <div className="w-1/2 " style={{ width: "80%", fontSize: "16px" }}>
        <canvas id="monthlyChart" className="p-16"></canvas>
      </div>
    </div>
  );
};
