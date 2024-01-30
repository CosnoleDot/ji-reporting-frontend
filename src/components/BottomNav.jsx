import { FaFile, FaTachometerAlt } from "react-icons/fa";
import { BsFiles } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { FaUsersGear } from "react-icons/fa6";
import { useContext } from "react";
import { UIContext } from "../context/ui";
import { TbReport } from "react-icons/tb";

export const BottomNav = ({ active }) => {
  const { isCompleted } = useContext(UIContext);
  return (
    <div className="btm-nav border-none text-gray-300">
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
      {localStorage.getItem("@type") !== "halqa" && (
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
      {["province", "maqam", "division"].includes(
        localStorage.getItem("@type")
      ) && (
        <Link
          to={isCompleted ? "/locations" : "/profile"}
          className={
            !active || active === "locations"
              ? "bg-blue-500 text-white"
              : "bg-blue-50"
          }
        >
          <CiLocationOn className="h-5 w-5" />
        </Link>
      )}
      {["province", "maqam", "division"].includes(
        localStorage.getItem("@type")
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
