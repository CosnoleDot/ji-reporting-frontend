import React from "react";
import logo from "../../assets/png/download3.png";
import indicator from "../../assets/svgs/indicator.svg";
import { Sidebar } from "./Sidebar";

export const Navbar = () => {
  return (
    <div className="navbar  bg-base-100 p-6 border-b border-opacity-10">
      <div className="flex-none">
        <Sidebar />
      </div>
      <div className="flex-1">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator dropdown">
            <label tabIndex={0}>
              <img src={indicator} alt="Inticator" className="h-7" />
            </label>

            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <div className="dropdown">
          <label tabIndex={0} className="">
            <img src={logo} alt="" className="w-20 h-22" />
          </label>
        </div>
      </div>
      <div className="flex-none">
        <label htmlFor="" className=" font-extrabold text-xl">
          اسلامی جمعیتِ طلبہ
        </label>
      </div>
    </div>
  );
};
