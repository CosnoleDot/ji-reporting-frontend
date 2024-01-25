// import React, { useState } from "react";
// const a = {
//   2019: {
//     ijtRafaqa: {
//       decided: 1,
//       completed: 0,
//       attendance: 0,
//       title: ".",
//       registered: false,
//     },
//     ijtKarkunan: {
//       decided: 1,
//       completed: 1,
//       attendance: 11,
//       title: "نئے طلبہ کو دعوت اور کارکنان سے انفرادی ملاقات ",
//     },
//     studyCircle: {
//       decided: 1,
//       completed: 1,
//       attendance: 9,
//       title: "خطبات کا مطالعہ ",
//     },
//     darseQuran: {
//       decided: 1,
//       completed: 0,
//       attendance: 0,
//       title: "۔",
//     },
//   },
//   2020: {
//     ijtRafaqa: {
//       decided: 1,
//       completed: 1,
//       attendance: 11,
//       title: "سابقہ جائزہ و آئندہ پلاننگ ",
//       registered: false,
//     },
//     ijtKarkunan: {
//       decided: 1,
//       completed: 0,
//       attendance: 0,
//       title: " 0",
//     },
//     studyCircle: {
//       decided: 1,
//       completed: 1,
//       attendance: 9,
//       title: "شہادت حق",
//     },
//     darseQuran: {
//       decided: 1,
//       completed: 0,
//       attendance: 0,
//       title: "0",
//     },
//   },
// };

// export const Temp = () => {
//   const resultObj = {};

//   const processObject = (currentObj) => {
//     Object.keys(currentObj).forEach((key) => {
//       // Years
//       if (typeof currentObj[key] === "object") {
//         Object.keys(currentObj[key]).forEach((key2) => {
//           if (typeof currentObj[key][key2] === "object") {
//             Object.keys(currentObj[key][key2]).forEach((key3) => {
//               resultObj[`${key2}_${key3}`] += [key2][key3] || 0;
//             });
//           }
//         });
//       } else {
//         if (resultObj[key]) {
//           resultObj[key] += parseInt(currentObj?.[key]) || 0;
//         } else {
//           resultObj[key] = parseInt(currentObj?.[key]) || 0;
//         }
//       }
//     });
//   };

//   return (
//     <>
//       <button
//         onClick={() => {
//           processObject(a);
//           console.log(resultObj);
//         }}
//       >
//         submit
//       </button>
//     </>
//   );
// };



// const a = {}
// a['b'] = {}
// a['b']['c'] = 123;
