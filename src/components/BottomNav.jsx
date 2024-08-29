import { Link, useNavigate } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { useContext } from "react";
import { UIContext } from "../context/ui";
import { MeContext } from "../context";
import { HiOutlineHome } from "react-icons/hi2";
import { VscGraph } from "react-icons/vsc";
import { IoIosGitCompare } from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
export const BottomNav = ({ active }) => {
  const { isCompleted } = useContext(UIContext);
  const me = useContext(MeContext);
  const navigate = useNavigate();
  const user = localStorage.getItem("@type");
  const route = {
    country: "/locations?active=country",
    province: "/locations?active=maqam&view=ilaqa",
    division: "/locations?active=division&view=halqa",
    maqam: "/locations?active=maqam&view=halqa",
    ilaqa: "/locations?active=ilaqa&view=halqa",
  };

  // Determine the route for the "locations" link based on user type
  const locationRoute = (() => {
    switch (user) {
      case "country":
      case "province":
      case "maqam":
      case "division":
      case "ilaqa":
        return route[user];
      default:
        return "/"; // Default route if user type doesn't match any case
    }
  })();

  return (
    <div className="w-full  h-[calc(100vh-65.6px)] bg-white text-gray-300 flex flex-col border-r border-inputBorder">
      {/* Dashboard Link */}
      <div className="flex flex-col w-full gap-4 p-4 mb-4 border-b border-inputBorder">
        <div className="flex items-center gap-8">
          <img
            class="w-20 h-20 rounded-full"
            src="/pofile.jpeg"
            alt="Rounded avatar"
          />
          <div>
            <h2 className="text-heading font-inter font-semibold text-[16px] leading-5">
              {me?.name}
            </h2>
            <span className="text-heading font-inter font-normal text-[12px] leading-3 text-center">
              {me?.qualification}
            </span>
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <button
            onClick={() => navigate("/profile")}
            className={`w-full hover:bg-primary ${(active === 'profile' || active === "changePassword") ? "bg-primary text-white":'' } hover:text-white p-2 font-inter text-[14px] leading-5 font-medium rounded text-heading text-center border border-inputBorder`}
          >
            Edit Profile
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="w-full flex items-start flex-col p-4">
          <Link
            to={isCompleted ? "/" : "/profile"}
            className={
              !active || active === "dashboard"
                ? "bg-primary text-white p-2 rounded w-full"
                : "bg-blue-50 p-2 rounded text-heading w-full"
            }
          >
            <div className="flex items-center gap-4 ">
              {" "}
              <HiOutlineHome className="h-5 w-5" />
              <span className="font-medium text-[14px] leading-5">
                Dashboard
              </span>
            </div>
          </Link>

          {/* Personal Report or Reports Link based on user type */}
          {localStorage.getItem("@nazimType") === "rukan" ||
          localStorage.getItem("@nazimType") === "umeedwar" ? (
            <Link
              to={"/personalReport"}
              className={
                !active || active === "personalReport"
                  ? "bg-primary text-white p-2 rounded w-full"
                  : "bg-blue-50 p-2 rounded text-heading w-full"
              }
            >
              <div className="flex items-center gap-4 ">
                {" "}
                <VscGraph className="h-5 w-5" />
                <span className="font-medium text-[14px] leading-5">
                  Personal Reports
                </span>
              </div>
            </Link>
          ) : (
            <Link
              to={isCompleted ? "/reports" : "/profile"}
              className={
                !active || active === "reports" || active === "compilation" || active ==="personalReports"
                  ? "bg-primary text-white p-2 rounded w-full"
                  : "bg-blue-50 p-2 rounded text-heading w-full"
              }
            >
              <div className="flex items-center gap-4 ">
                {" "}
                <VscGraph className="h-5 w-5" />
                <span className="font-medium text-[14px] leading-5">
                  Reports
                </span>
              </div>
            </Link>
          )}

          {/* Comparison Link */}
          {localStorage.getItem("@type") !== "halqa" &&
            ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
              localStorage.getItem("@nazimType")
            ) && (
              <Link
                to={isCompleted ? "/comparison" : "/profile"}
                className={
                  !active || active === "comparison"
                    ? "bg-primary text-white p-2 rounded w-full"
                    : "bg-blue-50 p-2 rounded text-heading w-full"
                }
              >
                <div className="flex items-center gap-4 ">
                  {" "}
                  <IoIosGitCompare className="h-5 w-5" />
                  <span className="font-medium text-[14px] leading-5">
                    Comparison
                  </span>
                </div>
              </Link>
            )}

          {/* Locations Link */}
          {["country", "province", "maqam", "division", "ilaqa"].includes(
            localStorage.getItem("@type")
          ) &&
            ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
              localStorage.getItem("@nazimType")
            ) && (
              <Link
                to={isCompleted ? locationRoute : "/profile"}
                className={
                  !active || active === "locations"
                    ? "bg-primary text-white p-2 rounded w-full"
                    : "bg-blue-50 p-2 rounded text-heading w-full"
                }
              >
                <div className="flex items-center gap-4 ">
                  {" "}
                  <CiLocationOn className="h-5 w-5" />
                  <span className="font-medium text-[14px] leading-5">
                    Locations
                  </span>
                </div>
              </Link>
            )}

          {/* User Switch Link */}
          {["country", "province", "maqam", "division", "ilaqa"].includes(
            localStorage.getItem("@type")
          ) &&
            ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
              localStorage.getItem("@nazimType")
            ) && (
              <Link
                to={isCompleted ? "/user-switch" : "/profile"}
                className={
                  !active || active === "user-switch"
                    ? "bg-primary text-white p-2 rounded w-full"
                    : "bg-blue-50 p-2 rounded text-heading w-full"
                }
              >
                <div className="flex items-center gap-4 ">
                  {" "}
                  <LuUsers className="h-5 w-5" />
                  <span className="font-medium text-[14px] leading-5">
                    Manage Users
                  </span>
                </div>
              </Link>
            )}
        </div>
        <div className="w-full flex items-center justify-start">
          <div
            className="flex items-center gap-2 cursor-pointer p-4"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
              window.location.reload();
            }}
          >
            <CiLogout className="h-5 w-5 text-heading" />
            <span className="font-medium text-[14px] leading-5 text-heading">
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
