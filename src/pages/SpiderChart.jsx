// import * as d3 from "d3";
// import React, { useRef, useEffect } from "react";
// export const SpiderChart = ({
//   data2023,
//   data2024,
//   labels,
//   width = 640,
//   height = 400,
//   marginTop = 20,
//   marginRight = 20,
//   marginBottom = 30,
//   marginLeft = 40,
// }) => {
//   const svgRef = useRef();

//   useEffect(() => {
//     const svg = d3.select(svgRef.current);
//     const x = d3
//       .scaleLinear()
//       .domain([0, labels.length - 1])
//       .range([marginLeft, width - marginRight]);
//     const y = d3
//       .scaleLinear()
//       .domain([
//         Math.min(...data2023.concat(data2024)),
//         Math.max(...data2023.concat(data2024)),
//       ])
//       .range([height - marginBottom, marginTop]);

//     const line = d3
//       .line()
//       .x((d, i) => x(i))
//       .y((d) => y(d));

//     svg.selectAll("*").remove(); // Clear previous renders
//     // Add x-axis
//     svg
//       .append("g")
//       .attr("transform", `translate(0,${height - marginBottom})`)
//       .call(
//         d3
//           .axisBottom(x)
//           .ticks(labels.length)
//           .tickFormat((d, i) => labels[i])
//       );

//     // Add y-axis
//     svg
//       .append("g")
//       .attr("transform", `translate(${marginLeft},0)`)
//       .call(d3.axisLeft(y));

//     // Draw the line for 2023
//     svg
//       .append("path")
//       .datum(data2023)
//       .attr("fill", "none")
//       .attr("stroke", "blue")
//       .attr("strokeWidth", 1.5)
//       .attr("d", line);

//     // Draw the points for 2023
//     svg
//       .append("g")
//       .selectAll("circle")
//       .data(data2023)
//       .enter()
//       .append("circle")
//       .attr("fill", "blue")
//       .attr("stroke", "currentColor")
//       .attr("strokeWidth", 1.5)
//       .attr("cx", (d, i) => x(i))
//       .attr("cy", (d) => y(d))
//       .attr("r", 2.5);

//     // Draw the line for 2024
//     svg
//       .append("path")
//       .datum(data2024)
//       .attr("fill", "none")
//       .attr("stroke", "red")
//       .attr("strokeWidth", 1.5)
//       .attr("d", line);

//     // Draw the points for 2024
//     svg
//       .append("g")
//       .selectAll("circle")
//       .data(data2024)
//       .enter()
//       .append("circle")
//       .attr("fill", "red")
//       .attr("stroke", "currentColor")
//       .attr("strokeWidth", 1.5)
//       .attr("cx", (d, i) => x(i))
//       .attr("cy", (d) => y(d))
//       .attr("r", 2.5);

//     // Add labels to the points for 2023
//     svg
//       .append("g")
//       .selectAll("text")
//       .data(data2023)
//       .enter()
//       .append("text")
//       .attr("x", (d, i) => x(i))
//       .attr("y", (d) => y(d) - 20)
//       .attr("text-anchor", "middle")
//       .attr("font-size", "10px")
//       .attr("fill", "blue")
//       .text((d, i) => labels[i]);

//     // Add labels to the points for 2024
//     svg
//       .append("g")
//       .selectAll("text")
//       .data(data2024)
//       .enter()
//       .append("text")
//       .attr("x", (d, i) => x(i))
//       .attr("y", (d) => y(d) - 20)
//       .attr("text-anchor", "middle")
//       .attr("font-size", "10px")
//       .attr("fill", "red")
//       .text((d, i) => labels[i]);
//   }, [
//     data2023,
//     data2024,
//     labels,
//     height,
//     marginBottom,
//     marginLeft,
//     marginRight,
//     marginTop,
//     width,
//   ]);

//   return <svg ref={svgRef} width={width} height={height} />;
// };
