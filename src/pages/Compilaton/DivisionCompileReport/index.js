import React, { useContext, useEffect, useState } from "react";
import "./DivisionCompileReport.css";
import { useLocation, useParams } from "react-router-dom";
import { PrintDocument } from "../../../components";
import { CompileReportContext } from "../../../context";
import { UIContext } from "../../../context/ui";

export const DivisionCompileReport = () => {
  const [data, setData] = useState();
  const params = useParams();
  const compileReport = useContext(CompileReportContext);

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
  const areaName = queryParams.get("areaName");
  const startDate = queryParams.get("startDate");
  const endDate = queryParams.get("endDate");
  const areaId = queryParams.get("areaId");

  useEffect(() => {
    getCompileReports(startDate, endDate, "division", areaId);
  }, []);

  return (
    <div className="wrapper reports" style={{ marginBottom: "2rem" }} dir="rtl">
      <PrintDocument />
      <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
        جائزہ کارکردگی رپورٹ برائے ڈویژن
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
          <h4 className="header">ڈویژن کا نام:</h4>
          {/* <h4 className="header">مرکزکا نام: </h4> */}
{areaName}        </div>
        <div
          style={{
            display: "flex",
            justifyItems: "flex-start",
            alignItems: "flex-start",
            gap: "1rem",
          }}
        >
          <h4 className="header">برائے ماہ:</h4>
          {`${startDate}  تا   ${endDate}`}
        </div>
      </div>
      <div className="flex w-full p-4 justify-start items-center font-bold text-2xl">
        جامعات
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
        className="tableContainer"
      >
        <p className="header" style={{ width: "100%", padding: "8px 5px" }}>
          <strong>کیٹیگری</strong>
        </p>
        <p className="header" style={{ width: "100%" }}>
          <strong>آغازمیں</strong>
        </p>
        <p className="header" style={{ width: "100%" }}>
          <strong>اضافہ</strong>
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
          <p className="header">A </p>
          <p>{data?.['jamiaatA-start']}</p>
          <p>{data?.['jamiaatA-increase']}</p>
          <p>
            {data?.['jamiaatA-start'] +
              data?.['jamiaatA-increase']}
          </p>
          <p>{data?.['jamiaatA-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">B </p>
          <p>{data?.['jamiaatB-start']}</p>
          <p>{data?.['jamiaatB-increase']}</p>
          <p>
            {data?.['jamiaatB-start'] +
              data?.['jamiaatB-increase']}
          </p>
          <p>{data?.['jamiaatB-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">C</p>
          <p>{data?.['jamiaatC-start']}</p>
          <p>{data?.['jamiaatC-increase']}</p>
          <p>
            {data?.['jamiaatC-start'] +
              data?.['jamiaatC-increase']}
          </p>
          <p>{data?.['jamiaatC-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">D</p>
          <p>{data?.['jamiaatD-start']}</p>
          <p>{data?.['jamiaatD-increase']}</p>
          <p>
            {data?.['jamiaatD-start'] +
              data?.['jamiaatD-increase']}
          </p>
          <p>{data?.['jamiaatD-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">E</p>
          <p>{data?.['jamiaatE-start']}</p>
          <p>{data?.['jamiaatE-increase']}</p>
          <p>
            {data?.['jamiaatE-start'] +
              data?.['jamiaatE-increase']}
          </p>
          <p>{data?.['jamiaatE-monthly']}</p>
        </div>
      </div>
      <div className="flex w-full p-4 justify-start items-center font-bold text-2xl">
        کالجز
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
        className="tableContainer"
      >
        <p className="header" style={{ width: "100%", padding: "8px 5px" }}>
          <strong>کیٹیگری</strong>
        </p>
        <p className="header" style={{ width: "100%" }}>
          <strong>آغازمیں</strong>
        </p>
        <p className="header" style={{ width: "100%" }}>
          <strong>اضافہ</strong>
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
          <p className="header">A </p>
          <p>{data?.['collegesA-start']}</p>
          <p>{data?.['collegesA-increase']}</p>
          <p>
            {data?.['collegesA-start'] +
              data?.['collegesA-increase']}
          </p>
          <p>{data?.['collegesA-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">B </p>
          <p>{data?.['collegesB-start']}</p>
          <p>{data?.['collegesB-increase']}</p>
          <p>
            {data?.['collegesB-start'] +
              data?.['collegesB-increase']}
          </p>
          <p>{data?.['collegesB-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">C</p>
          <p>{data?.['collegesC-start']}</p>
          <p>{data?.['collegesC-increase']}</p>
          <p>
            {data?.['collegesC-start'] +
              data?.['collegesC-increase']}
          </p>
          <p>{data?.['collegesC-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">D</p>
          <p>{data?.['collegesD-start']}</p>
          <p>{data?.['collegesD-increase']}</p>
          <p>
            {data?.['collegesD-start'] +
              data?.['collegesD-increase']}
          </p>
          <p>{data?.['collegesD-monthly']}</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
        className="tableContainer"
      >
        <p className="header" style={{ width: "100%" }}>
          <strong>تنظیم</strong>
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
          <strong>اختتام</strong>
        </p>
        <p className="header" style={{ width: "100%" }}>
          <strong>غیرفعال</strong>
        </p>
        <p className="header" style={{ width: "100%" }}>
          <strong>فعال</strong>
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
          <p className="header">رہائشی حلقے</p>
          <p>{data?.['rehaishHalqay-start']}</p>
          <p>{data?.['rehaishHalqay-increase']}</p>
          <p>{data?.['rehaishHalqay-decrease']}</p>
          <p>
            {data?.['rehaishHalqay-increase'] +
              data?.['rehaishHalqay-start'] -
              data?.['rehaishHalqay-decrease']}
          </p>
          <p>{data?.['rehaishHalqay-paused']}</p>
          <p>{data?.['rehaishHalqay-continue']}</p>
          <p>{data?.['rehaishHalqay-monthly']}</p>
        </div>
        <div className="row">
          <p className="header"> تعلیمی حلقے</p>
          <p>{data?.['taleemHalqay-start']}</p>
          <p>{data?.['taleemHalqay-increase']}</p>
          <p>{data?.['taleemHalqay-decrease']}</p>
          <p>
            {data?.['taleemHalqay-increase'] +
              data?.['taleemHalqay-start'] -
              data?.['taleemHalqay-decrease']}
          </p>
          <p>{data?.['taleemHalqay-paused']}</p>
          <p>{data?.['taleemHalqay-continue']}</p>
          <p>{data?.['taleemHalqay-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">کل حلقے</p>
          <p>{data?.['totalHalqay-start']}</p>
          <p>{data?.['totalHalqay-increase']}</p>
          <p>{data?.['totalHalqay-decrease']}</p>
          <p>
            {data?.['totalHalqay-increase'] +
              data?.['totalHalqay-start'] -
              data?.['totalHalqay-decrease']}
          </p>
          <p>{data?.['totalHalqay-paused']}</p>
          <p>{data?.['totalHalqay-continue']}</p>
          <p>{data?.['totalHalqay-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">رہائشی زیلی حلقے</p>
          <p>{data?.['subRehaishHalqay-start']}</p>
          <p>{data?.['subRehaishHalqay-increase']}</p>
          <p>{data?.['subRehaishHalqay-decrease']}</p>
          <p>
            {data?.['subRehaishHalqay-increase'] +
              data?.['subRehaishHalqay-start'] -
              data?.['subRehaishHalqay-decrease']}
          </p>
          <p>{data?.['subRehaishHalqay-paused']}</p>
          <p>{data?.['subRehaishHalqay-continue']}</p>
          <p>{data?.['subRehaishHalqay-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">تعلیمی زیلی حلقے</p>
          <p>{data?.['subTaleemHalqay-start']}</p>
          <p>{data?.['subTaleemHalqay-increase']}</p>
          <p>{data?.['subTaleemHalqay-decrease']}</p>
          <p>
            {data?.['subTaleemHalqay-increase'] +
              data?.['subTaleemHalqay-start'] -
              data?.['subTaleemHalqay-decrease']}
          </p>
          <p>{data?.['subTaleemHalqay-paused']}</p>
          <p>{data?.['subTaleemHalqay-continue']}</p>
          <p>{data?.['subTaleemHalqay-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">کل زیلی حلقے</p>
          <p>{data?.['subTotalHalqay-start']}</p>
          <p>{data?.['subTotalHalqay-increase']}</p>
          <p>{data?.['subTotalHalqay-decrease']}</p>
          <p>
            {data?.['subTotalHalqay-increase'] +
              data?.['subTotalHalqay-start'] -
              data?.['subTotalHalqay-decrease']}
          </p>
          <p>{data?.['subTotalHalqay-paused']}</p>
          <p>{data?.['subTotalHalqay-continue']}</p>
          <p>{data?.['subTaleemHalqay-monthly']}</p>
        </div>

        <div className="row">
          <p className="header">بزم کے سکول یونٹس</p>
          <p>{data?.['busmSchoolUnits-start']}</p>
          <p>{data?.['busmSchoolUnits-increase']}</p>
          <p>{data?.['busmSchoolUnits-decrease']}</p>
          <p>
            {data?.['busmSchoolUnits-increase'] +
              data?.['busmSchoolUnits-start'] -
              data?.['busmSchoolUnits-decrease']}
          </p>
          <p>{data?.['busmSchoolUnits-paused']}</p>
          <p>{data?.['busmSchoolUnits-continue']}</p>
          <p>{data?.['subTaleemHalqay-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">بزم کے رہائشی یونٹس</p>
          <p>{data?.['busmRehaishUnits-start']}</p>
          <p>{data?.['busmRehaishUnits-increase']}</p>
          <p>{data?.['busmRehaishUnits-decrease']}</p>
          <p>
            {data?.['busmRehaishUnits-increase'] +
              data?.['busmRehaishUnits-start'] -
              data?.['busmRehaishUnits-decrease']}
          </p>
          <p>{data?.['busmRehaishUnits-paused']}</p>
          <p>{data?.['busmRehaishUnits-continue']}</p>
          <p>{data?.['subTaleemHalqay-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">بزم کے کل یونٹس</p>
          <p>{data?.['busmTotalUnits-start']}</p>
          <p>{data?.['busmTotalUnits-increase']}</p>
          <p>{data?.['busmTotalUnits-decrease']}</p>
          <p>
            {data?.['busmTotalUnits-increase'] +
              data?.['busmTotalUnits-start'] -
              data?.['busmTotalUnits-decrease']}
          </p>
          <p>{data?.['busmTotalUnits-paused']}</p>
          <p>{data?.['busmTotalUnits-continue']}</p>
          <p>{data?.['subTaleemHalqay-monthly']}</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
        className="tableContainer"
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
          <p>{data?.['arkan-start']}</p>
          <p>{data?.['arkan-increase']}</p>
          <p>{data?.['arkan-decrease']}</p>
          <p>
            {data?.['arkan-start'] +
              data?.['arkan-increase'] -
              data?.['arkan-decrease']}
          </p>
          <p>{data?.['arkan-monthly']}</p>
          {/* <p>{data?.['arkan-}</']p> */}
        </div>
        <div className="row">
          <p className="header">امیدواران </p>
          <p>{data?.['umeedWaran-start']}</p>
          <p>{data?.['umeedWaran-increase']}</p>
          <p>{data?.['umeedWaran-decrease']}</p>
          <p>
            {data?.['umeedWaran-start'] +
              data?.['umeedWaran-increase'] -
              data?.['umeedWaran-decrease']}
          </p>
          <p>{data?.['umeedWaran-monthly']}</p>
          {/* <p>Data 3</p> */}
        </div>
        <div className="row">
          <p className="header">رفقا </p>
          <p>{data?.['rafaqa-start']}</p>
          <p>{data?.['rafaqa-increase']}</p>
          <p>{data?.['rafaqa-decrease']}</p>
          <p>
            {data?.['rafaqa-start'] +
              data?.['rafaqa-increase'] -
              data?.['rafaqa-decrease']}
          </p>
          <p>{data?.['rafaqa-monthly']}</p>
          {/* <p>Data 3</p> */}
        </div>
        <div className="row">
          <p className="header">کارکنان </p>
          <p>{data?.['karkunan-start']}</p>
          <p>{data?.['karkunan-increase']}</p>
          <p>{data?.['karkunan-decrease']}</p>
          <p>
            {data?.['karkunan-start'] +
              data?.['karkunan-increase'] -
              data?.['karkunan-decrease']}
          </p>
          <p>{data?.['karkunan-monthly']}</p>
          {/* <p>Data 3</p> */}
        </div>
        <div className="row">
          <p className="header"> شاہین</p>
          <p>{data?.['shaheen-start']}</p>
          <p>{data?.['shaheen-increase']}</p>
          <p>{data?.['shaheen-decrease']}</p>
          <p>
            {data?.['shaheen-start'] +
              data?.['shaheen-increase'] -
              data?.['shaheen-decrease']}
          </p>
          <p>{data?.['shaheen-monthly']}</p>
          {/* <p>Data 3</p> */}
        </div>
        <div className="row">
          <p className="header">ممبرز </p>
          <p>{data?.['members-start']}</p>
          <p>{data?.['members-increase']}</p>
          <p>{data?.['members-decrease']}</p>
          <p>
            {data?.['members-start'] +
              data?.['members-increase'] -
              data?.['members-decrease']}
          </p>
          <p>{data?.['members-monthly']}</p>
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
          <strong>مرکزی طے شدہ سرگرمیاں</strong>
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
          <p className="header">سٹڈی سرکل </p>
          <p>{data?.['studyCircle-decided']}</p>
          <p>{data?.['studyCircle-done']}</p>
          <p>{data?.['studyCircle-averageAttendance']}</p>
        </div>
        <div className="row">
          <p className="header">اجتماع ناظمین </p>
          <p>{data?.['ijtNazmeen-decided']}</p>
          <p>{data?.['ijtNazmeen-done']}</p>
          <p>{data?.['ijtNazmeen-averageAttendance']}</p>
        </div>
        <div className="row">
          <p className="header">اجتماع امیدوران </p>
          <p>{data?.['ijtUmeedwaran-decided']}</p>
          <p>{data?.['ijtUmeedwaran-done']}</p>
          <p>{data?.['ijtUmeedwaran-averageAttendance']}</p>
        </div>
        <div className="row">
          <p className="header"> صدور میٹینگ</p>
          <p>{data?.['sadurMeeting-decided']}</p>
          <p>{data?.['sadurMeeting-done']}</p>
          <p>{data?.['sadurMeeting-averageAttendance']}</p>
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
          <strong>زیلی طے شدہ سرگرمیاں</strong>
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
          <p className="header">اجتماع رفقا</p>
          <p>{data?.['ijtRafaqa-decided']}</p>
          <p>{data?.['ijtRafaqa-done']}</p>
          <p>{data?.['ijtRafaqa-averageAttendance']}</p>
        </div>
        <div className="row">
          <p className="header">سٹڈی سرکل </p>
          <p>{data?.['studyCircle-decided']}</p>
          <p>{data?.['studyCircle-done']}</p>
          <p>{data?.['studyCircle-averageAttendance']}</p>
        </div>
        <div className="row">
          <p className="header">اجتماع کارکنان </p>
          <p>{data?.['ijtKarkunan-decided']}</p>
          <p>{data?.['ijtKarkunan-sum']}</p>
          <p>{data?.['ijtKarkunan-averageAttendance']}</p>
        </div>
        <div className="row">
          <p className="header"> درس قرآن </p>
          <p>{data?.['darseQuran-decided']}</p>
          <p>{data?.['darseQuran-sum']}</p>
          <p>{data?.['darseQuran-averageAttendance']}</p>
        </div>
        <div className="row">
          <p className="header"> شاہین میٹینگ</p>
          <p>{data?.['shaheenMeeting-decided']}</p>
          <p>{data?.['shaheenMeeting-done']}</p>
          <p>{data?.['shaheenMeeting-averageAttendance']}</p>
        </div>
        <div className="row">
          <p className="header"> پیغام محفل</p>
          <p>{data?.['paighamEvent-decided']}</p>
          <p>{data?.['paighamEvent-done']}</p>
          <p>{data?.['paighamEvent-averageAttendance']}</p>
        </div>
      </div>
      <div className="w-full flex justify-start font-bold mb-4">
        دیگر سرگرمیاں
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
            موجودہ :{data?.['currentSum']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            روابط سے ملاقاتوں کا ہدف:{data?.['rwabitMeetingsGoal']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            ملاقاتوں کی تعداد:{data?.['meetingsSum']}
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
            ملاقاتیں :{data?.['commonStudentMeetings']}
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
          }}
        >
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کل تعداد لائبریری:{data?.['totalLibraries']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کل تعداد کتب:{data?.['totalBooks']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            اضافہ کتب :{data?.['totalIncrease']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کمی کتب :{data?.['totalDecrease']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کل اجراےَ کتب :{data?.['totalBookRent']}
          </h6>
        </div>
        <h3 style={{ textAlign: "start", fontWeight: "bolder" }}>
          ہمقدم ڈائجسٹ
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
            کل موصولہ :{data?.['totalReceived']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            فروخت کردہ :{data?.['totalSold']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            موصول کرنے کا ماہانہ ہدف:
            {data?.['monthlyReceivingGoal']}
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
        <h3 style={{ textAlign: "start", fontWeight: "bolder" }}>
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
            کتنے امیدوران فل کرتے ہیں :{data?.['umeedwaranFilledSum']}
          </h6>

          <h6 style={{ width: "100%", textAlign: "start" }}>
            کتنےرفقا فل کرتے ہیں :{data?.['rafaqaFilledSum']}
          </h6>
        </div>
        {/* <div
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
          <h3 style={{ fontWeight: "bolder" }}> تبصرہ </h3>
          <h6>{data?.comments} </h6>
        </div>
        <div
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
