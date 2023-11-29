import { useState } from "react";
import { Notifications } from "./Notifications";
import { FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  const navigate = useNavigate();
  const [requests, showRequests] = useState(false);
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <span className="btn btn-ghost text-xl">JI REPORTING</span>
        </div>
        <div className="flex-none">
          <div className="relative dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
              onClick={() => showRequests(!requests)}
            >
              <div className="indicator">
                <FaUserPlus className="text-xl" />
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://cdn-icons-png.flaticon.com/512/1159/1159740.png"
                />
              </div>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {/* <li>
              <span className='justify-between'>
                Profile
                <span className='badge'>New</span>
              </span>
            </li> */}
              <li>
                <span>Profile</span>
              </li>
              <li onClick={() => navigate("/change-password")}>
                <span>Change Password</span>
              </li>
              <li>
                <span>Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {requests && (
        <div
          tabIndex={0}
          className="mt-3 right-0 lg:right-10 fixed z-[1] w-full lg:w-[420px] card card-compact dropdown-content bg-base-100 shadow"
        >
          <h2 className="p-5 font-bold text-xl">User Request(s)</h2>
          <Notifications />
        </div>
      )}
    </>
  );
};
