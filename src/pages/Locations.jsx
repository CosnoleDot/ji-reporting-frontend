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
import { translate } from "../context/localization";

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
      <div className="relative flex flex-col items-center py-3 px-0 pt-0 justify-start h-[calc(100vh-65.6px-64px)]">
        <div
          role="tablist"
          className="w-full flex justify-between items-center"
        >
          {["country", "province", "maqam"].includes(
            localStorage.getItem("@type")
          ) && (
            <Link
              to={"?active=maqam&view=halqa"}
              role="tab"
              className={`tab w-full ${active === "maqam" ? "tab-active" : ""}`}
            >
              {translate("Maqam")}
            </Link>
          )}
          {["country", "province", "division"].includes(
            localStorage.getItem("@type")
          ) && (
            <Link
              to={"?active=division&view=tehsil"}
              role="tab"
              className={`tab w-full ${
                active === "division" ? "tab-active" : ""
              }`}
            >
              {translate("Division")}
            </Link>
          )}
          {["country"].includes(localStorage.getItem("@type")) && (
            <Link
              to={"?active=country"}
              role="tab"
              className={`tab w-full ${
                active === "country" ? "tab-active" : ""
              }`}
            >
              {translate("Province")}
            </Link>
          )}
        </div>
        <div className="relative w-full flex flex-col gap-3 items-center justify-start h-[calc(100vh-65.6px-64px-32px)]">
          {active === "maqam" && <LocationMaqam />}
          {active === "division" && <LocationDivision />}
          {active === "ilaqa" && <LocationIlaqa />}
          {active === "country" && <LocationCountry />}
        </div>
      </div>
    </GeneralLayout>
  );
};
