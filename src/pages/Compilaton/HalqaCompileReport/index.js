import React, { useContext, useEffect, useState } from "react";
import "./HalqaCompileReport.css";
import { useLocation, useParams } from "react-router-dom";
import {
  CompileReportContext,
  MaqamContext,
  TehsilContext,
} from "../../../context";
import { PrintDocument } from "../../../components";
import { UIContext } from "../../../context/ui";
export const HalqaCompileReport = () => {
  const [data, setData] = useState();
  const params = useParams();
  const compileReport = useContext(CompileReportContext);
  const maqams = useContext(MaqamContext);
  const tehsils = useContext(TehsilContext);
  const [compile, setCompile] = useState();
  const { setLoading } = useContext(UIContext);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { getCompileReports } = useContext(UIContext);
  useEffect(() => {
    let url = window.location.pathname.split("/")[2];
    console.log(compileReport);
    if (url === "print") {
      setData(compileReport);
    }
  });
  const getAreaType = (area) => {
    if (area?.parentType === "Maqam") {
      return `Halqa of Maqam`;
    } else if (area?.parentType === "Tehsil") {
      const tehsil = tehsils?.find((teh) => teh?._id === area?.parentId);
      const districtId = tehsil?.district;
      return `Division-${districtId?.division?.name}`;
    } else if (area?.province) {
      return maqams.find((i) => i?._id === area?._id) ? "Maqam" : "Division";
    }
    return "UNKNOWN";
  };
  const areaName = queryParams.get("areaName");
  const startDate = queryParams.get("startDate");
  const endDate = queryParams.get("endDate");
  const areaId = queryParams.get("areaId");

  useEffect(() => {
    getCompileReports(startDate, endDate, "halqa", areaId);
  }, []);
  console.log(data);
  return (
    <div className="wrapper reports" style={{ marginBottom: "2rem" }} dir="rtl">
      <PrintDocument />
      <h3
        style={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "2rem",
        }}
      >
        جائزہ کارکردگی رپورٹ برائے حلقہ
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
        className="tableContainer"
      >
        <div
          style={{
            display: "flex",
            justifyItems: "flex-start",
            alignItems: "flex-start",
            gap: "1rem",
          }}
        >
          <h4 className="header">حلقہ کا نام:</h4>
          <h6>
            {areaName}
          </h6>
        </div>
        <div
          style={{
            display: "flex",
            justifyItems: "flex-start",
            alignItems: "flex-start",
            gap: "1rem",
          }}
        >
          <h4 className="header">برائے ماہ:</h4>
          {/* <h6>{data?.month.split("T")[0]}</h6> */}
          {`${startDate} - ${endDate}`}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        <p className="header" style={{ width: "100%", padding: "8px 5px" }}>
          <strong>افرادی قوت</strong>
        </p>
        <p className="header" style={{ width: "100%" }}>
          <strong>آغازمیں</strong>
        </p>
        <p className="header" style={{ width: "100%" }}>
          <strong>اضافہ</strong>
        </p>
        <p className="header" style={{ width: "100%" }}>
          <strong>کمی</strong>
        </p>
        <p className="header" style={{ width: "100%" }}>
          <strong>اختتام پر</strong>
        </p>
        <p className="header" style={{ width: "100%" }}>
          <strong>ماہانہ ہدف</strong>
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "2rem",
        }}
        className="tableContainer"
      >
        <div className="row">
          <p className="header">ارکان</p>
          <p>{data?.["arkan-start"]}</p>
          <p>{data?.["arkan-increase"]}</p>
          <p>{data?.["arkan-decrease"]}</p>
          <p>
            {data?.["arkan-start"] +
              data?.["arkan-increase"] -
              data?.["arkan-decrease"]}
          </p>
          <p>{data?.["arkan-monthly"]}</p>
        </div>
        <div className="row">
          <p className="header">امیدواران </p>
          <p>{data?.["umeedWaran-start"]}</p>
          <p>{data?.["umeedWaran-increase"]}</p>
          <p>{data?.["umeedWaran-decrease"]}</p>
          <p>
            {data?.["umeedWaran-start"] +
              data?.["umeedWaran-increase"] -
              data?.["umeedWaran-decrease"]}
          </p>
          <p>{data?.["umeedWaran-monthly"]}</p>
        </div>
        <div className="row">
          <p className="header">رفقا </p>
          <p>{data?.["rafaqa-start"]}</p>
          <p>{data?.["rafaqa-increase"]}</p>
          <p>{data?.["rafaqa-decrease"]}</p>
          <p>
            {data?.["rafaqa-start"] +
              data?.["rafaqa-increase"] -
              data?.["rafaqa-decrease"]}
          </p>
          <p>{data?.["rafaqa-monthly"]}</p>
          {/* <p>Data 3</p> */}
        </div>
        <div className="row">
          <p className="header">کارکنان </p>
          <p>{data?.["karkunan-start"]}</p>
          <p>{data?.["karkunan-increase"]}</p>
          <p>{data?.["karkunan-decrease"]}</p>
          <p>
            {data?.["karkunan-start"] +
              data?.["karkunan-increase"] -
              data?.["karkunan-decrease"]}
          </p>
          <p>{data?.["karkunan-monthly"]}</p>
          {/* <p>Data 3</p> */}
        </div>
      </div>
      
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        <p className="header" style={{ width: "100%", padding: "8px 5px" }}>
          <strong> طے شدہ سرگرمیاں</strong>
        </p>
        <p className="header">
          <strong> طے شدہ </strong>
        </p>
        <p className="header">
          <strong>منعقدہ</strong>
        </p>
        <p className="header">
          <strong>اوسط حاضری</strong>
        </p>
      
        {/* <p className="header" style={{ width: "100%" }}>
          <strong>مرتب/غیرمرتب </strong>
        </p> */}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "2rem",
        }}
        className="tableContainer"
      >
        <div className="row">
          <p className="header">اجتماع کارکنان</p>
          <p>{data?.['ijtKarkunan-decided']}</p>
          <p>{data?.['ijtKarkunan-completed']}</p>
          <p>{data?.['ijtKarkunan-attendance']}</p>
        
        </div>
        <div className="row">
          <p className="header">سٹڈی سرکل </p>
          <p>{data?.['studyCircle-decided']}</p>
          <p>{data?.['studyCircle-completed']}</p>
          <p>{data?.['studyCircle-attendance']}</p>
        </div>
        <div className="row">
          <p className="header">اجتماعِ رفقا </p>
          <p>{data?.['ijtRafaqa-decided']}</p>
          <p>{data?.['ijtRafaqa-completed']}</p>
          <p>{data?.['ijtRafaqa-attendance']}</p>
        </div>
        <div className="row">
          <p className="header">درسِ قرآن </p>
          <p>{data?.['darseQuran-decided']}</p>
          <p>{data?.['darseQuran-completed']}</p>
          <p>{data?.['darseQuran-attendance']}</p>
        </div>
        <div className="row">
          <p className="header"> شاہین میٹینگ</p>
          <p>{data?.['shaheenMeeting-decided']}</p>
          <p>{data?.['shaheenMeeting-completed']}</p>
          <p>{data?.['shaheenMeeting-attendance']}</p>
        </div>
        <div className="row">
          <p className="header"> پیغام محفل</p>
          <p>{data?.['paighamEvent-decided']}</p>
          <p>{data?.['paighamEvent-completed']}</p>
          <p>{data?.['paighamEvent-attendance']}</p>
        </div>
      </div>
<div className="flex w-full">
      <h3
        style={{ textAlign: "start", fontWeight: "bold", marginBottom: "1rem" }}
      >
        دیگر سرگرمیاں
      </h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: "1rem",
        }}
        className="tableContainer"
      >
        <h6 style={{ width: "100%", textAlign: "start" }}>
          دعوتی وفود:{data?.['dawatiWafud']}
        </h6>
        <h6 style={{ width: "100%", textAlign: "start" }}>
          روابط پارٹیز:{data?.['rawabitParties']}
        </h6>
        <h6 style={{ width: "100%", textAlign: "start" }}>
          شب بیداری:{data?.['shabBedari']}
        </h6>
        <h6 style={{ width: "100%", textAlign: "start" }}>
          حدیث سرکل:{data?.['hadithCircle']}
        </h6>
        <h6 style={{ width: "100%", textAlign: "start" }}>
          نِطام الصلوۃ:{data?.['nizamSalah']}
        </h6>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          textAlign: "start",
          flexDirection: "column",
          gap: "10px",
        }}
        className="tableContainer"
      >
        <h3
          style={{ textAlign: "start", fontWeight: "bolder", marginTop: "8px" }}
        >
          توسیع دعوت
        </h3>
        <h3 style={{ textAlign: "start", fontWeight: "bold" }}>روابط</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "1rem",
            width: "100%",
          }}
        >
          <h6 style={{ width: "100%", textAlign: "start" }}>
            طے شدہ:{data?.['rawabitDecided']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            موجودہ :{data?.['current']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            روابط سے ملاقاتوں کا ہدف:{data?.['rwabitMeetingsGoal']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            ملاقاتوں کی تعداد:{data?.['meetings']}
          </h6>

          <h6 style={{ width: "100%", textAlign: "start" }}>
            تقسیم لٹریچر:{data?.['literatureDistribution']}
          </h6>

         
        </div>
        <h3 style={{ textAlign: "start", fontWeight: "bold" }}>عام طلبہ</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "1rem",
            width: "100%",
          }}
        >
          <h6 style={{ width: "100%", textAlign: "start" }}>
            ملاقاتوں کی تعداد:{data?.['commonStudentMeetings']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            تقسیم لٹریچر:{data?.['commonLiteratureDistribution']}
          </h6>
        </div>
        <h3 style={{ textAlign: "start", fontWeight: "bolder" }}>لائبریری </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "1rem",
            width: "100%",
            marginTop: "8px",
          }}
        >
          <h6 style={{ width: "100%", textAlign: "start" }}>
            تعداد کتب :{data?.['books']}
          </h6>

          <h6 style={{ width: "100%", textAlign: "start" }}>
            اضافہ :{data?.['increase']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کمی :{data?.['decrease']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            اجراےَ کتب :{data?.['bookRent']}
          </h6>
          
        </div>
        <h3 style={{ textAlign: "start", fontWeight: "bolder" }}>بیت المال</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "1rem",
            width: "100%",
          }}
        >
          <h6 style={{ width: "100%", textAlign: "start" }}>
            ماہانہ آمدن:{data?.['monthlyIncome']}
          </h6>

          <h6 style={{ width: "100%", textAlign: "start" }}>
            ماہانہ خرچ:{data?.['monthlyExpenditure']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            بدست:{data?.['savings']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            خسارہ:{data?.['loss']}
          </h6>
        </div>
        <h3
          style={{
            textAlign: "start",
            fontWeight: "bolder",
            marginBottom: "8px",
          }}
        >
          روز شب ڈائری
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "1rem",
            width: "100%",
          }}
        >
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کتنے امیدوران فل کرتے ہیں :{data?.['umeedwaranFilled']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کتنےرفقا فل کرتے ہیں :{data?.['rafaqaFilled']}
          </h6>
        </div>
      
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <h3 style={{ fontWeight: "bolder" }}>نام ناظم</h3>
            <h6>{data?.userId?.name}</h6>
          </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <h3 style={{ fontWeight: "bolder" }}> رپورٹ جمع کروانے کی تاریخ</h3>
            <h6>{data?.createdAt.split("T")[0]}</h6>
          </div>
        </div> */}
      </div>
    </div>
  );
};
