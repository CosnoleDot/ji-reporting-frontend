import React from "react";
import logo from "../../assets/imgs/download3.png";
import { Link } from "react-router-dom";
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
            <label tabIndex={0} className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </label>

            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <div className="dropdown">
          <label tabIndex={0} className="">
            <img src={logo} alt="" className="w-20 h-22" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-1 bg-[#E9EBEF] border border-blue rounded-box w-40"
          >
            <li>
              <Link to="/login">Logout</Link>
            </li>
          </ul>
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
