import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { Markaz } from "./Markaz";
import { MaqamCompile } from "./MaqamCompile";
import { HalqaCompile } from "./HalqaCompile";
import { IlaqaCompile } from "./IlaqaCompile";
import { ProvinceCompile } from "./ProvinceCompile";
import { DivisionCompile } from "./DivsionCompile";
import { MuntakhibMaqamCompile } from "./MuntakhibMaqamCompile";
import { CompileReportContext } from "../../context";

export const CompileReports = () => {
  const compileReports = useContext(CompileReportContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [report, setReport] = useState(queryParams.get("areaType"));

  return (
    <div>
      {report === "country" && <Markaz />}
      {report === "maqam" &&
        (compileReports?.muntakhib ? (
          <MuntakhibMaqamCompile />
        ) : (
          <MaqamCompile />
        ))}
      {report === "halqa" && <HalqaCompile />}
      {report === "ilaqa" && <IlaqaCompile />}
      {report === "province" && <ProvinceCompile />}
      {report === "division" && <DivisionCompile />}
    </div>
  );
};
