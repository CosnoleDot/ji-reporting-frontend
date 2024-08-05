import React, { useState } from "react";
import Chart from "react-apexcharts";

export const CircularChart = ({ res, type }) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  let respond = res?.datasets || [];
  respond = respond?.map((i) => (i === null ? 0 : i < 0 ? 0 : Math.round(i) ));
  respond = respond?.map((i) => (i > 100 ? 100 : i));
  console.log(respond ,res?.labels)
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
          fontSize: "12px",
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
        breakpoint: 480,
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
        height: "100%",
        overflow: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",

          transform: `scale(${zoomLevel})`,
          transformOrigin: "center",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <Chart
          options={options}
          series={options.series}
          type="radialBar"
          height={3000}
          width={"110%"}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          fontSize: "30px",
          padding: "4px",
          backgroundColor: "rgba(237, 231, 225,0.6)",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          onClick={handleZoomIn}
          style={{
            margin: "0 5px",
            backgroundColor: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          +
        </button>
        <span style={{ color: "#5b5b5b", fontSize: "18px" }}>
          {Math.round(zoomLevel * 100)}%
        </span>
        <button
          onClick={handleZoomOut}
          style={{
            margin: "0 5px",
            backgroundColor: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          -
        </button>
      </div>
    </div>
  );
};
