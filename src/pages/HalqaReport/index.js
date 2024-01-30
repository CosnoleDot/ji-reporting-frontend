import React, { useEffect, useState } from "react";
import "./HalqaReport.css";
import instance from "../../api/instrance";
import { useParams } from "react-router-dom";
export const HalqaReport = () => {
  const [data, setData] = useState();
  const params = useParams();
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

  return (
    <div className="table " style={{ marginBottom: "2rem" }} dir="rtl">
      <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
        جائزہ کارکردگی رپورت برآے حلقہ
      </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h4 className="header"> حلقہ کا نام:</h4>
        <h6>
          {data?.halqaAreaId?.name}
          {data?.halqaAreaId?.parentType}
        </h6>
        <h4 className="header">برآے ماہ:</h4>
        <h6>{data?.month}</h6>
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
        </div>
        <div className="row">
          <p className="header">امیدواران </p>
          <p>{data?.wiId?.umeedWaran?.start}</p>
          <p>{data?.wiId?.umeedWaran?.increase}</p>
          <p>{data?.wiId?.umeedWaran?.decrease}</p>
          <p>{data?.wiId?.umeedWaran?.annual}</p>
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
        <p className="header" style={{ width: "100%" }}>
          <strong>مرتب/غیرمرتب </strong>
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
          <p className="header">اجتمع کارکنان</p>
          <p>{data?.halqaActivityId?.ijtKarkunan?.completed}</p>
          <p>{data?.halqaActivityId?.ijtKarkunan?.decided}</p>
          <p>{data?.halqaActivityId?.ijtKarkunan?.attendance}</p>
          <p>{data?.halqaActivityId?.ijtKarkunan?.title}</p>
          <p>
            {data?.halqaActivityId?.ijtKarkunan?.registered ? "ہاں" : "نہیں"}
          </p>
        </div>
        <div className="row">
          <p className="header">سٹدی سرکل </p>
          <p>{data?.halqaActivityId?.studyCircle?.completed}</p>
          <p>{data?.halqaActivityId?.studyCircle?.decided}</p>
          <p>{data?.halqaActivityId?.studyCircle?.attendance}</p>
          <p>{data?.halqaActivityId?.studyCircle?.title}</p>
          <p>
            {data?.halqaActivityId?.studyCircle?.registered ? "ہاں" : "نہیں"}
          </p>
        </div>
        <div className="row">
          <p className="header">اجتمعِ رفقا </p>
          <p>{data?.halqaActivityId?.ijtRafaqa?.completed}</p>
          <p>{data?.halqaActivityId?.ijtRafaqa?.decided}</p>
          <p>{data?.halqaActivityId?.ijtRafaqa?.attendance}</p>
          <p>{data?.halqaActivityId?.ijtRafaqa?.title}</p>
          <p>{data?.halqaActivityId?.ijtRafaqa?.registered ? "ہاں" : "نہیں"}</p>
        </div>
        <div className="row">
          <p className="header">درسِ قرآن </p>
          <p>{data?.halqaActivityId?.darseQuran?.completed}</p>
          <p>{data?.halqaActivityId?.darseQuran?.decided}</p>
          <p>{data?.halqaActivityId?.darseQuran?.attendance}</p>
          <p>{data?.halqaActivityId?.darseQuran?.title}</p>
          <p>
            {data?.halqaActivityId?.darseQuran?.registered ? "ہاں" : "نہیں"}
          </p>
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
          <h6 style={{ width: "100%", textAlign: "start" }}>
            روابط رجسٹر مرتب:{data?.tdId?.registered ? "ہاں" : "نہیں"}
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
            تعداد کتب :{data?.halqaLibId?.books}
          </h6>

          <h6 style={{ width: "100%", textAlign: "start" }}>
            اضافہ :{data?.halqaLibId?.increase}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کمی :{data?.halqaLibId?.decrease}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            اجرآے کتب :{data?.halqaLibId?.bookRent}
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            لائبریری رجسٹر مرتب :{data?.halqaLibId?.registered ? "ہاں" : "نہیں"}
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
