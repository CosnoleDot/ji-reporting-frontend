import React, { useContext, useEffect, useState } from "react";
import "./HalqaReport.css";
import instance from "../../api/instrance";
import { useParams } from "react-router-dom";
import { PrintDocument } from "../../components";
import { CompileReportContext, MaqamContext, TehsilContext } from "../../context";
export const HalqaReport = () => {
  const [data, setData] = useState();
  const params = useParams();
  const compileReport = useContext(CompileReportContext);
  const maqams = useContext(MaqamContext);
  const tehsils = useContext(TehsilContext);
  const printReport = async (id) => {
    const req = await instance.get(`/reports/halqa/${id}`, {
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
   useEffect(()=>{
    let url = window.location.pathname.split('/')[2];
    if(url==="compile"){
      setData(compileReport);
    }
   })
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
            {data?.halqaAreaId?.name}( {getAreaType(data?.halqaAreaId)})
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
          <h6>{data?.month.split("T")[0]}</h6>
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
          <p>{data?.wiId?.arkan?.start}</p>
          <p>{data?.wiId?.arkan?.increase}</p>
          <p>{data?.wiId?.arkan?.decrease}</p>
          <p>
            {data?.wiId?.arkan?.start +
              data?.wiId?.arkan?.increase -
              data?.wiId?.arkan?.decrease}
          </p>
          <p>{data?.wiId?.arkan?.monthly}</p>
        </div>
        <div className="row">
          <p className="header">امیدواران </p>
          <p>{data?.wiId?.umeedWaran?.start}</p>
          <p>{data?.wiId?.umeedWaran?.increase}</p>
          <p>{data?.wiId?.umeedWaran?.decrease}</p>
          <p>
            {data?.wiId?.umeedWaran?.start +
              data?.wiId?.umeedWaran?.increase -
              data?.wiId?.umeedWaran?.decrease}
          </p>
          <p>{data?.wiId?.umeedWaran?.monthly}</p>
        </div>
        <div className="row">
          <p className="header">رفقا </p>
          <p>{data?.wiId?.rafaqa?.start}</p>
          <p>{data?.wiId?.rafaqa?.increase}</p>
          <p>{data?.wiId?.rafaqa?.decrease}</p>
          <p>
            {data?.wiId?.rafaqa?.start +
              data?.wiId?.rafaqa?.increase -
              data?.wiId?.rafaqa?.decrease}
          </p>
          <p>{data?.wiId?.rafaqa?.monthly}</p>
          {/* <p>Data 3</p> */}
        </div>
        <div className="row">
          <p className="header">کارکنان </p>
          <p>{data?.wiId?.karkunan?.start}</p>
          <p>{data?.wiId?.karkunan?.increase}</p>
          <p>{data?.wiId?.karkunan?.decrease}</p>
          <p>
            {data?.wiId?.karkunan?.start +
              data?.wiId?.karkunan?.increase -
              data?.wiId?.karkunan?.decrease}
          </p>
          <p>{data?.wiId?.karkunan?.monthly}</p>
          {/* <p>Data 3</p> */}
        </div>
      </div>
      <div className="flex w-full p-4 gap-4 text-xl justify-end items-center mb-4">
        <h2 className="ml-4">
          <strong className="ml-4">کاروائ رجسٹر </strong>
        </h2>
        <input
          type="checkbox"
          className="w-8 mr-4 h-8"
          checked={data?.halqaActivityId?.ijtRafaqa?.registered ? true : false}
        />
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
        <p className="header" style={{ width: "100%" }}>
          <strong>عنوان </strong>
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
          <p>{data?.halqaActivityId?.ijtKarkunan?.decided}</p>
          <p>{data?.halqaActivityId?.ijtKarkunan?.completed}</p>
          <p>{data?.halqaActivityId?.ijtKarkunan?.attendance}</p>
          <p>{data?.halqaActivityId?.ijtKarkunan?.title}</p>
        </div>
        <div className="row">
          <p className="header">سٹڈی سرکل </p>
          <p>{data?.halqaActivityId?.studyCircle?.decided}</p>
          <p>{data?.halqaActivityId?.studyCircle?.completed}</p>
          <p>{data?.halqaActivityId?.studyCircle?.attendance}</p>
          <p>{data?.halqaActivityId?.studyCircle?.title}</p>
        </div>
        <div className="row">
          <p className="header">اجتماعِ رفقا </p>
          <p>{data?.halqaActivityId?.ijtRafaqa?.decided}</p>
          <p>{data?.halqaActivityId?.ijtRafaqa?.completed}</p>
          <p>{data?.halqaActivityId?.ijtRafaqa?.attendance}</p>
          <p>{data?.halqaActivityId?.ijtRafaqa?.title}</p>
        </div>
        <div className="row">
          <p className="header">درسِ قرآن </p>
          <p>{data?.halqaActivityId?.darseQuran?.decided}</p>
          <p>{data?.halqaActivityId?.darseQuran?.completed}</p>
          <p>{data?.halqaActivityId?.darseQuran?.attendance}</p>
          <p>{data?.halqaActivityId?.darseQuran?.title}</p>
        </div>
        <div className="row">
          <p className="header"> شاہین میٹینگ</p>
          <p>{data?.halqaActivityId?.shaheenMeeting?.decided}</p>
          <p>{data?.halqaActivityId?.shaheenMeeting?.completed}</p>
          <p>{data?.halqaActivityId?.shaheenMeeting?.attendance}</p>
          <p>{data?.halqaActivityId?.shaheenMeeting?.title}</p>
        </div>
        <div className="row">
          <p className="header"> پیغام محفل</p>
          <p>{data?.halqaActivityId?.paighamEvent?.decided}</p>
          <p>{data?.halqaActivityId?.paighamEvent?.completed}</p>
          <p>{data?.halqaActivityId?.paighamEvent?.attendance}</p>
          <p>{data?.halqaActivityId?.paighamEvent?.title}</p>
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
        className="tableContainer"
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
          حدیث سرکل:{data?.otherActivityId?.hadithCircle}
        </h6>
        <h6 style={{ width: "100%", textAlign: "start" }}>
          نِطام الصلوۃ:{data?.otherActivityId?.nizamSalah}
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
            موجودہ :{data?.tdId?.current}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            روابط سے ملاقاتوں کا ہدف:{data?.tdId?.rwabitMeetingsGoal}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            ملاقاتوں کی تعداد:{data?.tdId?.meetings}
          </h6>

          <h6 style={{ width: "100%", textAlign: "start" }}>
            تقسیم لٹریچر:{data?.tdId?.literatureDistribution}
          </h6>

          <h6 style={{ width: "100%", textAlign: "start", display: "flex" }}>
            روابط رجسٹر مرتب:
            <input
              type="checkbox"
              className="w-8 mr-4 h-8"
              checked={data?.tdId?.registered ? true : false}
            />
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
            ملاقاتوں کی تعداد:{data?.tdId?.commonStudentMeetings}
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
            marginTop: "8px",
          }}
        >
          <h6 style={{ width: "100%", textAlign: "start" }}>
            تعداد کتب :{data?.halqaLibId?.books}
          </h6>

          <h6 style={{ width: "100%", textAlign: "start" }}>
            اضافہ :{data?.halqaLibId?.increase}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کمی :{data?.halqaLibId?.decrease}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            اجراےَ کتب :{data?.halqaLibId?.bookRent}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            لائبریری رجسٹر مرتب :
            <input
              type="checkbox"
              className="w-8 mr-4 h-8"
              checked={data?.halqaLibId?.registered ? true : false}
            />
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
            ماہانہ آمدن:{data?.baitulmalId?.monthlyIncome}
          </h6>

          <h6 style={{ width: "100%", textAlign: "start" }}>
            ماہانہ خرچ:{data?.baitulmalId?.monthlyExpenditure}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            بدست:{data?.baitulmalId?.savings}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            خسارہ:{data?.baitulmalId?.loss}
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
          className="tableContainer"
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
