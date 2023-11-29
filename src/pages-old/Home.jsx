import React from "react";
import { RequestTable } from "../components";
import { useNavigate } from "react-router-dom";
import { Layout } from "../theme/Layout";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="w-full p-2 flex justify-start items-center flex-col ">
        <h1 className="text-xl mb-3">Dashboard</h1>
        <div className="w-full justify-between items-center flex sm:flex-col md:flex-col lg:flex-row gap-2 mb-4">
          <div className="w-full bg-blue rounded-lg min-h-[200px] p-2">
            Total Reports{" "}
          </div>
          <div className="w-full bg-blue rounded-lg min-h-[200px] p-2 flex flex-col justify-between items-start">
            <div className="w-full">
              <h3>Next Report in</h3>
            </div>
            <div className="w-full text-white flex justify-end items-end pr-5">
              <button
                className=" border-none p-0 m-0"
                onClick={() => navigate("/maqam")}
              >
                Add Report
              </button>
            </div>
          </div>
        </div>
        <h2 className="text-lg mb-3">Reports</h2>
        <RequestTable />
      </div>
    </Layout>
  );
};
