export const Division = () => {
  const headings = [
    "تنظیم",
    "آغاز میں",
    "اضافہ",
    "کمی",
    "اختتام",
    "فعال",
    "غیر فعال",
  ];

  return (
    <div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {headings.map((heading, index) => (
              <th key={index} className="border border-gray-300 p-2">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {headings.map((_, index) => (
              <td key={index} className="border border-gray-300 p-2">
                <input type="number" className="w-full border p-2" />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
