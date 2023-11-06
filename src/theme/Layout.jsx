import React from "react";
import { Navbar } from "../components";

export const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="divider"></div>
      {children}
    </div>
  );
};
