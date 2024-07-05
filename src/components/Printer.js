import React, { useState } from "react";

export const PrintDocument = () => {
  const [print, setPrint] = useState(true);

  const printDoc = () => {
    setPrint(false);

    // Delay printing to ensure content rendering
    setTimeout(() => {
      window.print();
      window.onafterprint = () => {
        setPrint(true); // Reset state after printing is done
      };
    }, 100);
  };

  return (
    <>
      {print && (
        <button className="btn" onClick={printDoc}>
          Print
        </button>
      )}
    </>
  );
};
