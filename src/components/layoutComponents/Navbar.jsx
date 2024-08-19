import { useContext, useState, useEffect, useRef } from "react";
import { Notifications } from "./Notifications";
import { FaBell, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { UIContext } from "../../context/ui";
import { MeContext } from "../../context";
import { translate } from "../../context/localization";

export const Navbar = ({ title }) => {
  const navigate = useNavigate();
  const [requests, showRequests] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [profileTab, showProfileTab] = useState(false);
  const me = useContext(MeContext);
  const { userRequests, notifications, getAllNotifications } =
    useContext(UIContext);
  const { setMe } = useContext(UIContext);

  const notificationsRef = useRef();
  const requestsRef = useRef();
  const profileTabRef = useRef();

  const handleClickOutside = (event) => {
    setTimeout(() => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (requestsRef.current && !requestsRef.current.contains(event.target)) {
        showRequests(false);
      }
      if (profileTabRef.current && !profileTabRef.current.contains(event.target)) {
        showProfileTab(false);
      }
    }, 150);
  };
  

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="navbar bg-blue-500 text-white">
        <div className="flex-1">
          <span className="text-xl">{translate(title) || translate("IJTReporting")}</span>
        </div>
        <div className="flex-none">
          {/* <div>
            <h1>{me?.name}</h1>
          </div> */}
          {localStorage.getItem("@type") !== "country" && (
            <div className="relative dropdown dropdown-end" ref={notificationsRef}>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  showRequests(false);
                  showProfileTab(false);
                }}
              >
                <div className="indicator">
                  <FaBell className="text-xl" />
                  <span className="badge badge-sm absolute -top-2 -right-3 z-0">
                    {notifications?.length || 0}
                  </span>
                </div>
              </div>
            </div>
          )}
          {localStorage.getItem("@type") !== "halqa" &&
            localStorage.getItem("@nazimType") !== "rukan" &&
            localStorage.getItem("@nazimType") !== "umeedwar" && (
              <div className="relative dropdown dropdown-end" ref={requestsRef}>
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                  onClick={() => {
                    setShowNotifications(false);
                    showRequests(!requests);
                    showProfileTab(false);
                  }}
                >
                  <div className="indicator">
                    <FaUserPlus className="text-xl" />
                    <span className="badge badge-sm absolute -top-2 -right-3 z-0">
                      {userRequests.length}
                    </span>
                  </div>
                </div>
              </div>
            )}

          <div className="dropdown dropdown-end" ref={profileTabRef}>
            <div
              tabIndex={0}
              onClick={() => {
                setShowNotifications(false);
                showRequests(false);
                showProfileTab(!profileTab);
              }}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-8">
                <FaRegUserCircle className="w-full h-full" />
              </div>
            </div>
          </div>

          {profileTab && (
            <ul className="text-black fixed right-[10px] top-[60.5px] menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li className="mb-1">
                <span className="bg-slate-200 flex flex-col w-full justify-start items-start gap-0">
                  <span className="font-semibold">{me?.name}</span>
                  <span className="text-xs">{me?.email}</span>
                </span>
              </li>
              <li onClick={() => navigate("/profile")}>
                <span>{translate('profile')}</span>
              </li>
              <li onClick={() => navigate("/change-password")}>
                <span>{translate('ChangePassword')}</span>
              </li>
              <li>
                <span
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                    setMe(null);
                    window.location.reload();
                  }}
                >
                  {translate("logout")}
                </span>
              </li>
              <li className="bg-slate-300 flex justify-center w-full">
                <a
                  href="https://consoledot.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Powered By:
                  <img src="/cd.png" className="w-5 h-5" alt="ConsoleDot" />
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>

      {requests && (
        <div
          tabIndex={0}
          ref={requestsRef}
          className="mt-3 top-[60.5px] right-[10px] lg:right-10 fixed z-[1] w-[calc(100%-20px)] lg:w-[420px] card card-compact dropdown-content bg-base-100 border-2 overflow-hidden"
        >
          <h2 className="p-5 font-bold text-xl">{translate("userRequest")}</h2>
          <Notifications userRequests={userRequests} type="request" />
        </div>
      )}

      {showNotifications && (
        <div
          tabIndex={0}
          ref={notificationsRef}
          className="mt-3 top-[60.5px] right-[10px] lg:right-10 fixed z-[1] w-[calc(100%-20px)] lg:w-[420px] card card-compact dropdown-content bg-base-100 border-2 overflow-hidden"
        >
          <h2 className="p-5 font-bold text-xl">{translate("notifications")}</h2>
          <Notifications
            userRequests={notifications}
            getAllRequests={getAllNotifications}
            type="notify"
          />
        </div>
      )}
    </>
  );
};
