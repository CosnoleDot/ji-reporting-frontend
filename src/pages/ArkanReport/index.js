/* eslint-disable react/style-prop-object */

import { useEffect, useState } from "react";
import instance from "../../api/instrance";
import { useParams } from "react-router-dom";
import { PrintDocument } from "../../components";

export const ArkanReport = () => {
  const [data, setData] = useState();
  const params = useParams();
  const printReport = async (id) => {
    const req = await instance.get(`/umeedwar/${id}`, {
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
    <div className="containerPrint" dir="rtl">
      <PrintDocument />
      <h1>رپورٹ خاکہ</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <h2>رپورٹ برائے ماہ:</h2>
        <p
          type="month"
          name="month"
          id="month"
          style={{ border: "none", borderBottom: "1px dotted black" }}
          readonly
        >
          {data?.month.split("T")[0]}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          gap: "20px",
          width: "100%",
          marginBottom:'20px'
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "start",
            justifyContent: " start",
            width: "100%",
          }}
        >
          <p>نام:</p>
          <p
            style={{
              border: "none",
              borderBottom: "1px dotted black",
            }}
            readonly
            id="name"
            name="name"
          >
            {data?.userId?.name}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: " start",
            width: "100%",

          }}
        >
          <p>جمعیت سے تعلق:</p>
          <p
            style={{
              border: "none",
              borderBottom: "1px dotted black",
            }}
            readonly
            id="JamiatRelation"
            name="JamiatRelation"
          >
            {data?.userId.nazimType}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: " center",
            width: "100%",

          }}
        >
          <p>تنظیمی تعلق:</p>
          <p
            id="organizationRelation"
            name="organizationRelation"
            style={{
              border: "none",
              borderBottom: "1px dotted black"
            }}
            readonly
          >
            {data?.userId.nazimType}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <p>
          اس ماہ میں کوئی خصوصی مصروفیت جس کی وجہ سے آپ کی روٹین متاثر ہوئی ہو:
        </p>
        <p
          style={{
            border: "none",
            borderBottom: "1px dotted black",
            width: "100%",
          }}
          readonly
          id="disturbingRoutine"
          name="disturbingRoutine"
        >
          {data?.disturbingRoutine}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <h2>نمازیں:</h2>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <h4 style={{ width: "100px" }}>نمازِ فجر</h4>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: " flex",
            alignItems: " center",
            justifyContent: " flex-start",
          }}
        >
          <p>کل تعداد:</p>
          <p
            style={{
              border: "none",
              borderBottom: "1px dotted black",
              width: "100px",
            }}
            readonly
            id="fajarTotal"
          >
            {data?.prayersId.namazFajar.fajarTotal}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: " center",
          }}
        >
          <p>باجماعت:</p>
          <p
            style={{
              border: "none",
              borderBottom: "1px dotted black",
              width: "100px",
            }}
            readonly
            id="fajarOnTime"
          >
            {data?.prayersId.namazFajar.fajarOnTime}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: " center",
          }}
        >
          <p>انفرادی:</p>
          <p
            style={{
              border: "none",
              borderBottom: "1px dotted black",
              width: "100px",
            }}
            readonly
            id="fajarInfradi"
          >
            {data?.prayersId.namazFajar.fajarInfradi}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: " center",
          }}
        >
          <p>قضا:</p>
          <p
            style={{
              border: "none",
              borderBottom: "1px dotted black",
              width: "100px",
            }}
            readonly
            id="fajarQaza"
          >
            {data?.prayersId.namazFajar.fajarQaza}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <h4 style={{ width: "100px" }}>دیگر نمازیں</h4>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "20px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: " 100%",
          }}
        >
          <p>کل تعداد:</p>
          <p
            style={{
              border: "none",
              borderBottom: "1px dotted black",
              width: "100%",
            }}
            readonly
            id="otherPrayersTotal"
          >
            {data?.prayersId.otherNamaz.otherPrayersTotal}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: " 100%",
          }}
        >
          <p>باجماعت:</p>
          <p
            style={{
              border: "none",
              borderBottom: "1px dotted black",
              width: "100%",
            }}
            readonly
            id="otherPrayersOnTime"
          >
            {data?.prayersId.otherNamaz.otherPrayersOnTime}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <p>انفرادی:</p>
          <p
            style={{
              border: "none",
              borderBottom: "1px dotted black",
              width: "100px",
            }}
            readonly
            id="otherPrayersInfradi"
          >
            {data?.prayersId.otherNamaz.otherPrayersInfradi}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: " 100%",
          }}
        >
          <p>قضا:</p>
          <p
            style={{
              border: "none",
              borderBottom: "1px dotted black",
              width: "100px",
            }}
            readonly
            id="otherPrayersQaza"
          >
            {data?.prayersId.otherNamaz.otherPrayersQaza}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: " column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <h2>مطالعہ جات:</h2>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h4 style={{ width: "240px" }}>قرآن کی تفسیر</h4>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <p>کل کتنے دن پڑھی:</p>
          <p
            style={{ border: "none", borderBottom: "1px dotted black" }}
            readonly
            id="tafseerTotalDays"
          >
            {data?.studiesId?.tafseerQuran?.tafseerTotalDays}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <p>کون سی سورۃ پڑھی:</p>
          <p
            style={{ border: "none", borderBottom: "1px dotted black" }}
            readonly
            id="tafseerSurah"
          >
            {data?.studiesId?.tafseerQuran?.tafseerSurah}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <p>کل کتنے رکوع پڑھے:</p>
        <p
          style={{
            border: "none",
            borderBottom: "1px dotted black",
            width: "100%",
          }}
          readonly
          id="tafseerTotalRakoo"
        >
          {data?.studiesId?.tafseerQuran?.tafseerTotalRakoo}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h4 style={{ width: "240px" }}>حدیث</h4>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <p>کل کتنے دن پڑھی:</p>
          <p
            style={{ border: "none", borderBottom: "1px dotted black" }}
            readonly
            id="ahdeesTotalDays"
          >
            {data?.studiesId.ahdees?.ahdeesTotalDays}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <p>کون سی ب سے پڑھی:</p>
          <p
            style={{ border: "none", borderBottom: "1px dotted black" }}
            readonly
            id="ahdeesBook"
          >
            {data?.studiesId.ahdees?.ahdeesBook}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h4 style={{ width: "240px" }}>لٹریچر</h4>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <p>کل کتنے دن پڑھا:</p>
          <p
            style={{ border: "none", borderBottom: "1px dotted black" }}
            readonly
            id="litratureTotalDays"
          >
            {data?.studiesId.litrature?.litratureTotalDays}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <p>کون سی ب پڑھی:</p>
          <p
            style={{ border: "none", borderBottom: "1px dotted black" }}
            readonly
            id="litratureBook"
          >
            {data?.studiesId.litrature?.litratureBook}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h4 style={{ width: "240px" }}>کورس</h4>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <p>تعلیمی ادارے میں حاضری کتنے دن رہی:</p>
          <p
            style={{ border: "none", borderBottom: "1px dotted black" }}
            readonly
            id="institutionAttendance"
          >
            {data?.studiesId?.institutionAttendance}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h4 style={{ width: "240px" }}>حفظ</h4>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <p>کل کتنے دن کیا:</p>
          <p
            style={{ border: "none", borderBottom: "1px dotted black" }}
            readonly
            id="hifzTotalDays"
          >
            {data?.studiesId?.hifz?.hifzTotalDays}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <p>کون سی سورۃ حفظ کی:</p>
          <p
            style={{ border: "none", borderBottom: "1px dotted black" }}
            readonly
            id="hifzSurah
              "
          >
            {data?.studiesId?.hifz?.hifzSurah}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <h2>اطاعتِ نظم:</h2>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <p id="attended">
          اجتماعِ امیدواران میں شرکت:{data?.itaatNazmId?.attended}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <p id="attendedStudyCircle">
          سٹڈی سرکل میں شرکت:{data?.itaatNazmId?.attendedStudyCircle}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <p id="aanat">اعانت:{data?.itaatNazmId?.aanat} </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <h2>توسیعِ دعوت: {data?.aanat}</h2>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <h3>ربط نمبر01</h3>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <p>نام:</p>
          <p
            style={{ border: "none", borderBottom: "1px dotted black" }}
            readonly
            id="rbt1Name"
          >
            {data?.toseeDawaId?.rawabit[0]?.name}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <p>موبائل نمبر:</p>
          <p
            style={{ border: "none", borderBottom: "1px dotted black" }}
            readonly
            id="rbt1mobile"
          >
            {data?.toseeDawaId?.rawabit[0]?.mobile}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <p>اس ماہ اس ربط سے کتنی ملاقاتیں کیں:</p>
        <p
          style={{ border: "none", borderBottom: "1px dotted black" }}
          readonly
          id="rbt1totalVisitings"
        >
          {data?.toseeDawaId?.rawabit[0]?.totalVisitings}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <p>اس ماہ کون سی کتاب پڑھائی:</p>
        <p
          style={{ border: "none", borderBottom: "1px dotted black" }}
          readonly
          id="rbt1bookRead"
        >
          {data?.toseeDawaId?.rawabit[0]?.bookRead}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <p>اس ماہ کون سی سورۃ کی تفسیر پڑھائی:</p>
        <p
          style={{ border: "none", borderBottom: "1px dotted black" }}
          readonly
          id="rbt1surahTafseer"
        >
          {data?.toseeDawaId?.rawabit[0]?.surahTafseer}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <p>اس ماہ کون سی سورۃ حفظ کروائیی:</p>
        <p
          style={{ border: "none", borderBottom: "1px dotted black" }}
          readonly
          id="rbt1surahHifz"
        >
          {data?.toseeDawaId?.rawabit[0]?.surahHifz}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <p>
          اس ماہ جمعیت کے کون کون سے پروگرامات میں شریک کروایا؟ (پروگرامات کے
          نام لکھیں)
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          gap: "20px",
        }}
      >
        {data?.toseeDawaId?.rawabit[0]?.programs?.map((program, index) => (
          <p
            key={index}
            style={{ border: "none", borderBottom: "1px dotted black" }}
            readonly
          >
            {program}
          </p>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <p>اس ماہ کی نمازوں کی صورتحال کیسی رہی؟</p>
        <p
          style={{ border: "none", borderBottom: "1px dotted black" }}
          readonly
          id="rbt1namazCondition"
        >
          {data?.toseeDawaId?.rawabit[0]?.namazCondition}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <h3>ربط نمبر02</h3>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <p>نام:</p>
          <p
            style={{ border: "none", borderBottom: "1px dotted black" }}
            readonly
            id="rbt2name"
          >
            {data?.toseeDawaId?.rawabit[1]?.name}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <p>موبائل نمبر:</p>
          <p
            style={{ border: "none", borderBottom: "1px dotted black" }}
            readonly
            id="rbt2mobile"
          >
            {data?.toseeDawaId?.rawabit[1]?.mobile}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <p>اس ماہ اس ربط سے کتنی ملاقاتیں کیں:</p>
        <p
          style={{ border: "none", borderBottom: "1px dotted black" }}
          readonly
          id="rbt2totalVisitings"
        >
          {data?.toseeDawaId?.rawabit[1]?.totalVisitings}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <p>اس ماہ کون سی کتاب پڑھائی:</p>
        <p
          style={{ border: "none", borderBottom: "1px dotted black" }}
          readonly
          id="rbt2bookRead"
        >
          {data?.toseeDawaId?.rawabit[1]?.bookRead}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <p>اس ماہ کون سی سورۃ کی تفسیر پڑھائی:</p>
        <p
          style={{ border: "none", borderBottom: "1px dotted black" }}
          readonly
          id="rbt2surahTafseer"
        >
          {data?.toseeDawaId?.rawabit[1]?.surahTafseer}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <p>اس ماہ کون سی سورۃ حفظ کروائیی:</p>
        <p
          style={{ border: "none", borderBottom: "1px dotted black" }}
          readonly
          id="rbt2surahHifz"
        >
          {data?.toseeDawaId?.rawabit[1]?.surahHifz}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <p>
          اس ماہ جمعیت کے کون کون سے پروگرامات میں شریک کروایا؟ (پروگرامات کے
          نام لکھیں)
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          gap: "20px",
        }}
      >
        {data?.toseeDawaId?.rawabit[1]?.programs?.map((program, index) => (
          <p
            key={index}
            style={{ border: "none", borderBottom: "1px dotted black" }}
            readonly
          >
            {program}
          </p>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <p>اس ماہ کی نمازوں کی صورتحال کیسی رہی؟</p>
        <p
          style={{ border: "none", borderBottom: "1px dotted black" }}
          readonly
          id="rbt2namazCondition"
        >
          {data?.toseeDawaId?.rawabit[1]?.namazCondition}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <h3>ربط نمبر03</h3>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <p>نام:</p>
          <p
            style={{ border: "none", borderBottom: "1px dotted black" }}
            readonly
            id="rbt3name"
          >
            {data?.toseeDawaId?.rawabit[2]?.name}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <p>موبائل نمبر:</p>
          <p
            style={{ border: "none", borderBottom: "1px dotted black" }}
            readonly
            id="rbt3mobile"
          >
            {data?.toseeDawaId?.rawabit[2]?.mobile}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <p>اس ماہ اس ربط سے کتنی ملاقاتیں کیں:</p>
        <p
          style={{ border: "none", borderBottom: "1px dotted black" }}
          readonly
          id="rbt3totalVisitings"
        >
          {data?.toseeDawaId?.rawabit[2]?.totalVisitings}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <p>اس ماہ کون سی کتاب پڑھائی:</p>
        <p
          style={{ border: "none", borderBottom: "1px dotted black" }}
          readonly
          id="rbt3bookRead"
        >
          {data?.toseeDawaId?.rawabit[2]?.bookRead}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <p>اس ماہ کون سی سورۃ کی تفسیر پڑھائی:</p>
        <p
          style={{ border: "none", borderBottom: "1px dotted black" }}
          readonly
          id="rbt3surahTafseer"
        >
          {data?.toseeDawaId?.rawabit[2]?.surahTafseer}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <p>اس ماہ کون سی سورۃ حفظ کروائیی:</p>
        <p
          style={{ border: "none", borderBottom: "1px dotted black" }}
          readonly
          id="rbt3surahHifz"
        >
          {data?.toseeDawaId?.rawabit[2]?.surahHifz}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <p>
          اس ماہ جمعیت کے کون کون سے پروگرامات میں شریک کروایا؟ (پروگرامات کے
          نام لکھیں)
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          gap: "20px",
        }}
      >
        {data?.toseeDawaId?.rawabit[2]?.programs?.map((program, index) => (
          <p
            key={index}
            style={{ border: "none", borderBottom: "1px dotted black" }}
            readonly
          >
            {program}
          </p>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <p>اس ماہ کی نمازوں کی صورتحال کیسی رہی؟</p>
        <p
          style={{ border: "none", borderBottom: "1px dotted black" }}
          readonly
          id="rbt3namazCondition"
        >
          {data?.toseeDawaId?.rawabit[2]?.namazCondition}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <h3>عام طلبہ:</h3>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <p>
          کتنے عام طلبہ سے ملاقاتیں کیں؟
          {data?.toseeDawaId?.regularStudents?.genralStudentsCount}
        </p>
        <p
          style={{ border: "none", borderBottom: "1px dotted black" }}
          id="genralStudentsCount"
        ></p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <p>
          عام طلبہ سے کل کتنی ملاقاتیں کیں؟
          {data?.toseeDawaId?.regularStudents?.genralStudentsTotalMeetups}
        </p>
        <p
          style={{ border: "none", borderBottom: "1px dotted black" }}
          readonly
          id="genralStudentsTotalMeetups"
        ></p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <p>
          عام طلبہ میں کتنا لٹریچر تقسیم کیا؟
          {
            data?.toseeDawaId?.regularStudents
              ?.genralStudentsTotalLitratureDivided
          }
        </p>
        <p
          style={{ border: "none", borderBottom: "1px dotted black" }}
          readonly
          id="genralStudentsTotalLitratureDivided"
        ></p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <h2>تبصرہ:</h2>
        <p
          style={{ borderBottom: "1px dotted black", width: "100%" }}
          id="comments"
        >
          {data?.comments}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <h2>رپورٹ submit کرنے کی تاریخ:</h2>
        <p
          style={{ borderBottom: "1px dotted black", width: "200px" }}
          id="month"
        >
          {data?.createdAt.split("T")[0]}
        </p>
      </div>
    </div>
  );
};
