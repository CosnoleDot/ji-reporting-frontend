import { FaFile, FaTachometerAlt } from "react-icons/fa";
import { BsFiles } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { FaUsersGear } from "react-icons/fa6";
import { useContext } from "react";
import { UIContext } from "../context/ui";
export const BottomNav = ({ active }) => {
  const { isCompleted } = useContext(UIContext);
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
    <div className="btm-nav border-none text-gray-300">
      {/* Dashboard Link */}
      <Link
        to={isCompleted ? "/" : "/profile"}
        className={
          !active || active === "dashboard"
            ? "bg-blue-500 text-white"
            : "bg-blue-50"
        }
      >
        <FaTachometerAlt className="h-5 w-5" />
      </Link>

      {/* Personal Report or Reports Link based on user type */}
      {localStorage.getItem("@nazimType") === "rukan" ||
      localStorage.getItem("@nazimType") === "umeedwar" ? (
        <Link
          to={"/personalReport"}
          className={
            !active || active === "personalReport"
              ? "bg-blue-500 text-white"
              : "bg-blue-50"
          }
        >
          <FaFile className="h-5 w-5" />
        </Link>
      ) : (
        <Link
          to={isCompleted ? "/reports" : "/profile"}
          className={
            !active || active === "reports"
              ? "bg-blue-500 text-white"
              : "bg-blue-50"
          }
        >
          <FaFile className="h-5 w-5" />
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
                ? "bg-blue-500 text-white"
                : "bg-blue-50"
            }
          >
            <BsFiles className="h-5 w-5" />
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
            to={isCompleted ? locationRoute : "/profile"} // Use the determined locationRoute here
            className={
              !active || active === "locations"
                ? "bg-blue-500 text-white"
                : "bg-blue-50"
            }
          >
            <CiLocationOn className="h-5 w-5" />
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
                ? "bg-blue-500 text-white"
                : "bg-blue-50"
            }
          >
            <FaUsersGear className="h-5 w-5" />
          </Link>
        )}
    </div>
  );
};
