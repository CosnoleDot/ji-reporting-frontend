import { useEffect, useState, useMemo } from "react";
import { BottomNav } from "../BottomNav";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";

export const GeneralLayout = ({ children, active, title }) => {
  const navigate = useNavigate();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("@token");
    if (!token || token === "undefined" || token === "null") {
      navigate("/login");
    }
  }, [navigate]);
  useEffect(() => {
    setIsSideBarOpen(false);
  }, []);
  return (
    <div className="relative">
      <div className="fixed top-0 w-full z-10 border-b border-inputBorder">
        <Navbar
          title={title}
          setIsSideBarOpen={setIsSideBarOpen}
          isSideBarOpen={isSideBarOpen}
        />
      </div>
      <div className={`flex w-full justify-between h-[calc(100vh - 264px)] fixed left-0 md:top-[65px] top-6`}>
        <div
          className={`md:block ${
            isSideBarOpen ? "absolute top-10 z-20 w-[70%]" : "hidden"
          }  md:w-[20%]`}
        >
          <BottomNav active={active} />
        </div>
        <div
          className={`md:w-[80%] w-full overflow-x-hidden overflow-y-scroll h-screen md:h-[calc(100vh - 65px)]  ${
            isSideBarOpen && "opacity-50"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
