import React from "react";
const data = [
  { name: "John Doe", date: "2023-11-01", requestFrom: "halqa" },
  { name: "Jane Smith", date: "2023-11-02", requestFrom: "maqam" },
  { name: "Alice Johnson", date: "2023-11-03", requestFrom: "halqa" },
  { name: "Bob Williams", date: "2023-11-04", requestFrom: "maqam" },
  { name: "Eva Davis", date: "2023-11-05", requestFrom: "maqam" },
  
];
export const RequestTable = () => {
  return (
    <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
      <thead>
        <tr>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Date
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Request From
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-no-wrap">{item.name}</td>
            <td className="px-6 py-4 whitespace-no-wrap">{item.date}</td>
            <td className="px-6 py-4 whitespace-no-wrap">{item.requestFrom}</td>
            <td className="px-6 py-4 whitespace-no-wrap space-x-2">
              <button className="text-blue hover:text-blue-900">
                Accept
              </button>
              <button className="text-red hover:text-red-900">
                Reject
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
