import React, { useEffect, useState } from "react";
import "./ProvinceReport.css";
import { useParams } from "react-router-dom";
import instance from "../../api/instrance";
import { PrintDocument } from "../../components";
export const ProvinceReport = () => {
  const [data, setData] = useState();
  const params = useParams();
  const printReport = async (id) => {
    const req = await instance.get(`/reports/province/${id}`, {
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
      <div className="flex w-full p-4 justify-start items-center font-bold text-2xl"> جامعات</div>
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
          <p>
            {data?.jamiaatId?.jamiaatA?.end}
          </p>
          <p>{data?.jamiaatId?.jamiaatA?.monthly}</p>
          
        </div>
        <div className="row">
          <p className="header">B </p>
          <p>{data?.jamiaatId?.jamiaatB?.start}</p>
          <p>{data?.jamiaatId?.jamiaatB?.increase}</p>
          <p>
            {data?.jamiaatId?.jamiaatB?.end}
          </p>
          <p>{data?.jamiaatId?.jamiaatB?.monthly}</p>
          
        </div>
        <div className="row">
          <p className="header">C</p>
          <p>{data?.jamiaatId?.jamiaatC?.start}</p>
          <p>{data?.jamiaatId?.jamiaatC?.increase}</p>
          <p>
            {data?.jamiaatId?.jamiaatC?.end}
          </p>
          <p>{data?.jamiaatId?.jamiaatC?.monthly}</p>
          
        </div>
        <div className="row">
          <p className="header">D</p>
          <p>{data?.jamiaatId?.jamiaatD?.start}</p>
          <p>{data?.jamiaatId?.jamiaatD?.increase}</p>
          <p>
            {data?.jamiaatId?.jamiaatD?.end}
          </p>
          <p>{data?.jamiaatId?.jamiaatD?.monthly}</p>
          
        </div>
        <div className="row">
          <p className="header">E</p>
          <p>{data?.jamiaatId?.jamiaatE?.start}</p>
          <p>{data?.jamiaatId?.jamiaatE?.increase}</p>
          <p>
            {data?.jamiaatId?.jamiaatE?.end}
          </p>
          <p>{data?.jamiaatId?.jamiaatE?.monthly}</p>
          
        </div>
        
      </div>
      <div className="flex w-full p-4 justify-start items-center font-bold text-2xl"> کالجز</div>
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
          <p>
            {data?.collegesId?.collegesA?.end}
          </p>
          <p>{data?.collegesId?.collegesA?.monthly}</p>
          
        </div>
        <div className="row">
          <p className="header">B </p>
          <p>{data?.collegesId?.collegesB?.start}</p>
          <p>{data?.collegesId?.collegesB?.increase}</p>
          <p>
            {data?.collegesId?.collegesB?.end}
          </p>
          <p>{data?.collegesId?.collegesB?.monthly}</p>
          
        </div>
        <div className="row">
          <p className="header">C</p>
          <p>{data?.collegesId?.collegesC?.start}</p>
          <p>{data?.collegesId?.collegesC?.increase}</p>
          <p>
            {data?.collegesId?.collegesC?.end}
          </p>
          <p>{data?.collegesId?.collegesC?.monthly}</p>
          
        </div>
        <div className="row">
          <p className="header">D</p>
          <p>{data?.collegesId?.collegesD?.start}</p>
          <p>{data?.collegesId?.collegesD?.increase}</p>
          <p>
            {data?.collegesId?.collegesD?.end}
          </p>
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
          <strong>غیرفعال</strong>
        </p>
        <p className="header" style={{ width: "100%" }}>
          <strong>فعال</strong>
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
          <p>{data?.provinceTanzeemId?.rehaishHalqay?.start}</p>
          <p>{data?.provinceTanzeemId?.rehaishHalqay?.increase}</p>
          <p>{data?.provinceTanzeemId?.rehaishHalqay?.decrease}</p>
          <p>
            {data?.provinceTanzeemId?.rehaishHalqay?.start +
              data?.provinceTanzeemId?.rehaishHalqay?.increase -
              data?.provinceTanzeemId?.rehaishHalqay?.decrease}
          </p>
          <p>{data?.provinceTanzeemId?.rehaishHalqay?.paused}</p>
          <p>{data?.provinceTanzeemId?.rehaishHalqay?.continue}</p>
        </div>
        <div className="row">
          <p className="header"> تعلیمی حلقے</p>
          <p>{data?.provinceTanzeemId?.taleemHalqay?.start}</p>
          <p>{data?.provinceTanzeemId?.taleemHalqay?.increase}</p>
          <p>{data?.provinceTanzeemId?.taleemHalqay?.decrease}</p>
          <p>
            {data?.provinceTanzeemId?.taleemHalqay?.start +
              data?.provinceTanzeemId?.taleemHalqay?.increase -
              data?.provinceTanzeemId?.taleemHalqay?.decrease}
          </p>
          <p>{data?.provinceTanzeemId?.taleemHalqay?.paused}</p>
          <p>{data?.provinceTanzeemId?.taleemHalqay?.continue}</p>
        </div>
        <div className="row">
          <p className="header">کل حلقے</p>
          <p>{data?.provinceTanzeemId?.totalHalqay?.start}</p>
          <p>{data?.provinceTanzeemId?.totalHalqay?.increase}</p>
          <p>{data?.provinceTanzeemId?.totalHalqay?.decrease}</p>
          <p>
            {data?.provinceTanzeemId?.totalHalqay?.start +
              data?.provinceTanzeemId?.totalHalqay?.increase -
              data?.provinceTanzeemId?.totalHalqay?.decrease}
          </p>
          <p>{data?.provinceTanzeemId?.totalHalqay?.paused}</p>
          <p>{data?.provinceTanzeemId?.totalHalqay?.continue}</p>
        </div>
        <div className="row">
          <p className="header">رِہائشی زیلی حلقے</p>
          <p>{data?.provinceTanzeemId?.subRehaishHalqay?.start}</p>
          <p>{data?.provinceTanzeemId?.subRehaishHalqay?.increase}</p>
          <p>{data?.provinceTanzeemId?.subRehaishHalqay?.decrease}</p>
          <p>
            {data?.provinceTanzeemId?.subRehaishHalqay?.start +
              data?.provinceTanzeemId?.subRehaishHalqay?.increase -
              data?.provinceTanzeemId?.subRehaishHalqay?.decrease}
          </p>
          <p>{data?.provinceTanzeemId?.subRehaishHalqay?.paused}</p>
          <p>{data?.provinceTanzeemId?.subRehaishHalqay?.continue}</p>
        </div>
        <div className="row">
          <p className="header">تعلیمی زیلی حلقے</p>
          <p>{data?.provinceTanzeemId?.subTaleemHalqay?.start}</p>
          <p>{data?.provinceTanzeemId?.subTaleemHalqay?.increase}</p>
          <p>{data?.provinceTanzeemId?.subTaleemHalqay?.decrease}</p>
          <p>
            {data?.provinceTanzeemId?.subTaleemHalqay?.start +
              data?.provinceTanzeemId?.subTaleemHalqay?.increase -
              data?.provinceTanzeemId?.subTaleemHalqay?.decrease}
          </p>
          <p>{data?.provinceTanzeemId?.subTaleemHalqay?.paused}</p>
          <p>{data?.provinceTanzeemId?.subTaleemHalqay?.continue}</p>
        </div>
        <div className="row">
          <p className="header">کل زیلی حلقے</p>
          <p>{data?.provinceTanzeemId?.subTotalHalqay?.start}</p>
          <p>{data?.provinceTanzeemId?.subTotalHalqay?.increase}</p>
          <p>{data?.provinceTanzeemId?.subTotalHalqay?.decrease}</p>
          <p>
            {data?.provinceTanzeemId?.subTotalHalqay?.start +
              data?.provinceTanzeemId?.subTotalHalqay?.increase -
              data?.provinceTanzeemId?.subTotalHalqay?.decrease}
          </p>
          <p>{data?.provinceTanzeemId?.subTotalHalqay?.paused}</p>
          <p>{data?.provinceTanzeemId?.subTotalHalqay?.continue}</p>
        </div>

        <div className="row">
          <p className="header">بزم کے سکول یونٹس</p>
          <p>{data?.provinceTanzeemId?.busmSchoolUnits?.start}</p>
          <p>{data?.provinceTanzeemId?.busmSchoolUnits?.increase}</p>
          <p>{data?.provinceTanzeemId?.busmSchoolUnits?.decrease}</p>
          <p>
            {data?.provinceTanzeemId?.busmSchoolUnits?.start +
              data?.provinceTanzeemId?.busmSchoolUnits?.increase -
              data?.provinceTanzeemId?.busmSchoolUnits?.decrease}
          </p>
          <p>{data?.provinceTanzeemId?.busmSchoolUnits?.paused}</p>
          <p>{data?.provinceTanzeemId?.busmSchoolUnits?.continue}</p>
        </div>
        <div className="row">
          <p className="header">بزم کے رِہائشی یونٹس</p>
          <p>{data?.provinceTanzeemId?.busmRehaishUnits?.start}</p>
          <p>{data?.provinceTanzeemId?.busmRehaishUnits?.increase}</p>
          <p>{data?.provinceTanzeemId?.busmRehaishUnits?.decrease}</p>
          <p>
            {data?.provinceTanzeemId?.busmRehaishUnits?.start +
              data?.provinceTanzeemId?.busmRehaishUnits?.increase -
              data?.provinceTanzeemId?.busmRehaishUnits?.decrease}
          </p>
          <p>{data?.provinceTanzeemId?.busmRehaishUnits?.paused}</p>
          <p>{data?.provinceTanzeemId?.busmRehaishUnits?.continue}</p>
        </div>
        <div className="row">
          <p className="header">بزم کے کل یونٹس</p>
          <p>{data?.provinceTanzeemId?.busmTotalUnits?.start}</p>
          <p>{data?.provinceTanzeemId?.busmTotalUnits?.increase}</p>
          <p>{data?.provinceTanzeemId?.busmTotalUnits?.decrease}</p>
          <p>
            {data?.provinceTanzeemId?.busmTotalUnits?.start +
              data?.provinceTanzeemId?.busmTotalUnits?.increase -
              data?.provinceTanzeemId?.busmTotalUnits?.decrease}
          </p>
          <p>{data?.provinceTanzeemId?.busmTotalUnits?.paused}</p>
          <p>{data?.provinceTanzeemId?.busmTotalUnits?.continue}</p>
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
          <p>{data?.provinceWorkerInfoId?.arkan?.startSum}</p>
          <p>{data?.provinceWorkerInfoId?.arkan?.increaseSum}</p>
          <p>{data?.provinceWorkerInfoId?.arkan?.decreaseSum}</p>
          <p>
            {data?.provinceWorkerInfoId?.arkan?.startSum +
              data?.provinceWorkerInfoId?.arkan?.increaseSum -
              data?.provinceWorkerInfoId?.arkan?.decreaseSum}
          </p>
          <p>{data?.provinceWorkerInfoId?.arkan?.monthly}</p>
        </div>
        <div className="row">
          <p className="header">امیدواران </p>
          <p>{data?.provinceWorkerInfoId?.umeedWaran?.startSum}</p>
          <p>{data?.provinceWorkerInfoId?.umeedWaran?.increaseSum}</p>
          <p>{data?.provinceWorkerInfoId?.umeedWaran?.decreaseSum}</p>
          <p>
            {data?.provinceWorkerInfoId?.umeedWaran?.startSum +
              data?.provinceWorkerInfoId?.umeedWaran?.increaseSum -
              data?.provinceWorkerInfoId?.umeedWaran?.decreaseSum}
          </p>
          <p>{data?.provinceWorkerInfoId?.umeedWaran?.monthly}</p>
          {/* <p>Data 3</p> */}
        </div>
        <div className="row">
          <p className="header">رفقا </p>
          <p>{data?.provinceWorkerInfoId?.rafaqa?.startSum}</p>
          <p>{data?.provinceWorkerInfoId?.rafaqa?.increaseSum}</p>
          <p>{data?.provinceWorkerInfoId?.rafaqa?.decreaseSum}</p>
          <p>
            {data?.provinceWorkerInfoId?.rafaqa?.startSum +
              data?.provinceWorkerInfoId?.rafaqa?.increaseSum -
              data?.provinceWorkerInfoId?.rafaqa?.decreaseSum}
          </p>
          <p>{data?.provinceWorkerInfoId?.rafaqa?.monthly}</p>
          {/* <p>Data 3</p> */}
        </div>
        <div className="row">
          <p className="header">کارکنان </p>
          <p>{data?.provinceWorkerInfoId?.karkunan?.startSum}</p>
          <p>{data?.provinceWorkerInfoId?.karkunan?.increaseSum}</p>
          <p>{data?.provinceWorkerInfoId?.karkunan?.decreaseSum}</p>
          <p>
            {data?.provinceWorkerInfoId?.karkunan?.startSum +
              data?.provinceWorkerInfoId?.karkunan?.increaseSum -
              data?.provinceWorkerInfoId?.karkunan?.decreaseSum}
          </p>
          <p>{data?.provinceWorkerInfoId?.karkunan?.monthly}</p>
          {/* <p>Data 3</p> */}
        </div>
        <div className="row">
          <p className="header"> شاہین</p>
          <p>{data?.provinceWorkerInfoId?.shaheen?.startSum}</p>
          <p>{data?.provinceWorkerInfoId?.shaheen?.increaseSum}</p>
          <p>{data?.provinceWorkerInfoId?.shaheen?.decreaseSum}</p>
          <p>
            {data?.provinceWorkerInfoId?.shaheen?.startSum +
              data?.provinceWorkerInfoId?.shaheen?.increaseSum -
              data?.provinceWorkerInfoId?.shaheen?.decreaseSum}
          </p>
          <p>{data?.provinceWorkerInfoId?.shaheen?.monthly}</p>
          {/* <p>Data 3</p> */}
        </div>
        <div className="row">
          <p className="header">ممبرز </p>
          <p>{data?.provinceWorkerInfoId?.members?.startSum}</p>
          <p>{data?.provinceWorkerInfoId?.members?.increaseSum}</p>
          <p>{data?.provinceWorkerInfoId?.members?.decreaseSum}</p>
          <p>
            {data?.provinceWorkerInfoId?.members?.startSum +
              data?.provinceWorkerInfoId?.members?.increaseSum -
              data?.provinceWorkerInfoId?.members?.decreaseSum}
          </p>
          <p>{data?.provinceWorkerInfoId?.members?.monthly}</p>
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
          <p>{data?.provinceActivityId?.divMushawarat?.decided}</p>
          <p>{data?.provinceActivityId?.divMushawarat?.done}</p>
          <p>{data?.provinceActivityId?.divMushawarat?.averageAttendance}</p>
        </div>
        <div className="row">
          <p className="header">اجتماع ارکان</p>
          <p>{data?.provinceActivityId?.ijtArkan?.decided}</p>
          <p>{data?.provinceActivityId?.ijtArkan?.done}</p>
          <p>{data?.provinceActivityId?.ijtArkan?.averageAttendance}</p>
        </div>
        <div className="row">
          <p className="header">اجتماع ناظمین </p>
          <p>{data?.provinceActivityId?.ijtNazmeen?.decided}</p>
          <p>{data?.provinceActivityId?.ijtNazmeen?.done}</p>
          <p>{data?.provinceActivityId?.ijtNazmeen?.averageAttendance}</p>
        </div>
        <div className="row">
          <p className="header">اجتماع امیدوران </p>
          <p>{data?.provinceActivityId?.ijtUmeedwaran?.decided}</p>
          <p>{data?.provinceActivityId?.ijtUmeedwaran?.done}</p>
          <p>{data?.provinceActivityId?.ijtUmeedwaran?.averageAttendance}</p>
        </div>
        <div className="row">
          <p className="header">سٹڈی  سرکل </p>
          <p>{data?.provinceActivityId?.studyCircle?.decided}</p>
          <p>{data?.provinceActivityId?.studyCircle?.done}</p>
          <p>{data?.provinceActivityId?.studyCircle?.averageAttendance}</p>
        </div>
        <div className="row">
          <p className="header"> صدور میٹینگ</p>
          <p>{data?.provinceActivityId?.sadurMeeting?.decided}</p>
          <p>{data?.provinceActivityId?.sadurMeeting?.done}</p>
          <p>{data?.provinceActivityId?.sadurMeeting?.averageAttendance}</p>
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
          <p className="header">سٹڈی  سرکل </p>
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
     <div className="flex w-full  justify-start items-start"> <h3
        style={{  fontWeight: "bold", marginBottom: "1rem" }}
      >
        دیگر سرگرمیاں
      </h3>
      </div>
      <div
        style={{
          // display: "flex",
          // justifyContent: "flex-start",
          // alignItems: "center",
          marginBottom: "1rem",
        }}
        className="tableContainer grid grid-cols-3 gap-4"
      >
        <h6 style={{ width: "100%", textAlign: "start" }}>
          تربیت گاہ:{data?.otherActivityId?.tarbiyatGaah}
        </h6>
        <h6 style={{ width: "100%", textAlign: "start" }}>
          دعوتی وفود:{data?.otherActivityId?.dawatiWafud}
        </h6>
        <h6 style={{ width: "100%", textAlign: "start" }}>
          روابط پارٹیز:{data?.otherActivityId?.rawabitParties}
        </h6>
        <h6 style={{ width: "100%", textAlign: "start" }}>
        تربیت گاہوں کے انعقاد کی تعداد:{data?.otherActivityId?.tarbiyatGaahHeldSum}
        </h6>
        <h6 style={{ width: "100%", textAlign: "start" }}>
        تربیت گاہوں کے انعقاد کا ہدف:{data?.otherActivityId?.tarbiyatGaahGoalSum}
        </h6>
        <h6 style={{ width: "100%", textAlign: "start" }}>
          شب بیداری:{data?.otherActivityId?.shabBedari}
        </h6>
        <h6 style={{ width: "100%", textAlign: "start" }}>
          نِطام الصلوۃ:{data?.otherActivityId?.nizamSalah}
        </h6>
        <h6 style={{ width: "100%", textAlign: "start" }}>
          تنظیمی دورہ:{data?.otherActivityId?.tanzeemiRound}
        </h6>
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
        <h3 style={{ textAlign: "start", fontWeight: "bolder",marginTop:"8px" }}>توسیع دعوت</h3>
        <h3 style={{ textAlign: "start", fontWeight: "bold" }}>روابط</h3>
        <div
        className="grid grid-cols-3 gap-4"
          style={{
           
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
          ملاقاتیں :{data?.tdId?.commonStudentMeetings}
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
            کل تعداد لائبریری:{data?.provinceDivisionLibId?.totalLibraries}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کل تعداد کتب:{data?.provinceDivisionLibId?.totalBooks}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            اضافہ کتب :{data?.provinceDivisionLibId?.totalIncrease}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کمی کتب :{data?.provinceDivisionLibId?.totalDecrease}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کل اجراےَ کتب :{data?.provinceDivisionLibId?.totalBookRent}
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
