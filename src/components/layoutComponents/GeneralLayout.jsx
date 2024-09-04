import { useEffect, useState } from "react";
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
    <div className="flex w-full flex-col  overflow-x-hidden">
      {/* Navbar Section */}
      <div className="fixed top-0 w-full z-10 border-b border-inputBorder">
        <Navbar
          title={title}
          setIsSideBarOpen={setIsSideBarOpen}
          isSideBarOpen={isSideBarOpen}
        />
      </div>


      <div className="flex flex-grow pt-[65px] md:pt-[65px]">
      
        <div
          className={`${
            isSideBarOpen ? "block" : "hidden"
          } md:block md:w-[20%] absolute md:static top-[65px] z-20 bg-white md:bg-transparent h-full`}
        >
          <BottomNav active={active} />
        </div>

        <div
          className={`w-full md:w-[80%] transition-opacity duration-300 h-[calc(100vh-64.5px)] ${
            isSideBarOpen && "opacity-50 md:opacity-100"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
