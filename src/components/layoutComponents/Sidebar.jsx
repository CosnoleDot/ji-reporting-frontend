import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/imgs/profile.jpg";
import hamburger from "../../assets/svgs/hamburgerIcon.svg";
// import edit from "../../assets/svgs/editIcon.svg";
// import closeBtn from "../../assets/svgs/closeIcon.svg";
export const Sidebar = () => {
  return (
    <div className="drawer lg:drawer-close z-50 ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className=" btn btn-circle swap swap-rotate "
        >
          <input type="checkbox" />

          {/* hamburger icon */}
          {/* <Hamburger /> */}
          <img src={hamburger} alt="asd" />
          {/* close icon */}
          {/* <CloseBtn /> */}
          {/* <img src={closeBtn} alt="asd" /> */}
        </label>
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {/* Main side bar components */}
        <ul className="menu p-4 w-80 min-h-full bg-[#049cfc] font-medium text-lg gap-1">
          {/* User Profile */}

          <div className="w-full h-50 flex flex-col mb-4 ">
            {/* Avatar logo */}
            <div className="avatar mb-2 ">
              <div className="w-20 rounded-full">
                <img src={logo} alt="" />
              </div>
            </div>

            {/* Name label */}
            <label
              htmlFor=""
              className="text-black font-sans font-bold text-xl"
            >
              Sandra Adams
            </label>
            {/* Email label */}
            <label htmlFor="" className="text-black text-opacity-50 text-sm">
              sandra@example.com
            </label>
          </div>

          {/* Sidebar content here */}

          <div className="divider"></div>
          <li className="text-white">
            <Link to="/">Deshboard</Link>
          </li>

          <li className="text-white">
            <details close>
              <summary>New Reports</summary>
              <ul>
                <li className="text-white">
                  <Link to="/halqa">Halqa</Link>
                </li>
                <li className="text-white">
                  <Link to="/maqam">Maqam</Link>
                </li>
                <li className="text-white">
                  <Link to="/division">Division</Link>
                </li>
              </ul>
            </details>
          </li>
          <li
            className="text-white"
            onClick={() => {
              alert("to show New User Request");
            }}
          >
            <Link to="/halqa">New User Request</Link>
          </li>
          <li
            className="text-white"
            onClick={() => {
              alert("to show report comparison");
            }}
          >
            <Link to="/">Reports Comparison</Link>
          </li>
          <li className="text-white">
            <Link to="/">Edit Halqa Details</Link>
          </li>

          <li
            className="text-white"
            onClick={() => {
              alert("to show Edit User Data comparison");
            }}
          >
            <Link to="/">Edit User Data</Link>
          </li>
          <li
            className="text-white"
            onClick={() => {
              alert("to show edit user profile");
            }}
          >
            <Link to="/">Edit Your Profile</Link>
          </li>
          <li>
            <Link to="/login">
              <label
                htmlFor=""
                className="btn btn-active w-60 p-0  hover:text-[#049cfc]"
              >
                Logout
              </label>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
