import React, { useState } from "react";
import Chart from "react-apexcharts";

export const CircularChart = ({ res, type }) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  let respond = res?.datasets || [];
  respond = respond?.map((i) => (i === null ? 0 : i < 0 ? 0 : Math.round(i)));
  respond = respond?.map((i) => (i > 100 ? 100 : i));

  const options = {
    series: respond,
    chart: {
      type: "radialBar",
      height: "100%",
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "10%",
          background: "transparent",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
        barLabels: {
          enabled: true,
          useSeriesColors: true,
          offsetX: -8,
          fontSize: "10px",
          formatter: function (seriesName, opts) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
          },
        },
      },
    },
    colors: res?.colors,
    labels: res?.labels,
    responsive: [
      {
        options: {
          legend: {
            show: false,
          },
          plotOptions: {
            radialBar: {
              barLabels: {
                fontSize: "12px",
              },
            },
          },
        },
      },
    ],
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.1));
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "800px", // Height of the outer container
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", // Prevent overflow of outer container
      }}
    >
      {/* Chart Container */}
      <div
        style={{
          width: "100%", // Make the chart container responsive
          height: "100%", // Fill the available height
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transformOrigin: "center",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <div
          style={{
            overflow: "auto", // Ensure inner container can scroll if necessary
            width: "700px", // Prevent it from overflowing
            height: "100vh", // Allow it to fill the available height
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Chart
            options={options}
            series={options.series}
            type="radialBar"
            height={600}
            width={600}
          
          />
        </div>
      </div>
    </div>
  );
};
