import { useState } from "react";
import {
  GeneralLayout,
  LocationCountry,
  LocationDivision,
  LocationIlaqa,
  LocationMaqam,
} from "../components";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export const Locations = () => {
  const [active, setActive] = useState(
    ["province", "maqam"].includes(localStorage.getItem("@type"))
      ? "maqam"
      : localStorage.getItem("@type")
  );
  const params = useLocation();
  useEffect(() => {
    // Function to parse query parameters
    const getQueryParams = () => {
      const searchParams = new URLSearchParams(params.search);
      const queryParams = {};

      for (let [key, value] of searchParams.entries()) {
        queryParams[key] = value;
      }

      if (queryParams.active) setActive(queryParams.active);
    };

    // Call the function when the component mounts or when the location changes
    getQueryParams();
  }, [params]);

  return (
    <GeneralLayout title="Locations" active={"locations"}>
      <div className="flex flex-col items-center py-3 px-5 pt-0 justify-start h-[calc(100vh-75.6px-75px)]">
        <div className="w-full flex md:flex-row flex-col md:justify-between justify-start items-center py-4">
          <div className="mb-4 w-full md:w-[30%] flex flex-col">
            <h1 className="text-2xl font-bold text-start ">Location</h1>
            <p className="text-gray-500">Manage Your location easily </p>
          </div>
        </div>
        <div className="w-full flex justify-start items-center">
          <div
            role="tablist"
            className="w-full flex justify-between md:justify-start items-start tabs tabs-boxed md:w-auto "
          >
            {["country", "province", "maqam"].includes(
              localStorage.getItem("@type")
            ) && (
              <Link
                to={"?active=maqam&view=halqa"}
                role="tab"
                className={`tab ${
                  active === "maqam" ? "bg-white text-black" : ""
                }`}
              >
                Maqam
              </Link>
            )}
            {["country", "province", "division"].includes(
              localStorage.getItem("@type")
            ) && (
              <Link
                to={"?active=division&view=tehsil"}
                role="tab"
                className={`tab ${
                  active === "division" ? "bg-white text-black" : ""
                }`}
              >
                Division
              </Link>
            )}
            {["country"].includes(localStorage.getItem("@type")) && (
              <Link
                to={"?active=country"}
                role="tab"
                className={`tab ${
                  active === "country" ? "bg-white text-black" : ""
                }`}
              >
                Province
              </Link>
            )}
          </div>
        </div>
        <div className=" w-full flex flex-col gap-3 items-center justify-start h-[calc(100vh-65.6px-64px-82px)]">
          {active === "maqam" && <LocationMaqam />}
          {active === "division" && <LocationDivision />}
          {active === "ilaqa" && <LocationIlaqa />}
          {active === "country" && <LocationCountry />}
        </div>
      </div>
    </GeneralLayout>
  );
};
