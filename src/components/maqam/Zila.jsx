// import React from "react";
// import { InputWithLabel } from "../InputWithLabel";

// export const Zila = () => {
//   const headings = ["زﯾﻠﯽ طﮯ ﺷدھ ﺳرﮔرﻣﯾﺎں", "طﮯﺷدھ", "ﻣﻧﻌﻘدھ", "اوﺳط ﺣﺎﺿری"];
//   const rows = [
//     {
//       title: "اﺟﺗﻣﻊ رﻓﻘﺎ",
//       numberOfInputFields: 3,
//     },
//     {
//       title: " ﺳﭨڈی ﺳرﮐل",
//       numberOfInputFields: 3,
//     },
//     {
//       title: "اﺟﺗﻣﻊ ﮐﺎرﮐﻧﺎن",
//       numberOfInputFields: 3,
//     },
//     {
//       title: "درس ﻗرآن ",
//       numberOfInputFields: 3,
//     },
//     {
//       title: "ﻣﯾﭨﻧﮓ ﺷﺎﮨﯾن",
//       numberOfInputFields: 3,
//     },
//     {
//       title: "ﭘﯾﻐﺎم ﻣﺣﻔل",
//       numberOfInputFields: 3,
//     },
//   ];
//   return (
//     <div className="w-full max-w-full overflow-x-scroll " dir="rtl">
//       <table className="w-full border border-gray-400 ">
//         <div className=" flex w-full items-start justify-between bg-gray-100 p-2 ">
//           <tr className=" mb-3 flex w-full items-start justify-between bg-gray-100">
//             {headings.map((heading, index) => (
//               <td className="w-full text-start text-lg" key={index}>
//                 {heading}
//               </td>
//             ))}
//           </tr>
//         </div>
//         <div className="flex w-full min-w-[700px] flex-col items-start justify-between  p-2">
//           {rows.map((row, index) => (
//             <tr
//               className=" mb-5 flex w-full items-start justify-between bg-gray-100"
//               key={index}
//             >
//               <td className="w-[8rem]">{row.title}</td>
//               {Array.from({ length: row.numberOfInputFields }, (_, index) => (
//                 <td key={index}>
//                   <InputWithLabel label={""} type={"number"} />
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </div>
//       </table>
//     </div>
//   );
// };
import React from "react";
import { InputWithLabel } from "../InputWithLabel";

export const Zila = () => {
  const headings = ["زﯾﻠﯽ طﮯ ﺷدھ ﺳرﮔرﻣﯾﺎں", "طﮯﺷدھ", "ﻣﻧﻌﻘدھ", "اوﺳط ﺣﺎﺿری"];
  const rows = [
    {
      title: "اﺟﺗﻣﻊ رﻓﻘﺎ",
      numberOfInputFields: 3,
    },
    {
      title: " ﺳﭨڈی ﺳرﮐل",
      numberOfInputFields: 3,
    },
    {
      title: "اﺟﺗﻣﻊ ﮐﺎرﮐﻧﺎن",
      numberOfInputFields: 3,
    },
    {
      title: "درس ﻗرآن ",
      numberOfInputFields: 3,
    },
    {
      title: " ﺷﺎﮨﯾن ﻣﯾﭨﻧﮓ",
      numberOfInputFields: 3,
    },
    {
      title: "ﭘﯾﻐﺎم ﻣﺣﻔل",
      numberOfInputFields: 3,
    },
  ];

  return (
    <div className="w-full max-w-full overflow-x-scroll" dir="rtl">
      <table className="w-full border border-gray-400 table">
        <thead>
          <tr className=" flex w-full items-start justify-between bg-gray-100">
            {headings.map((heading, index) => (
              <th
                className="w-[10rem] text-start text-lg sm:text-sm"
                key={index}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              className="flex w-full items-center justify-between bg-gray-100"
              key={index}
            >
              <td className="w-[10rem]  text-start text-lg sm:text-sm">
                {row.title}
              </td>
              {Array.from({ length: row.numberOfInputFields }, (_, index) => (
                <td key={index}>
                  <InputWithLabel label={""} type={"number"} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
