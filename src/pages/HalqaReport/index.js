import React from "react";
import "./HalqaReport.css";
export const HalqaReport = () => {
  const getHalqaReport = () => {};
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
        <h4 className="header"> حلقہ کا نام: </h4>
        <h4 className="header">برآے ماہ:</h4>
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
          <p>Data 2</p>
          <p>Data 3</p>
          <p>Data 3</p>
          <p>Data 3</p>
          <p>Data 3</p>
        </div>
        <div className="row">
          <p className="header">امیدواران </p>
          <p>Data 2</p>
          <p>Data 3</p>
          <p>Data 3</p>
          <p>Data 3</p>
          <p>Data 3</p>
        </div>
        <div className="row">
          <p className="header">رفقا </p>
          <p>Data 2</p>
          <p>Data 3</p>
          <p>Data 3</p>
          <p>Data 3</p>
          <p>Data 3</p>
        </div>
        <div className="row">
          <p className="header">کارکنان </p>
          <p>Data 2</p>
          <p>Data 3</p>
          <p>Data 3</p>
          <p>Data 3</p>
          <p>Data 3</p>
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
      >
        <div className="row">
          <p className="header">اجتمع کارکنان</p>
          <p>Data 2</p>
          <p>Data 3</p>
          <p>Data 3</p>
        </div>
        <div className="row">
          <p className="header">سٹدی سرکل </p>
          <p>Data 2</p>
          <p>Data 3</p>
          <p>Data 3</p>
        </div>
        <div className="row">
          <p className="header">اجتمعِ رفقا </p>
          <p>Data 2</p>
          <p>Data 3</p>
          <p>Data 3</p>
        </div>
        <div className="row">
          <p className="header">درسِ قرآن </p>
          <p>Data 2</p>
          <p>Data 3</p>
          <p>Data 3</p>
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
        <h6 style={{ width: "100%", textAlign: "start" }}>دعوتی وفود:</h6>
        <h6 style={{ width: "100%", textAlign: "start" }}>روابط پارٹیز:</h6>
        <h6 style={{ width: "100%", textAlign: "start" }}>شب بیداری:</h6>
        <h6 style={{ width: "100%", textAlign: "start" }}> حدیث سرکل:</h6>
        <h6 style={{ width: "100%", textAlign: "start" }}>نِطام الصلوۃ:</h6>
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
        <h6></h6>
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
          <h6 style={{ width: "100%", textAlign: "start" }}> طے شدہ:</h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>موجودہ :</h6>
          <h6 style={{ width: "100%", textAlign: "start" }}> ملاقاتیں:</h6>
          <h6 style={{ width: "100%", textAlign: "start" }}> تقسیم لٹریچر:</h6>
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
          <h6 style={{ width: "100%", textAlign: "start" }}> ملاقاتیں:</h6>
          <h6 style={{ width: "100%", textAlign: "start" }}> تقسیم لٹریچر:</h6>
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
          <h6 style={{ width: "100%", textAlign: "start" }}>تعداد کتب :</h6>

          <h6 style={{ width: "100%", textAlign: "start" }}> اضافہ :</h6>
          <h6 style={{ width: "100%", textAlign: "start" }}> کمی :</h6>
          <h6 style={{ width: "100%", textAlign: "start" }}> اجرآے کتب :</h6>
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
            کتنے امیدوران فل کرتے ہیں :
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کتنے ارکان فل کرتے ہیں :
          </h6>
          <h6 style={{ width: "100%", textAlign: "start" }}>
            کتنےرفقا فل کرتے ہیں :
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
          <h6></h6>
        </div>
      </div>
    </div>
  );
};
