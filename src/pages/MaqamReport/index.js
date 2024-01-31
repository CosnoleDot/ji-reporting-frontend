import React, { useEffect, useState } from "react";
import "./MaqamReport.css";
import { useParams } from "react-router-dom";
import instance from "../../api/instrance";
import { PrintDocument } from "../../components";

export const MaqamReport = () => {
  const [data, setData] = useState();
  const params = useParams();
  const printReport = async (id) => {
    const req = await instance.get(`/reports/maqam/${id}`, {
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
    <div className="table " style={{ marginBottom: "2rem" }} dir="rtl">
      <PrintDocument />
      <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
        جائزہ کارکردگی رپورت برآے مقام
      </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h4 className="header"> مقام کا نام:</h4>
        <h6>
          {data?.maqamAreaId?.name}- ({data?.maqamAreaId?.province?.name})
        </h6>
        <h4 className="header">برآے ماہ:</h4>
        <h6>{data?.month.split("T")[0]}</h6>
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
        {/* <p className="header" style={{ width: "100%" }}>
          <strong>اختتام پر</strong>
        </p> */}
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
      >
        <div className="row">
          <p className="header">رہاشی حلقے</p>
          <p>{data?.maqamTanzeemId?.rehaishHalqay?.start}</p>
          <p>{data?.maqamTanzeemId?.rehaishHalqay?.increase}</p>
          <p>{data?.maqamTanzeemId?.rehaishHalqay?.decrease}</p>
          <p>{data?.maqamTanzeemId?.rehaishHalqay?.paused}</p>
          <p>{data?.maqamTanzeemId?.rehaishHalqay?.continue}</p>
        </div>
        <div className="row">
          <p className="header"> تعلیمی حلقے</p>
          <p>{data?.maqamTanzeemId?.taleemHalqay?.start}</p>
          <p>{data?.maqamTanzeemId?.taleemHalqay?.increase}</p>
          <p>{data?.maqamTanzeemId?.taleemHalqay?.decrease}</p>
          <p>{data?.maqamTanzeemId?.taleemHalqay?.paused}</p>
          <p>{data?.maqamTanzeemId?.taleemHalqay?.continue}</p>
        </div>
        <div className="row">
          <p className="header">کل حلقے</p>
          <p>{data?.maqamTanzeemId?.totalHalqay?.start}</p>
          <p>{data?.maqamTanzeemId?.totalHalqay?.increase}</p>
          <p>{data?.maqamTanzeemId?.totalHalqay?.decrease}</p>
          <p>{data?.maqamTanzeemId?.totalHalqay?.paused}</p>
          <p>{data?.maqamTanzeemId?.totalHalqay?.continue}</p>
        </div>
        <div className="row">
          <p className="header">رہاشی زیلی حلقے</p>
          <p>{data?.maqamTanzeemId?.subRehaishHalqay?.start}</p>
          <p>{data?.maqamTanzeemId?.subRehaishHalqay?.increase}</p>
          <p>{data?.maqamTanzeemId?.subRehaishHalqay?.decrease}</p>
          <p>{data?.maqamTanzeemId?.subRehaishHalqay?.paused}</p>
          <p>{data?.maqamTanzeemId?.subRehaishHalqay?.continue}</p>
        </div>
        <div className="row">
          <p className="header">تعلیمی زیلی حلقے</p>
          <p>{data?.maqamTanzeemId?.subTaleemHalqay?.start}</p>
          <p>{data?.maqamTanzeemId?.subTaleemHalqay?.increase}</p>
          <p>{data?.maqamTanzeemId?.subTaleemHalqay?.decrease}</p>
          <p>{data?.maqamTanzeemId?.subTaleemHalqay?.paused}</p>
          <p>{data?.maqamTanzeemId?.subTaleemHalqay?.continue}</p>
        </div>
        <div className="row">
          <p className="header">کل زیلی حلقے</p>
          <p>{data?.maqamTanzeemId?.subTotalHalqay?.start}</p>
          <p>{data?.maqamTanzeemId?.subTotalHalqay?.increase}</p>
          <p>{data?.maqamTanzeemId?.subTotalHalqay?.decrease}</p>
          <p>{data?.maqamTanzeemId?.subTotalHalqay?.paused}</p>
          <p>{data?.maqamTanzeemId?.subTotalHalqay?.continue}</p>
        </div>

        <div className="row">
          <p className="header" style={{ fontSize: "12px" }}>
            بزم کے سکول یونٹس
          </p>
          <p>{data?.maqamTanzeemId?.busmSchoolUnits?.start}</p>
          <p>{data?.maqamTanzeemId?.busmSchoolUnits?.increase}</p>
          <p>{data?.maqamTanzeemId?.busmSchoolUnits?.decrease}</p>
          <p>{data?.maqamTanzeemId?.busmSchoolUnits?.paused}</p>
          <p>{data?.maqamTanzeemId?.busmSchoolUnits?.continue}</p>
        </div>
        <div className="row">
          <p className="header">بزم کے رہاشی یونٹس</p>
          <p>{data?.maqamTanzeemId?.busmRehaishUnits?.start}</p>
          <p>{data?.maqamTanzeemId?.busmRehaishUnits?.increase}</p>
          <p>{data?.maqamTanzeemId?.busmRehaishUnits?.decrease}</p>
          <p>{data?.maqamTanzeemId?.busmRehaishUnits?.paused}</p>
          <p>{data?.maqamTanzeemId?.busmRehaishUnits?.continue}</p>
        </div>
        <div className="row">
          <p className="header">بزم کے کل یونٹس</p>
          <p>{data?.maqamTanzeemId?.busmTotalUnits?.start}</p>
          <p>{data?.maqamTanzeemId?.busmTotalUnits?.increase}</p>
          <p>{data?.maqamTanzeemId?.busmTotalUnits?.decrease}</p>
          <p>{data?.maqamTanzeemId?.busmTotalUnits?.paused}</p>
          <p>{data?.maqamTanzeemId?.busmTotalUnits?.continue}</p>
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
        {/* <p className="header" style={{ width: "100%" }}>
          <strong>اختتام پر</strong>
        </p> */}
        <p className="header" style={{ width: "100%" }}>
          <strong>سلانہ ہدف</strong>
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "2rem",
        }}
      >
        <div className="row">
          <p className="header">ارکان</p>
          <p>{data?.wiId?.arkan?.start}</p>
          <p>{data?.wiId?.arkan?.increase}</p>
          <p>{data?.wiId?.arkan?.decrease}</p>
          <p>{data?.wiId?.arkan?.annual}</p>
          {/* <p>{data?.wiId?.arkan?.}</p> */}
        </div>
        <div className="row">
          <p className="header">امیدواران </p>
          <p>{data?.wiId?.umeedWaran?.start}</p>
          <p>{data?.wiId?.umeedWaran?.increase}</p>
          <p>{data?.wiId?.umeedWaran?.decrease}</p>
          <p>{data?.wiId?.umeedWaran?.annual}</p>
          {/* <p>Data 3</p> */}
        </div>
        <div className="row">
          <p className="header">رفقا </p>
          <p>{data?.wiId?.rafaqa?.start}</p>
          <p>{data?.wiId?.rafaqa?.increase}</p>
          <p>{data?.wiId?.rafaqa?.decrease}</p>
          <p>{data?.wiId?.rafaqa?.annual}</p>
          {/* <p>Data 3</p> */}
        </div>
        <div className="row">
          <p className="header">کارکنان </p>
          <p>{data?.wiId?.karkunan?.start}</p>
          <p>{data?.wiId?.karkunan?.increase}</p>
          <p>{data?.wiId?.karkunan?.decrease}</p>
          <p>{data?.wiId?.karkunan?.annual}</p>
          {/* <p>Data 3</p> */}
        </div>
        <div className="row">
          <p className="header"> شاہین</p>
          <p>{data?.wiId?.shaheen?.start}</p>
          <p>{data?.wiId?.shaheen?.increase}</p>
          <p>{data?.wiId?.shaheen?.decrease}</p>
          <p>{data?.wiId?.shaheen?.annual}</p>
          {/* <p>Data 3</p> */}
        </div>
        <div className="row">
          <p className="header">ممبرز </p>
          <p>{data?.wiId?.members?.start}</p>
          <p>{data?.wiId?.members?.increase}</p>
          <p>{data?.wiId?.members?.decrease}</p>
          <p>{data?.wiId?.members?.annual}</p>
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
        <p className="header">
          <strong>مرتب</strong>
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "2rem",
        }}
      >
        <div className="row">
          <p className="header">اجتمع ارکان</p>
          <p>{data?.maqamActivityId?.ijtArkan?.decided}</p>
          <p>{data?.maqamActivityId?.ijtArkan?.done}</p>
          <p>{data?.maqamActivityId?.ijtArkan?.averageAttendance}</p>
          <p>{data?.maqamActivityId?.ijtArkan?.registered ? "ہاں" : "نہیں"}</p>
        </div>
        <div className="row">
          <p className="header">سٹدی سرکل </p>
          <p>{data?.maqamActivityId?.studyCircle?.decided}</p>
          <p>{data?.maqamActivityId?.studyCircle?.done}</p>
          <p>{data?.maqamActivityId?.studyCircle?.averageAttendance}</p>
          <p>
            {data?.maqamActivityId?.studyCircle?.registered ? "ہاں" : "نہیں"}
          </p>
        </div>
        <div className="row">
          <p className="header">اجتمعِ ناظمیں </p>
          <p>{data?.maqamActivityId?.ijtNazmeen?.decided}</p>
          <p>{data?.maqamActivityId?.ijtNazmeen?.done}</p>
          <p>{data?.maqamActivityId?.ijtNazmeen?.averageAttendance}</p>
          <p>
            {data?.maqamActivityId?.ijtNazmeen?.registered ? "ہاں" : "نہیں"}
          </p>
        </div>
        <div className="row">
          <p className="header">اجتمعِ امیدوران </p>
          <p>{data?.maqamActivityId?.ijtUmeedwaran?.decided}</p>
          <p>{data?.maqamActivityId?.ijtUmeedwaran?.done}</p>
          <p>{data?.maqamActivityId?.ijtUmeedwaran?.averageAttendance}</p>
          <p>
            {data?.maqamActivityId?.ijtUmeedwaran?.registered ? "ہاں" : "نہیں"}
          </p>
        </div>
        <div className="row">
          <p className="header"> صدور میٹینگ</p>
          <p>{data?.maqamActivityId?.sadurMeeting?.decided}</p>
          <p>{data?.maqamActivityId?.sadurMeeting?.done}</p>
          <p>{data?.maqamActivityId?.sadurMeeting?.averageAttendance}</p>
          <p>
            {data?.maqamActivityId?.sadurMeeting?.registered ? "ہاں" : "نہیں"}
          </p>
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
      >
        <div className="row">
          <p className="header">اجتمع رفقا</p>
          <p>{data?.mentionedActivityId?.ijtRafaqa?.decided}</p>
          <p>{data?.mentionedActivityId?.ijtRafaqa?.done}</p>
          <p>{data?.mentionedActivityId?.ijtRafaqa?.averageAttendance}</p>
        </div>
        <div className="row">
          <p className="header">سٹدی سرکل </p>
          <p>{data?.mentionedActivityId?.studyCircle?.decided}</p>
          <p>{data?.mentionedActivityId?.studyCircle?.done}</p>
          <p>{data?.mentionedActivityId?.studyCircle?.averageAttendance}</p>
        </div>
        <div className="row">
          <p className="header">اجتمعِ کارکنان </p>
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
      <h3
        style={{ textAlign: "start", fontWeight: "bold", marginBottom: "1rem" }}
      >
        دیگر سرگرمیاں
      </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
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
        <h6 style={{ width: "100%", textAlign: "start" }}>
          تربیت گاہ:{data?.otherActivityId?.tarbiyatGaah}
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
        <h3>کوئی اور سرگرمی:</h3>
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
      >
        <h3 style={{ textAlign: "start", fontWeight: "bolder" }}>توسیع دعوت</h3>
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
            موجودہ :{data?.tdId?.current}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            ملاقاتیں:{data?.tdId?.meetings}
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
            کل تعداد لائبریری:{data?.maqamDivisionLibId?.totalLibraries}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کل تعداد کتب:{data?.maqamDivisionLibId?.totalBooks}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            اضافہ کتب :{data?.maqamDivisionLibId?.totalIncrease}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کمی کتب :{data?.maqamDivisionLibId?.totalDecrease}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کل اجرآے کتب :{data?.maqamDivisionLibId?.totalBookRent}
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
            کل موصولہ :{data?.paighamDigestId?.totalReceived}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            فروخت کردہ :{data?.paighamDigestId?.totalSold}
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
            کتنے ارکان فل کرتے ہیں :{data?.rsdId?.arkanFilled}
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
