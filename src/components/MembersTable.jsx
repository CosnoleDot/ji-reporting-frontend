import React from "react";
const data = [
  { name: "John Doe", designation: "Nazim", city: "Lahore" },
  { name: "Jane Smith", designation: "Nazim", city: "Bahawalnagar" },
  { name: "Alice Johnson", designation: "Nazim", city: "Lahore" },
  { name: "Bob Williams", designation: "Nazim", city: "Bahawalnagar" },
  { name: "Eva Davis", designation: "Nazim", city: "Bahawalnagar" },
];
export const MembersTable = () => {
  return (
    <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
      <thead>
        <tr>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Designation
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            City
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
            <td className="px-6 py-4 whitespace-no-wrap">{item.designation}</td>
            <td className="px-6 py-4 whitespace-no-wrap">{item.city}</td>
            <td className="px-6 py-4 whitespace-no-wrap space-x-2">
              <button className="text-blue hover:text-blue-900">View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
