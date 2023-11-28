import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/jpgs/profile.jpg";
import hamburger from "../../assets/svgs/hamburgerIcon.svg";
import { SidebarData } from "./SidebarData";
import { useState } from "react";
import instance from "../../api/instrance";

export const Sidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState("");
  const [data, setData] = useState();

  const UserData = async () => {
    try {
      instance
        .get("user/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        })
        .then((res) => setData(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    UserData();
  });
  const handleMenuItemClick = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };
  const userRole = "province";

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
        <ul className="menu p-4 w-80 min-h-full bg-blue font-medium text-lg gap-1 sm:w-60">
          {/* User Profile */}

          <div className="w-full h-50 flex flex-col mb-4 ">
            <div className="avatar mb-2 ">
              {/* <div className="w-20 rounded-full">
                <img src={logo} alt="" />
              </div> */}
            </div>

            <label
              htmlFor=""
              className="text-white font-sans font-bold text-xl "
            >
              {data?.name}
            </label>

            <label htmlFor="" className="text-white  text-sm">
              {data?.email}
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
                {/* Role condition for checking the user */}

                {val.Role &&
                  val.Role.find(
                    (writeacess) => writeacess.access.rw[0] === userRole
                  ) &&
                  openSubMenu === key && (
                    <ul>
                      {val.Role.map((subItem, key) =>
                        subItem.access.rw[0] === userRole ? (
                          <li key={key}>
                            <Link to={subItem.link}>{subItem.title}</Link>
                          </li>
                        ) : (
                          <></>
                        )
                      )}
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
