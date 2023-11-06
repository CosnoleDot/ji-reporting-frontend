import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/jpgs/profile.jpg";
import hamburger from "../../assets/svgs/hamburgerIcon.svg";
import { SidebarData } from "./SidebarData";
import { useState } from "react";
// import edit from "../../assets/svgs/editIcon.svg";
// import closeBtn from "../../assets/svgs/closeIcon.svg";
export const Sidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState("");

  const handleMenuItemClick = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };
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

          <img src={hamburger} alt="asd" />
        </label>
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {/* Main side bar components */}
        <ul className="menu p-4 w-80 min-h-full bg-[#049cfc] font-medium text-lg gap-1 sm:w-60">
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
              className="text-white font-sans font-bold text-xl "
            >
              Sandra Adams
            </label>
            {/* Email label */}
            <label htmlFor="" className="text-white  text-sm">
              sandra@example.com
            </label>
          </div>

          <div className="divider"></div>
          {/* Sidebar content here */}
          {SidebarData.map((val, key) => {
            return (
              <li
                className="text-white flex flex-col"
                key={key}
                onClick={() => handleMenuItemClick(key)}
              >
                <Link to={val.link}>{val.title}</Link>

                {val.subRoute && openSubMenu === key && (
                  <ul>
                    {val.subRoute.map((subItem, subKey) => (
                      <li key={subKey}>
                        <Link to={subItem.link}>{subItem.title}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
          <div className="divider"></div>
          <Link to="/login">
            <li>
              <button className="btn btn-md text-opacity-50 p-4  sm:btn">
                Logout
              </button>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};
