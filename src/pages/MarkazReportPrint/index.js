import React, { useEffect, useState } from "react";
import "./MarkazReportPrint.css";
import { useParams } from "react-router-dom";
import instance from "../../api/instrance";
import { PrintDocument } from "../../components";
export const MarkazReportPrint = () => {
  const [data, setData] = useState();
  const params = useParams();
  const printReport = async (id) => {
    const req = await instance.get(`/reports/markaz/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("@token")}`,
      },
    });
    if (req.status === 200) {
      setData(req?.data?.data);
    }
  };
  useEffect(() => {
    if (params?.id) printReport(params?.id);
  }, [params]);
  return (
    <div className="wrapper reports" style={{ marginBottom: "2rem" }} dir="rtl">
      <PrintDocument />
      <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
        جائزہ کارکردگی رپورٹ برائے صوبہ
      </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: "1rem",
        }}
        className="tableContainer"
      >
        <h4 className="header">صوبے کا نام: </h4>
        <h6>{data?.provinceAreaId?.name}</h6>
        <h4 className="header">برائے ماہ:</h4>
        <h6>{data?.month.split("T")[0]}</h6>
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
          <p>{data?.jamiaatId?.jamiaatA?.start}</p>
          <p>{data?.jamiaatId?.jamiaatA?.increase}</p>
          <p>{data?.jamiaatId?.jamiaatA?.end}</p>
          <p>{data?.jamiaatId?.jamiaatA?.monthly}</p>
        </div>
        <div className="row">
          <p className="header">B </p>
          <p>{data?.jamiaatId?.jamiaatB?.start}</p>
          <p>{data?.jamiaatId?.jamiaatB?.increase}</p>
          <p>{data?.jamiaatId?.jamiaatB?.end}</p>
          <p>{data?.jamiaatId?.jamiaatB?.monthly}</p>
        </div>
        <div className="row">
          <p className="header">C</p>
          <p>{data?.jamiaatId?.jamiaatC?.start}</p>
          <p>{data?.jamiaatId?.jamiaatC?.increase}</p>
          <p>{data?.jamiaatId?.jamiaatC?.end}</p>
          <p>{data?.jamiaatId?.jamiaatC?.monthly}</p>
        </div>
        <div className="row">
          <p className="header">D</p>
          <p>{data?.jamiaatId?.jamiaatD?.start}</p>
          <p>{data?.jamiaatId?.jamiaatD?.increase}</p>
          <p>{data?.jamiaatId?.jamiaatD?.end}</p>
          <p>{data?.jamiaatId?.jamiaatD?.monthly}</p>
        </div>
        <div className="row">
          <p className="header">E</p>
          <p>{data?.jamiaatId?.jamiaatE?.start}</p>
          <p>{data?.jamiaatId?.jamiaatE?.increase}</p>
          <p>{data?.jamiaatId?.jamiaatE?.end}</p>
          <p>{data?.jamiaatId?.jamiaatE?.monthly}</p>
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
          <p>{data?.collegesId?.collegesA?.start}</p>
          <p>{data?.collegesId?.collegesA?.increase}</p>
          <p>{data?.collegesId?.collegesA?.end}</p>
          <p>{data?.collegesId?.collegesA?.monthly}</p>
        </div>
        <div className="row">
          <p className="header">B </p>
          <p>{data?.collegesId?.collegesB?.start}</p>
          <p>{data?.collegesId?.collegesB?.increase}</p>
          <p>{data?.collegesId?.collegesB?.end}</p>
          <p>{data?.collegesId?.collegesB?.monthly}</p>
        </div>
        <div className="row">
          <p className="header">C</p>
          <p>{data?.collegesId?.collegesC?.start}</p>
          <p>{data?.collegesId?.collegesC?.increase}</p>
          <p>{data?.collegesId?.collegesC?.end}</p>
          <p>{data?.collegesId?.collegesC?.monthly}</p>
        </div>
        <div className="row">
          <p className="header">D</p>
          <p>{data?.collegesId?.collegesD?.start}</p>
          <p>{data?.collegesId?.collegesD?.increase}</p>
          <p>{data?.collegesId?.collegesD?.end}</p>
          <p>{data?.collegesId?.collegesD?.monthly}</p>
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
          <p>{data?.markazTanzeemId?.rehaishHalqay?.start}</p>
          <p>{data?.markazTanzeemId?.rehaishHalqay?.increase}</p>
          <p>{data?.markazTanzeemId?.rehaishHalqay?.decrease}</p>
          <p>
            {data?.markazTanzeemId?.rehaishHalqay?.start +
              data?.markazTanzeemId?.rehaishHalqay?.increase -
              data?.markazTanzeemId?.rehaishHalqay?.decrease}
          </p>
          <p>{data?.markazTanzeemId?.rehaishHalqay?.continue}</p>
          <p>{data?.markazTanzeemId?.rehaishHalqay?.paused}</p>
          <p>{data?.markazTanzeemId?.rehaishHalqay?.monthly}</p>
        </div>
        <div className="row">
          <p className="header"> تعلیمی حلقے</p>
          <p>{data?.markazTanzeemId?.taleemHalqay?.start}</p>
          <p>{data?.markazTanzeemId?.taleemHalqay?.increase}</p>
          <p>{data?.markazTanzeemId?.taleemHalqay?.decrease}</p>
          <p>
            {data?.markazTanzeemId?.taleemHalqay?.start +
              data?.markazTanzeemId?.taleemHalqay?.increase -
              data?.markazTanzeemId?.taleemHalqay?.decrease}
          </p>
          <p>{data?.markazTanzeemId?.taleemHalqay?.continue}</p>
          <p>{data?.markazTanzeemId?.taleemHalqay?.paused}</p>
          <p>{data?.markazTanzeemId?.taleemHalqay?.monthly}</p>
        </div>
        <div className="row">
          <p className="header">کل حلقے</p>
          <p>{data?.markazTanzeemId?.totalHalqay?.start}</p>
          <p>{data?.markazTanzeemId?.totalHalqay?.increase}</p>
          <p>{data?.markazTanzeemId?.totalHalqay?.decrease}</p>
          <p>
            {data?.markazTanzeemId?.totalHalqay?.start +
              data?.markazTanzeemId?.totalHalqay?.increase -
              data?.markazTanzeemId?.totalHalqay?.decrease}
          </p>
          <p>{data?.markazTanzeemId?.totalHalqay?.continue}</p>
          <p>{data?.markazTanzeemId?.totalHalqay?.paused}</p>
          <p>{data?.markazTanzeemId?.totalHalqay?.monthly}</p>
        </div>
        <div className="row">
          <p className="header">رِہائشی زیلی حلقے</p>
          <p>{data?.markazTanzeemId?.subRehaishHalqay?.start}</p>
          <p>{data?.markazTanzeemId?.subRehaishHalqay?.increase}</p>
          <p>{data?.markazTanzeemId?.subRehaishHalqay?.decrease}</p>
          <p>
            {data?.markazTanzeemId?.subRehaishHalqay?.start +
              data?.markazTanzeemId?.subRehaishHalqay?.increase -
              data?.markazTanzeemId?.subRehaishHalqay?.decrease}
          </p>
          <p>{data?.markazTanzeemId?.subRehaishHalqay?.continue}</p>
          <p>{data?.markazTanzeemId?.subRehaishHalqay?.paused}</p>
          <p>{data?.markazTanzeemId?.subRehaishHalqay?.monthly}</p>
        </div>
        <div className="row">
          <p className="header">تعلیمی زیلی حلقے</p>
          <p>{data?.markazTanzeemId?.subTaleemHalqay?.start}</p>
          <p>{data?.markazTanzeemId?.subTaleemHalqay?.increase}</p>
          <p>{data?.markazTanzeemId?.subTaleemHalqay?.decrease}</p>
          <p>
            {data?.markazTanzeemId?.subTaleemHalqay?.start +
              data?.markazTanzeemId?.subTaleemHalqay?.increase -
              data?.markazTanzeemId?.subTaleemHalqay?.decrease}
          </p>
          <p>{data?.markazTanzeemId?.subTaleemHalqay?.continue}</p>
          <p>{data?.markazTanzeemId?.subTaleemHalqay?.paused}</p>
          <p>{data?.markazTanzeemId?.subTaleemHalqay?.monthly}</p>
        </div>
        <div className="row">
          <p className="header">کل زیلی حلقے</p>
          <p>{data?.markazTanzeemId?.subTotalHalqay?.start}</p>
          <p>{data?.markazTanzeemId?.subTotalHalqay?.increase}</p>
          <p>{data?.markazTanzeemId?.subTotalHalqay?.decrease}</p>
          <p>
            {data?.markazTanzeemId?.subTotalHalqay?.start +
              data?.markazTanzeemId?.subTotalHalqay?.increase -
              data?.markazTanzeemId?.subTotalHalqay?.decrease}
          </p>
          <p>{data?.markazTanzeemId?.subTotalHalqay?.continue}</p>
          <p>{data?.markazTanzeemId?.subTotalHalqay?.paused}</p>
          <p>{data?.markazTanzeemId?.subTotalHalqay?.monthly}</p>
        </div>

        <div className="row">
          <p className="header">بزم کے سکول یونٹس</p>
          <p>{data?.markazTanzeemId?.busmSchoolUnits?.start}</p>
          <p>{data?.markazTanzeemId?.busmSchoolUnits?.increase}</p>
          <p>{data?.markazTanzeemId?.busmSchoolUnits?.decrease}</p>
          <p>
            {data?.markazTanzeemId?.busmSchoolUnits?.start +
              data?.markazTanzeemId?.busmSchoolUnits?.increase -
              data?.markazTanzeemId?.busmSchoolUnits?.decrease}
          </p>
          <p>{data?.markazTanzeemId?.busmSchoolUnits?.continue}</p>
          <p>{data?.markazTanzeemId?.busmSchoolUnits?.paused}</p>
          <p>{data?.markazTanzeemId?.busmSchoolUnits?.monthly}</p>
        </div>
        <div className="row">
          <p className="header">بزم کے رِہائشی یونٹس</p>
          <p>{data?.markazTanzeemId?.busmRehaishUnits?.start}</p>
          <p>{data?.markazTanzeemId?.busmRehaishUnits?.increase}</p>
          <p>{data?.markazTanzeemId?.busmRehaishUnits?.decrease}</p>
          <p>
            {data?.markazTanzeemId?.busmRehaishUnits?.start +
              data?.markazTanzeemId?.busmRehaishUnits?.increase -
              data?.markazTanzeemId?.busmRehaishUnits?.decrease}
          </p>
          <p>{data?.markazTanzeemId?.busmRehaishUnits?.continue}</p>
          <p>{data?.markazTanzeemId?.busmRehaishUnits?.paused}</p>
          <p>{data?.markazTanzeemId?.busmRehaishUnits?.monthly}</p>
        </div>
        <div className="row">
          <p className="header">بزم کے کل یونٹس</p>
          <p>{data?.markazTanzeemId?.busmTotalUnits?.start}</p>
          <p>{data?.markazTanzeemId?.busmTotalUnits?.increase}</p>
          <p>{data?.markazTanzeemId?.busmTotalUnits?.decrease}</p>
          <p>
            {data?.markazTanzeemId?.busmTotalUnits?.start +
              data?.markazTanzeemId?.busmTotalUnits?.increase -
              data?.markazTanzeemId?.busmTotalUnits?.decrease}
          </p>
          <p>{data?.markazTanzeemId?.busmTotalUnits?.continue}</p>
          <p>{data?.markazTanzeemId?.busmTotalUnits?.paused}</p>
          <p>{data?.markazTanzeemId?.busmTotalUnits?.monthly}</p>
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
          <p>{data?.markazWorkerInfoId?.arkan?.startSum}</p>
          <p>{data?.markazWorkerInfoId?.arkan?.increaseSum}</p>
          <p>{data?.markazWorkerInfoId?.arkan?.decreaseSum}</p>
          <p>
            {data?.markazWorkerInfoId?.arkan?.startSum +
              data?.markazWorkerInfoId?.arkan?.increaseSum -
              data?.markazWorkerInfoId?.arkan?.decreaseSum}
          </p>
          <p>{data?.markazWorkerInfoId?.arkan?.monthly}</p>
        </div>
        <div className="row">
          <p className="header">امیدواران </p>
          <p>{data?.markazWorkerInfoId?.umeedWaran?.startSum}</p>
          <p>{data?.markazWorkerInfoId?.umeedWaran?.increaseSum}</p>
          <p>{data?.markazWorkerInfoId?.umeedWaran?.decreaseSum}</p>
          <p>
            {data?.markazWorkerInfoId?.umeedWaran?.startSum +
              data?.markazWorkerInfoId?.umeedWaran?.increaseSum -
              data?.markazWorkerInfoId?.umeedWaran?.decreaseSum}
          </p>
          <p>{data?.markazWorkerInfoId?.umeedWaran?.monthly}</p>
          {/* <p>Data 3</p> */}
        </div>
        <div className="row">
          <p className="header">رفقا </p>
          <p>{data?.markazWorkerInfoId?.rafaqa?.startSum}</p>
          <p>{data?.markazWorkerInfoId?.rafaqa?.increaseSum}</p>
          <p>{data?.markazWorkerInfoId?.rafaqa?.decreaseSum}</p>
          <p>
            {data?.markazWorkerInfoId?.rafaqa?.startSum +
              data?.markazWorkerInfoId?.rafaqa?.increaseSum -
              data?.markazWorkerInfoId?.rafaqa?.decreaseSum}
          </p>
          <p>{data?.markazWorkerInfoId?.rafaqa?.monthly}</p>
          {/* <p>Data 3</p> */}
        </div>
        <div className="row">
          <p className="header">کارکنان </p>
          <p>{data?.markazWorkerInfoId?.karkunan?.startSum}</p>
          <p>{data?.markazWorkerInfoId?.karkunan?.increaseSum}</p>
          <p>{data?.markazWorkerInfoId?.karkunan?.decreaseSum}</p>
          <p>
            {data?.markazWorkerInfoId?.karkunan?.startSum +
              data?.markazWorkerInfoId?.karkunan?.increaseSum -
              data?.markazWorkerInfoId?.karkunan?.decreaseSum}
          </p>
          <p>{data?.markazWorkerInfoId?.karkunan?.monthly}</p>
          {/* <p>Data 3</p> */}
        </div>
        <div className="row">
          <p className="header"> شاہین</p>
          <p>{data?.markazWorkerInfoId?.shaheen?.startSum}</p>
          <p>{data?.markazWorkerInfoId?.shaheen?.increaseSum}</p>
          <p>{data?.markazWorkerInfoId?.shaheen?.decreaseSum}</p>
          <p>
            {data?.markazWorkerInfoId?.shaheen?.startSum +
              data?.markazWorkerInfoId?.shaheen?.increaseSum -
              data?.markazWorkerInfoId?.shaheen?.decreaseSum}
          </p>
          <p>{data?.markazWorkerInfoId?.shaheen?.monthly}</p>
          {/* <p>Data 3</p> */}
        </div>
        <div className="row">
          <p className="header">ممبرز </p>
          <p>{data?.markazWorkerInfoId?.members?.startSum}</p>
          <p>{data?.markazWorkerInfoId?.members?.increaseSum}</p>
          <p>{data?.markazWorkerInfoId?.members?.decreaseSum}</p>
          <p>
            {data?.markazWorkerInfoId?.members?.startSum +
              data?.markazWorkerInfoId?.members?.increaseSum -
              data?.markazWorkerInfoId?.members?.decreaseSum}
          </p>
          <p>{data?.markazWorkerInfoId?.members?.monthly}</p>
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
          <p>{data?.markazActivityId?.divMushawarat?.decided}</p>
          <p>{data?.markazActivityId?.divMushawarat?.done}</p>
          <p>{data?.markazActivityId?.divMushawarat?.averageAttendance}</p>
        </div>
        <div className="row">
          <p className="header">اجتماع ارکان</p>
          <p>{data?.markazActivityId?.ijtArkan?.decided}</p>
          <p>{data?.markazActivityId?.ijtArkan?.done}</p>
          <p>{data?.markazActivityId?.ijtArkan?.averageAttendance}</p>
        </div>
        <div className="row">
          <p className="header">اجتماع ناظمین </p>
          <p>{data?.markazActivityId?.ijtNazmeen?.decided}</p>
          <p>{data?.markazActivityId?.ijtNazmeen?.done}</p>
          <p>{data?.markazActivityId?.ijtNazmeen?.averageAttendance}</p>
        </div>
        <div className="row">
          <p className="header">اجتماع امیدوران </p>
          <p>{data?.markazActivityId?.ijtUmeedwaran?.decided}</p>
          <p>{data?.markazActivityId?.ijtUmeedwaran?.done}</p>
          <p>{data?.markazActivityId?.ijtUmeedwaran?.averageAttendance}</p>
        </div>
        <div className="row">
          <p className="header">سٹڈی سرکل </p>
          <p>{data?.markazActivityId?.studyCircle?.decided}</p>
          <p>{data?.markazActivityId?.studyCircle?.done}</p>
          <p>{data?.markazActivityId?.studyCircle?.averageAttendance}</p>
        </div>
        <div className="row">
          <p className="header"> صدور میٹینگ</p>
          <p>{data?.markazActivityId?.sadurMeeting?.decided}</p>
          <p>{data?.markazActivityId?.sadurMeeting?.done}</p>
          <p>{data?.markazActivityId?.sadurMeeting?.averageAttendance}</p>
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
          <p>{data?.mentionedActivityId?.ijtRafaqa?.decided}</p>
          <p>{data?.mentionedActivityId?.ijtRafaqa?.done}</p>
          <p>{data?.mentionedActivityId?.ijtRafaqa?.averageAttendance}</p>
        </div>
        <div className="row">
          <p className="header">سٹڈی سرکل </p>
          <p>{data?.mentionedActivityId?.studyCircle?.decided}</p>
          <p>{data?.mentionedActivityId?.studyCircle?.done}</p>
          <p>{data?.mentionedActivityId?.studyCircle?.averageAttendance}</p>
        </div>
        <div className="row">
          <p className="header">اجتماع کارکنان </p>
          <p>{data?.mentionedActivityId?.ijtKarkunan?.decided}</p>
          <p>{data?.mentionedActivityId?.ijtKarkunan?.done}</p>
          <p>{data?.mentionedActivityId?.ijtKarkunan?.averageAttendance}</p>
        </div>
        <div className="row">
          <p className="header"> درس قرآن </p>
          <p>{data?.mentionedActivityId?.darseQuran?.decided}</p>
          <p>{data?.mentionedActivityId?.darseQuran?.done}</p>
          <p>{data?.mentionedActivityId?.darseQuran?.averageAttendance}</p>
        </div>
        <div className="row">
          <p className="header"> شاہین میٹینگ</p>
          <p>{data?.mentionedActivityId?.shaheenMeeting?.decided}</p>
          <p>{data?.mentionedActivityId?.shaheenMeeting?.done}</p>
          <p>{data?.mentionedActivityId?.shaheenMeeting?.averageAttendance}</p>
        </div>
        <div className="row">
          <p className="header"> پیغام محفل</p>
          <p>{data?.mentionedActivityId?.paighamEvent?.decided}</p>
          <p>{data?.mentionedActivityId?.paighamEvent?.done}</p>
          <p>{data?.mentionedActivityId?.paighamEvent?.averageAttendance}</p>
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
          flexDirection:'column',
          width:'100%',
          gap:'12px'
        }}
        className="tableContainer"
      >
        <div className="flex gap-12 w-full ">
          <h6 style={{ width: "100%", textAlign: "start" }}>
            تربیت گاہ:{data?.otherActivityId?.tarbiyatGaah}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            تربیت گاہوں کے انعقاد کا ہدف:{data?.otherActivityId?.tarbiyatGaahGoalSum}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            تربیت گاہوں کے انعقاد کی تعداد: {data?.otherActivityId?.tarbiyatGaahHeldSum}
          </h6>
        </div>
        <div className="flex gap-4 w-full">
          <h6 style={{ width: "100%", textAlign: "start" }}>
            تنظیمی دورہ:{data?.otherActivityId?.tanzeemiRound}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            دعوتی وفود:{data?.otherActivityId?.dawatiWafud}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            روابط پارٹیز:{data?.otherActivityId?.rawabitParties}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            شب بیداری:{data?.otherActivityId?.shabBedari}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            نِطام الصلوۃ:{data?.otherActivityId?.nizamSalah}
          </h6>
          
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          textAlign: "start",
          flexDirection: "row",
          gap: "10px",
          marginBottom: "1rem",
        }}
        className="tableContainer"
      >
        <h3>کوئی اور سرگرمی</h3>
        <h6>{data?.otherActivityId?.anyOther}</h6>
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
            طے شدہ:{data?.tdId?.rawabitDecided}
          </h6>

          <h6 style={{ width: "100%", textAlign: "start" }}>
            روابط سے ملاقاتوں کا ہدف:{data?.tdId?.rwabitMeetingsGoal}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            موجود :{data?.tdId?.current}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
          ملاقاتوں کی تعداد: :{data?.tdId?.meetings}
          </h6>

          <h6 style={{ width: "100%", textAlign: "start" }}>
            تقسیم لٹریچر:{data?.tdId?.literatureDistribution}
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
            ملاقاتیں:{data?.tdId?.commonStudentMeetings}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            تقسیم لٹریچر:{data?.tdId?.commonLiteratureDistribution}
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
            کل تعداد لائبریری:{data?.markazDivisionLibId?.totalLibraries}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کل تعداد کتب:{data?.markazDivisionLibId?.totalBooks}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            اضافہ کتب :{data?.markazDivisionLibId?.totalIncrease}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کمی کتب :{data?.markazDivisionLibId?.totalDecrease}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کل اجراےَ کتب :{data?.markazDivisionLibId?.totalBookRent}
          </h6>
        </div>
        <h3 style={{ textAlign: "start", fontWeight: "bolder" }}>
          پیغام ڈایجیسٹ
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
            {data?.paighamDigestId?.totalPrinted}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کل فروخت کردہ (تنظیمی) :{data?.paighamDigestId?.totalSoldTanzeemi}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کل فروخت کردہ(مارکیٹ):{data?.paighamDigestId?.totalSoldMarket}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            گفٹ:{data?.paighamDigestId?.gift}
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
            کتنے امیدوران فل کرتے ہیں :{data?.rsdId?.umeedwaranFilled}
          </h6>

          <h6 style={{ width: "100%", textAlign: "start" }}>
            کتنےرفقا فل کرتے ہیں :{data?.rsdId?.rafaqaFilled}
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
        >
          <h3 style={{ fontWeight: "bolder" }}> تبصرہ </h3>
          <h6>{data?.comments}</h6>
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
        </div>
      </div>
    </div>
  );
};
