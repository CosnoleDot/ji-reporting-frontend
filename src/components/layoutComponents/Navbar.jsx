import { useContext, useState, useEffect, useRef } from "react";
import { Notifications } from "./Notifications";
import { FaBell, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { UIContext } from "../../context/ui";
import { MeContext } from "../../context";
import { AiOutlineMenu } from "react-icons/ai";
export const Navbar = ({ title, setIsSideBarOpen, isSideBarOpen }) => {
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
      if (
        profileTabRef.current &&
        !profileTabRef.current.contains(event.target)
      ) {
        showProfileTab(false);
      }
    }, 0);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="navbar  text-heading px-8 bg-white">
        <div className="flex-1">
          <span className="text-[18px] font-black font-inter leading-5 md:block hidden">
            IJT REPORTING
          </span>
          {!isSideBarOpen ? (
            <span className="md:hidden block cursor-pointer">
              <AiOutlineMenu
                width={12}
                height={12}
                onClick={() => setIsSideBarOpen(true)}
              />
            </span>
          ) : (
            <span className="md:hidden block cursor-pointer">
              <RxCross2
                width={12}
                height={12}
                onClick={() => setIsSideBarOpen(false)}
              />
            </span>
          )}
        </div>
        <div className="flex-none">
          {localStorage.getItem("@type") !== "country" && (
            <div
              className="relative dropdown dropdown-end"
              ref={notificationsRef}
            >
              <div
                tabIndex={0}
                role="button"
                className="px-4"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  showRequests(false);
                  showProfileTab(false);
                  setIsSideBarOpen(false);
                }}
              >
                <div className="indicator">
                  <FaBell className="text-xl text-gray-300" />
                  <span className="badge badge-sm absolute -top-2 -right-3 z-0 border-secondaryText text-secondaryText">
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
                  className="px-4"
                  onClick={() => {
                    setShowNotifications(false);
                    showRequests(!requests);
                    showProfileTab(false);
                    setIsSideBarOpen(false);
                  }}
                >
                  <div className="indicator">
                    <FaUserPlus className="text-xl text-gray-300" />
                    <span className="badge badge-sm absolute -top-2 -right-3 z-0 border-secondaryText text-secondaryText">
                      {userRequests.length}
                    </span>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>

      {requests && (
        <div
          tabIndex={0}
          ref={requestsRef}
          className="top-0 right-0 lg:right-0 fixed z-[1] w-[calc(100%-20px)] lg:w-[420px] h-screen bg-white border overflow-hidden"
        >
          <div
            className=" py-2 w-full cursor-pointer flex items-center justify-between"
            onClick={() => {
              showRequests(false);
              setIsSideBarOpen(false);
            }}
          >
            <h2 className="p-5 font-bold text-xl">User Request(s)</h2>
            <div className="mr-4  md:hidden ">
              {" "}
              <RxCross2 className="h-5 w-5" />
            </div>
          </div>

          <Notifications userRequests={userRequests} type="request" />
        </div>
      )}

      {showNotifications && (
        <div
          tabIndex={0}
          ref={notificationsRef}
          className=" top-0 right-0 lg:right-0 fixed z-[1] w-[calc(100%-20px)] lg:w-[420px] h-screen bg-white border overflow-hidden"
        >
          <div
            className=" py-2 w-full cursor-pointer flex items-center justify-between"
            onClick={() => {
              setShowNotifications(false);
              setIsSideBarOpen(false);
            }}
          >
            <h2 className="p-5 font-bold text-xl">Notification(s)</h2>
            <div className="mr-4  md:hidden ">
              {" "}
              <RxCross2 className="h-5 w-5" />
            </div>
          </div>

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
