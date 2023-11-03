import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/profile.jpg";
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
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          {/* close icon */}
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu p-4 w-80 min-h-full bg-[#049cfc] font-medium text-lg gap-3">
          <div className="w-full h-50 flex flex-col mb-4">
            <div className="avatar mb-2">
              <div className="w-20 rounded-full">
                <img src={logo} alt="" />
              </div>
            </div>
            <label
              htmlFor=""
              className="text-black font-sans font-bold text-xl"
            >
              Sandra Adams
            </label>
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
            <Link to="/halqa">Halqa</Link>
          </li>
          <li className="text-white">
            <Link to="/maqam">Maqam</Link>
          </li>
          <li className="text-white">
            <Link to="/division">Division</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
