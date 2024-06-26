import React, { useContext, useEffect, useState } from "react";
import "./MarkazReportCompilePrint.css";
import { useLocation, useParams } from "react-router-dom";
import { PrintDocument } from "../../../components";
import { CompileReportContext } from "../../../context";
import { UIContext } from "../../../context/ui";
export const MarkazReportCompilePrint = () => {
  const [data, setData] = useState();
  const params = useParams();
  const compileReport = useContext(CompileReportContext);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { getCompileReports } = useContext(UIContext);
  useEffect(() => {
    let url = window.location.pathname.split("/")[2];
   
    if (url === "print") {
      setData(compileReport);
    }
  });
  const areaName = queryParams.get("areaName");
  const startDate = queryParams.get("startDate");
  const endDate = queryParams.get("endDate");
  const areaId = queryParams.get("areaId");

  useEffect(() => {
    getCompileReports(startDate, endDate, "country", areaId);
  }, []);

  return (
    <div className="wrapper reports" style={{ marginBottom: "2rem" }} dir="rtl">
      <PrintDocument />
      <h3
        style={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        جائزہ کارکردگی رپورٹ برائے مرکز
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
          <h4 className="header">مرکز کا نام: </h4>
          <h6>{data?.countryAreaId?.name}</h6>
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
          <h6>{`${startDate}  تا   ${endDate}`}</h6>
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
          <p>{data?.['jamiaatA-end']}</p>
          <p>{data?.['jamiaatA-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">B </p>
          <p>{data?.['jamiaatB-start']}</p>
          <p>{data?.['jamiaatB-increase']}</p>
          <p>{data?.['jamiaatB-end']}</p>
          <p>{data?.['jamiaatB-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">C</p>
          <p>{data?.['jamiaatC-start']}</p>
          <p>{data?.['jamiaatC-increase']}</p>
          <p>{data?.['jamiaatC-end']}</p>
          <p>{data?.['jamiaatC-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">D</p>
          <p>{data?.['jamiaatD-start']}</p>
          <p>{data?.['jamiaatD-increase']}</p>
          <p>{data?.['jamiaatD-end']}</p>
          <p>{data?.['jamiaatD-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">E</p>
          <p>{data?.['jamiaatE-start']}</p>
          <p>{data?.['jamiaatE-increase']}</p>
          <p>{data?.['jamiaatE-end']}</p>
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
          <p>{data?.['collegesA-end']}</p>
          <p>{data?.['collegesA-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">B </p>
          <p>{data?.['collegesB-start']}</p>
          <p>{data?.['collegesB-increase']}</p>
          <p>{data?.['collegesB-end']}</p>
          <p>{data?.['collegesB-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">C</p>
          <p>{data?.['collegesC-start']}</p>
          <p>{data?.['collegesC-increase']}</p>
          <p>{data?.['collegesC-end']}</p>
          <p>{data?.['collegesC-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">D</p>
          <p>{data?.['collegesD-start']}</p>
          <p>{data?.['collegesD-increase']}</p>
          <p>{data?.['collegesD-end']}</p>
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
          <strong>فعال</strong>
        </p>
        <p className="header" style={{ width: "100%" }}>
          <strong>غیرفعال</strong>
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
          <p className="header">رِہائشی حلقے</p>
          <p>{data?.['rehaishHalqay-start']}</p>
          <p>{data?.['rehaishHalqay-increase']}</p>
          <p>{data?.['rehaishHalqay-decrease']}</p>
          <p>
            {data?.['rehaishHalqay-start'] +
              data?.['rehaishHalqay-increase'] -
              data?.['rehaishHalqay-decrease']}
          </p>
          <p>{data?.['rehaishHalqay-continue']}</p>
          <p>{data?.['rehaishHalqay-paused']}</p>
          <p>{data?.['rehaishHalqay-monthly']}</p>
        </div>
        <div className="row">
          <p className="header"> تعلیمی حلقے</p>
          <p>{data?.['taleemHalqay-start']}</p>
          <p>{data?.['taleemHalqay-increase']}</p>
          <p>{data?.['taleemHalqay-decrease']}</p>
          <p>
            {data?.['taleemHalqay-start'] +
              data?.['taleemHalqay-increase'] -
              data?.['taleemHalqay-decrease']}
          </p>
          <p>{data?.['taleemHalqay-continue']}</p>
          <p>{data?.['taleemHalqay-paused']}</p>
          <p>{data?.['taleemHalqay-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">کل حلقے</p>
          <p>{data?.['totalHalqay-start']}</p>
          <p>{data?.['totalHalqay-increase']}</p>
          <p>{data?.['totalHalqay-decrease']}</p>
          <p>
            {data?.['totalHalqay-start'] +
              data?.['totalHalqay-increase'] -
              data?.['totalHalqay-decrease']}
          </p>
          <p>{data?.['totalHalqay-continue']}</p>
          <p>{data?.['totalHalqay-paused']}</p>
          <p>{data?.['totalHalqay-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">رِہائشی زیلی حلقے</p>
          <p>{data?.['subRehaishHalqay-start']}</p>
          <p>{data?.['subRehaishHalqay-increase']}</p>
          <p>{data?.['subRehaishHalqay-decrease']}</p>
          <p>
            {data?.['subRehaishHalqay-start'] +
              data?.['subRehaishHalqay-increase'] -
              data?.['subRehaishHalqay-decrease']}
          </p>
          <p>{data?.['subRehaishHalqay-continue']}</p>
          <p>{data?.['subRehaishHalqay-paused']}</p>
          <p>{data?.['subRehaishHalqay-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">تعلیمی زیلی حلقے</p>
          <p>{data?.['subTaleemHalqay-start']}</p>
          <p>{data?.['subTaleemHalqay-increase']}</p>
          <p>{data?.['subTaleemHalqay-decrease']}</p>
          <p>
            {data?.['subTaleemHalqay-start'] +
              data?.['subTaleemHalqay-increase'] -
              data?.['subTaleemHalqay-decrease']}
          </p>
          <p>{data?.['subTaleemHalqay-continue']}</p>
          <p>{data?.['subTaleemHalqay-paused']}</p>
          <p>{data?.['subTaleemHalqay-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">کل زیلی حلقے</p>
          <p>{data?.['subTotalHalqay-start']}</p>
          <p>{data?.['subTotalHalqay-increase']}</p>
          <p>{data?.['subTotalHalqay-decrease']}</p>
          <p>
            {data?.['subTotalHalqay-start'] +
              data?.['subTotalHalqay-increase'] -
              data?.['subTotalHalqay-decrease']}
          </p>
          <p>{data?.['subTotalHalqay-continue']}</p>
          <p>{data?.['subTotalHalqay-paused']}</p>
          <p>{data?.['subTotalHalqay-monthly']}</p>
        </div>

        <div className="row">
          <p className="header">بزم کے سکول یونٹس</p>
          <p>{data?.['busmSchoolUnits-start']}</p>
          <p>{data?.['busmSchoolUnits-increase']}</p>
          <p>{data?.['busmSchoolUnits-decrease']}</p>
          <p>
            {data?.['busmSchoolUnits-start'] +
              data?.['busmSchoolUnits-increase'] -
              data?.['busmSchoolUnits-decrease']}
          </p>
          <p>{data?.['busmSchoolUnits-continue']}</p>
          <p>{data?.['busmSchoolUnits-paused']}</p>
          <p>{data?.['busmSchoolUnits-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">بزم کے رِہائشی یونٹس</p>
          <p>{data?.['busmRehaishUnits-start']}</p>
          <p>{data?.['busmRehaishUnits-increase']}</p>
          <p>{data?.['busmRehaishUnits-decrease']}</p>
          <p>
            {data?.['busmRehaishUnits-start'] +
              data?.['busmRehaishUnits-increase'] -
              data?.['busmRehaishUnits-decrease']}
          </p>
          <p>{data?.['busmRehaishUnits-continue']}</p>
          <p>{data?.['busmRehaishUnits-paused']}</p>
          <p>{data?.['busmRehaishUnits-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">بزم کے کل یونٹس</p>
          <p>{data?.['busmTotalUnits-start']}</p>
          <p>{data?.['busmTotalUnits-increase']}</p>
          <p>{data?.['busmTotalUnits-decrease']}</p>
          <p>
            {data?.['busmTotalUnits-start'] +
              data?.['busmTotalUnits-increase'] -
              data?.['busmTotalUnits-decrease']}
          </p>
          <p>{data?.['busmTotalUnits-continue']}</p>
          <p>{data?.['busmTotalUnits-paused']}</p>
          <p>{data?.['busmTotalUnits-monthly']}</p>
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
          <p>{data?.['arkan-startSum']}</p>
          <p>{data?.['arkan-increaseSum']}</p>
          <p>{data?.['arkan-decreaseSum']}</p>
          <p>
            {data?.['arkan-startSum'] +
              data?.['arkan-increaseSum'] -
              data?.['arkan-decreaseSum']}
          </p>
          <p>{data?.['arkan-monthly']}</p>
        </div>
        <div className="row">
          <p className="header">امیدواران </p>
          <p>{data?.['umeedWaran-startSum']}</p>
          <p>{data?.['umeedWaran-increaseSum']}</p>
          <p>{data?.['umeedWaran-decreaseSum']}</p>
          <p>
            {data?.['umeedWaran-startSum'] +
              data?.['umeedWaran-increaseSum'] -
              data?.['umeedWaran-decreaseSum']}
          </p>
          <p>{data?.['umeedWaran-monthly']}</p>
          {/* <p>Data 3</p> */}
        </div>
        <div className="row">
          <p className="header">رفقا </p>
          <p>{data?.['rafaqa-startSum']}</p>
          <p>{data?.['rafaqa-increaseSum']}</p>
          <p>{data?.['rafaqa-decreaseSum']}</p>
          <p>
            {data?.['rafaqa-startSum'] +
              data?.['rafaqa-increaseSum'] -
              data?.['rafaqa-decreaseSum']}
          </p>
          <p>{data?.['rafaqa-monthly']}</p>
          {/* <p>Data 3</p> */}
        </div>
        <div className="row">
          <p className="header">کارکنان </p>
          <p>{data?.['karkunan-startSum']}</p>
          <p>{data?.['karkunan-increaseSum']}</p>
          <p>{data?.['karkunan-decreaseSum']}</p>
          <p>
            {data?.['karkunan-startSum'] +
              data?.['karkunan-increaseSum'] -
              data?.['karkunan-decreaseSum']}
          </p>
          <p>{data?.['karkunan-monthly']}</p>
          {/* <p>Data 3</p> */}
        </div>
        <div className="row">
          <p className="header"> شاہین</p>
          <p>{data?.['shaheen-startSum']}</p>
          <p>{data?.['shaheen-increaseSum']}</p>
          <p>{data?.['shaheen-decreaseSum']}</p>
          <p>
            {data?.['shaheen-startSum'] +
              data?.['shaheen-increaseSum'] -
              data?.['shaheen-decreaseSum']}
          </p>
          <p>{data?.['shaheen-monthly']}</p>
          {/* <p>Data 3</p> */}
        </div>
        <div className="row">
          <p className="header">ممبرز </p>
          <p>{data?.['members-startSum']}</p>
          <p>{data?.['members-increaseSum']}</p>
          <p>{data?.['members-decreaseSum']}</p>
          <p>
            {data?.['members-startSum'] +
              data?.['members-increaseSum'] -
              data?.['members-decreaseSum']}
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
          <p className="header"> ڈویژنل مشاورات</p>
          <p>{data?.['divMushawarat-decided']}</p>
          <p>{data?.['divMushawarat-done']}</p>
          <p>{data?.['divMushawarat-averageAttendance']}</p>
        </div>
        <div className="row">
          <p className="header">اجتماع ارکان</p>
          <p>{data?.['ijtArkan-decided']}</p>
          <p>{data?.['ijtArkan-done']}</p>
          <p>{data?.['ijtArkan-averageAttendance']}</p>
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
          <p className="header">سٹڈی سرکل </p>
          <p>{data?.['studyCircle-decided']}</p>
          <p>{data?.['studyCircle-done']}</p>
          <p>{data?.['studyCircle-averageAttendance']}</p>
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
          <p>{data?.['ijtKarkunan-done']}</p>
          <p>{data?.['ijtKarkunan-averageAttendance']}</p>
        </div>
        <div className="row">
          <p className="header"> درس قرآن </p>
          <p>{data?.['darseQuran-decided']}</p>
          <p>{data?.['darseQuran-done']}</p>
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
          flexDirection: "column",
          width: "100%",
          gap: "12px",
        }}
        className="tableContainer"
      >
        <div className="flex gap-12 w-full ">
          <h6 style={{ width: "100%", textAlign: "start" }}>
            تربیت گاہ:{data?.['tarbiyatGaah']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            تربیت گاہوں کے انعقاد کا ہدف:
            {data?.['tarbiyatGaahGoalSum']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            تربیت گاہوں کے انعقاد کی تعداد:{" "}
            {data?.['tarbiyatGaahHeldSum']}
          </h6>
        </div>
        <div className="flex gap-4 w-full">
          <h6 style={{ width: "100%", textAlign: "start" }}>
            تنظیمی دورہ:{data?.['tanzeemiRound']}
          </h6>
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
            روابط سے ملاقاتوں کا ہدف:{data?.['rwabitMeetingsGoal']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            موجود :{data?.['current']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            ملاقاتوں کی تعداد: :{data?.['meetings']}
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
            ملاقاتیں:{data?.['commonStudentMeetings']}
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
            کل پرنٹ کردہ:
            {data?.['totalPrinted']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کل فروخت کردہ (تنظیمی) :{data?.['totalSoldTanzeemi']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کل فروخت کردہ(مارکیٹ):{data?.['totalSoldMarket']}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            گفٹ:{data?.['gift']}
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
            کتنے امیدوران فل کرتے ہیں :{data?.['umeedwaranFilled']}
          </h6>

          <h6 style={{ width: "100%", textAlign: "start" }}>
            کتنےرفقا فل کرتے ہیں :{data?.['rafaqaFilled']}
          </h6>
        </div>
       
        
      </div>
    </div>
  );
};
