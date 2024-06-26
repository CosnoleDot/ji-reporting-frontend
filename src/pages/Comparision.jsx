import { useContext, useState } from "react";
import { GeneralLayout } from "../components";
import {
  DistrictContext,
  DivisionContext,
  HalqaContext,
  IlaqaContext,
  MaqamContext,
  MeContext,
  ProvinceContext,
  TehsilContext,
  useToastState,
} from "../context";
import instance from "../api/instrance";
import { useEffect } from "react";
import { ReportChart } from "../components/ReportChart";
import { FaTimes, FaChevronCircleRight, FaTimesCircle } from "react-icons/fa";
import { getDivisionByTehsil, months } from "./Reports";
import { UIContext } from "../context/ui";

const Dates = ({
  durationMonths,
  setDurationMonths,
  showDates,
  durationType,
  durationYears,
  setDurationYears,
  getData,
}) => {
  const [year, setYear] = useState(2024);

  return (
    <div className="fixed top-0 left-0 z-1 w-full h-screen bg-white">
      <div className="flex z-50 w-full p-3 items-center border-b justify-between">
        <h1 className="text-xl font-bold">Dates</h1>
        <div className="flex justify-end items-center gap-3">
          <button
            className="btn"
            onClick={() => {
              showDates(false);
              getData();
            }}
          >
            Generate
          </button>
          <button className="btn" onClick={() => showDates(false)}>
            <FaTimes />
          </button>
        </div>
      </div>
      {durationType === "month" && (
        <div className="flex items-start justify-start w-full h-[calc(100vh-72.8px-64px)]">
          <div className="w-full h-[calc(100vh-72.8px-64px)] overflow-hidden overflow-y-scroll">
            <input
              type="number"
              id="yearInput"
              name="yearInput"
              placeholder="YYYY"
              min="1900"
              max="2100"
              step="1"
              className="input-bordered input w-full"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            {months?.map((i, index) => (
              <div
                key={index}
                className="flex p-3 hover:bg-slate-200 items-center justify-between"
                onClick={() =>
                  setDurationMonths([
                    ...durationMonths,
                    { month: i?.title, year, value: i?.value },
                  ])
                }
              >
                <span>
                  {i?.title}, {year}
                </span>
                <FaChevronCircleRight />
              </div>
            ))}
          </div>
          <div className="w-full h-[calc(100vh-72.8px-64px)] overflow-hidden overflow-y-scroll">
            {durationMonths?.map((i, index) => (
              <div
                key={index}
                onClick={() =>
                  setDurationMonths([
                    ...durationMonths.slice(0, index),
                    ...durationMonths.slice(index + 1, durationMonths.length),
                  ])
                }
                className="flex p-3 hover:bg-slate-200 items-center justify-between"
              >
                <span>
                  {i?.month}, {i?.year}
                </span>
                <FaTimesCircle />
              </div>
            ))}
          </div>
        </div>
      )}
      {durationType === "year" && (
        <div className="flex items-start justify-start w-full h-[calc(100vh-72.8px-64px)]">
          <div className="w-full h-[calc(100vh-72.8px-64px)] overflow-hidden overflow-y-scroll">
            {Array(10)
              .fill(1)
              ?.map((_, index) => (
                <div
                  key={index}
                  className="flex p-3 hover:bg-slate-200 items-center justify-between"
                  onClick={() =>
                    setDurationYears([...durationYears, 2023 + index])
                  }
                >
                  <span>{2023 + index}</span>
                  <FaChevronCircleRight />
                </div>
              ))}
          </div>
          <div className="w-full h-[calc(100vh-72.8px-64px)] overflow-hidden overflow-y-scroll">
            {durationYears?.map((i, index) => (
              <div
                key={index}
                onClick={() =>
                  setDurationYears([
                    ...durationYears.slice(0, index),
                    ...durationYears.slice(index + 1, durationYears.length),
                  ])
                }
                className="flex p-3 hover:bg-slate-200 items-center justify-between"
              >
                <span>{i}</span>
                <FaTimesCircle />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const Comparision = () => {
  const [durationMonths, setDurationMonths] = useState([]);
  const me = useContext(MeContext);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [durationType, setDurationType] = useState("");
  const [reportType, setReportType] = useState("");
  const [dates, showDates] = useState(false);
  const [areaId, setAreaId] = useState("");
  const [response, setResponse] = useState(null);
  const [durationYears, setDurationYears] = useState([]);
  const maqams = useContext(MaqamContext);
  const divisions = useContext(DivisionContext);
  const halqas = useContext(HalqaContext);
  const tehsils = useContext(TehsilContext);
  const ilaqas = useContext(IlaqaContext);
  const districts = useContext(DistrictContext);
  const provinces = useContext(ProvinceContext);
  const nazims = useContext(UIContext);
  const [searchArea, setSearchArea] = useState("");
  const [areas, setAreas] = useState({
    maqam: [],
    division: [],
    halqa: [],
    district: [],
    province: [],
    all: [],
  });
  useEffect(() => {
    setAreas({
      ...areas,
      maqam: maqams,
      division: divisions,
      halqa: halqas,
      district: districts,
      province: provinces,
      ilaqa: ilaqas,
      all: [
        ...maqams,
        ...divisions,
        ...districts,
        ...(provinces?.length > 0 ? provinces : []),
      ],
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maqams, divisions, halqas, districts]);
  const { dispatch } = useToastState();
  const transformedArray = durationMonths?.map((item) => {
    return {
      month: item.value,
      year: item.year,
    };
  });

  const data =
    durationType === "month"
      ? {
          dates: transformedArray,
          duration_type: durationType,
          areaId,
        }
      : { dates: durationYears, duration_type: durationType, areaId };
  const getData = async () => {
    setResponse(null);
    try {
      const res = await instance.post(
        `comparison/${
          reportType === "self"
            ? localStorage.getItem("@type")
            : reportType === "personal"
            ? "personal"
            : reportType
        }/${selectedProperty}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        }
      );
      const myData = res?.data?.data;
      const halqa = {
        ijtrafaqa: "اجتماع رفقا",
        ijtkarkunan: "اجتماع کارکنان",
        studycircle: "سٹڈی سرکل",
        darsequran: "درس قُرآن",

        arkan: "ارکان",
        umeedwaran: "امیدواران",
        rafaqa: "رفقا",
        karkunan: "کارکنان",

        books: "تعداد کتب",
        increase: "اضافہ",
        decrease: "کمی",
        bookrent: "اجرائے کتب",
        registered: "",

        dawatiwafud: "دعوتی وفود",
        rawabitparties: "روابط پارٹیز",
        hadithcircle: "حدیث سرکل",
        nizamsalah: "نظام الصلوٰۃ",
        shabbedari: "شب بیداری",

        rawabitdecided: "طے شدہ",
        current: "موجود",
        meetings: "ملاقاتیں",
        literaturedistribution: "تقسیم لٹریچر",
        registered: "",
        commonstudentmeetings: "عام طلبہ ملاقاتیں",
        commonliteraturedistribution: "عام طلبہ تقسیم لٹریچر ",

        umeedwaranfilled: "امیدواران فل",
        rafaqafilled: "رفقا فل",
        arkanfilled: "ارکان فل",

        ijtarkan: "اجتماع ارکان",
        studycircle: "سٹڈی سرکل",
        ijtnazmeen: "اجتماع ناظمین",
        ijtumeedwaran: "اجتماع امیدواران",
        sadurmeeting: "صدورمیٹینگ",

        arkan: "ارکان",
        umeedwaran: "امیدواران",
        rafaqa: "رفقا",
        karkunan: "کارکنان",
        shaheen: "شاہین",
        members: "ممبرز",

        totallibraries: "کل تعداد لائبریریز",
        totalBooks: "تعداد کتب",
        totalIncrease: "اضافہ",
        totalDecrease: "کمی",
        totalBookRent: "اجرائے کتب",
      };
      const ilaqa = {
        rehaishhalqay: "رہائشی حلقے",
        taleemhalqay: "تعلیمی حلقے",
        totalhalqay: "کل حلقے",
        subrehaishhalqay: "رِہائشی ذیلی حلقے",
        subtaleemhalqay: "تعلیمی ذیلی حلقے",
        subtotalhalqay: "کل ذیلی حلقے",
        busmschoolunits: "بزم کے سکول یونٹس",
        busmrehaishunits: "بزم کےرِہائشی یونٹس",
        busmtotalunits: "بزم کے کل یونٹس",

        studycircle: "سٹڈی سرکل",
        ijtnazmeen: "اجتماع ناظمین",
        ijtumeedwaran: "اجتماع امیدواران",
        sadurmeeting: "صدورمیٹینگ",

        arkan: "ارکان",
        umeedwaran: "امیدواران",
        rafaqa: "رفقا",
        karkunan: "کارکنان",
        shaheen: "شاہین",
        members: "ممبرز",

        dawatiwafud: "دعوتی وفود",
        rawabitparties: "روابط پارٹیز",
        hadithcircle: "حدیث سرکل",
        nizamsalah: "نظام الصلوٰۃ",
        shabbedari: "شب بیداری",
        anyOther: "",

        ijtrafaqa: "اجتماع رفقا",
        ijtkarkunan: "اجتماع کارکنان",
        studycircle: "سٹڈی سرکل",
        darsequran: "درس قرآن",
        shaheenmeeting: "شاہین میٹنگ",
        paighamevent: "پیغام محفل",

        rawabitdecided: "طے شدہ",
        currentsum: "موجود",
        meetingssum: "ملاقاتیں",
        literaturesum: "تقسیم لٹریچر",
        commonstudentmeetingssum: "عام طلبہ ملاقاتیں",
        commonliteraturedistributionsum: "عام طلبہ تقسیم لٹریچر ",
        registered: "",

        totallibraries: "کل تعداد لائبریریز",
        totalbooks: "تعداد کتب",
        totalincrease: "اضافہ کتب",
        totaldecrease: "کمی کتب",
        totalbookrent: "اجرائے کتب",

        umeedwaranfilledsum: "امیدواران فل",
        rafaqafilledsum: "رفقا فل",

        monthlyincome: "ماہانہ آمدن",
        monthlyexpenditure: "ماہانہ خرچ",
        savings: "بدست",
        loss: "خسارہ",
      };
      const mMaqam = {
        rehaishhalqay: "رہائشی حلقے",
        taleemhalqay: "تعلیمی حلقے",
        totalhalqay: "کل حلقے",
        subrehaishhalqay: "رِہائشی ذیلی حلقے",
        subtaleemhalqay: "تعلیمی ذیلی حلقے",
        subtotalhalqay: "کل ذیلی حلقے",
        busmschoolunits: "بزم کے سکول یونٹس",
        busmrehaishunits: "بزم کےرِہائشی یونٹس",
        busmtotalunits: "بزم کے کل یونٹس",

        collegesa: "Colleges A",
        collegesb: "Colleges B",
        collegesc: "Colleges C",
        collegesd: "Colleges D",

        jamiaata: "Jamiaat A",
        jamiaatb: "Jamiaat B",
        jamiaatc: "Jamiaat C",
        jamiaatd: "Jamiaat D",
        jamiaate: "Jamiaat E",

        arkan: "ارکان",
        umeedwaran: "امیدواران",
        rafaqa: "رفقا",
        karkunan: "کارکنان",
        shaheen: "شاہین",
        members: "ممبرز",

        ijtarkan: "اجتمع ارکان",
        studycircle: "سٹڈی سرکل",
        ijtnazmeen: "اجتماع ناظمین",
        ijtumeedwaran: "اجتماع امیدواران",
        sadurmeeting: "صدورمیٹینگ",

        dawatiwafud: "دعوتی وفود",
        rawabitparties: "روابط پارٹیز",
        nizamsalah: "نظام الصلوٰۃ",
        shabbedari: "شب بیداری",
        anyOther: "",

        ijtrafaqa: "اجتماع رفقا",
        ijtkarkunan: "اجتماع کارکنان",
        studycircle: "سٹڈی سرکل",
        darsequran: "درس قرآن",
        shaheenmeeting: "شاہین میٹنگ",
        paighamevent: "پیغام محفل",

        totallibraries: "کل تعداد لائبریریز",
        totalbooks: "تعداد کتب",
        totalincrease: "اضافہ کتب",
        totaldecrease: "کمی کتب",
        totalbookrent: "اجرائے کتب",

        totalreceived: "کل موصولہ",
        totalsold: "فروخت کردہ",
        monthlyreceivinggoal: "ڈائجسٹ ماہانہ ہدف",

        umeedwaranfilledsum: "امیدواران فل",
        rafaqafilledsum: "رفقا فل",

        monthlyincome: "ماہانہ آمدن",
        monthlyexpenditure: "ماہانہ خرچ",
        savings: "بدست",
        loss: "خسارہ",

        rawabitdecided: "طے شدہ",
        currentsum: "موجود",
        meetingssum: "ملاقاتیں",
        literaturesum: "تقسیم لٹریچر",
        commonstudentmeetingssum: "عام طلبہ ملاقاتیں",
        commonliteraturedistributionsum: "عام طلبہ تقسیم لٹریچر ",
        registered: "",
      };
      const gMaqam = {
        rehaishhalqay: "رہائشی حلقے",
        taleemhalqay: "تعلیمی حلقے",
        totalhalqay: "کل حلقے",
        subrehaishhalqay: "رِہائشی ذیلی حلقے",
        subtaleemhalqay: "تعلیمی ذیلی حلقے",
        subtotalhalqay: "کل ذیلی حلقے",
        busmschoolunits: "بزم کے سکول یونٹس",
        busmrehaishunits: "بزم کےرِہائشی یونٹس",
        busmtotalunits: "بزم کے کل یونٹس",

        collegesa: "Colleges A",
        collegesb: "Colleges B",
        collegesc: "Colleges C",
        collegesd: "Colleges D",

        jamiaata: "Jamiaat A",
        jamiaatb: "Jamiaat B",
        jamiaatc: "Jamiaat C",
        jamiaatd: "Jamiaat D",
        jamiaate: "Jamiaat E",

        arkan: "ارکان",
        umeedwaran: "امیدواران",
        rafaqa: "رفقا",
        karkunan: "کارکنان",
        shaheen: "شاہین",
        members: "ممبرز",

        ijtarkan: "اجتمع ارکان",
        studycircle: "سٹڈی سرکل",
        ijtnazmeen: "اجتماع ناظمین",
        ijtumeedwaran: "اجتماع امیدواران",
        sadurmeeting: "صدورمیٹینگ",

        ijtrafaqa: "اجتماع رفقا",
        studycircle: "سٹڈی سرکل",
        ijtkarkunan: "اجتماع کارکنان",
        darsequran: "درس قرآن",
        shaheenmeeting: "شاہین میٹنگ",
        paighamevent: "پیغام محفل",

        dawatiwafud: "دعوتی وفود",
        rawabitparties: "روابط پارٹیز",
        nizamsalah: "نظام الصلوٰۃ",
        shabbedari: "شب بیداری",
        anyOther: "",

        rawabitdecided: "طے شدہ",
        currentsum: "موجود",
        meetingssum: "ملاقاتیں",
        literaturedistribution: "تقسیم لٹریچر",
        rwabitmeetingsgoal: "روابط سےملاقاتوں کاہدف",
        commonstudentmeetings: "عام طلبہ ملاقاتیں",
        commonliteraturedistribution: "عام طلبہ تقسیم لٹریچر ",
        registered: "",

        totallibraries: "کل تعداد لائبریریز",
        totalbooks: "تعداد کتب",
        totalincrease: "اضافہ کتب",
        totaldecrease: "کمی کتب",
        totalbookrent: "اجرائے کتب",

        totalreceived: "کل موصولہ",
        totalsold: "فروخت کردہ",
        monthlyreceivinggoal: "ڈائجسٹ ماہانہ ہدف",

        umeedwaranfilledsum: "امیدواران فل",
        rafaqafilled: "رفقا فل",

        monthlyincome: "ماہانہ آمدن",
        monthlyexpenditure: "ماہانہ خرچ",
        savings: "بدست",
        loss: "خسارہ",
      };
      const division = {
        rehaishhalqay: "رہائشی حلقے",
        taleemhalqay: "تعلیمی حلقے",
        totalhalqay: "کل حلقے",
        subrehaishhalqay: "رِہائشی ذیلی حلقے",
        subtaleemhalqay: "تعلیمی ذیلی حلقے",
        subtotalhalqay: "کل ذیلی حلقے",
        busmschoolunits: "بزم کے سکول یونٹس",
        busmrehaishunits: "بزم کےرِہائشی یونٹس",
        busmtotalunits: "بزم کے کل یونٹس",

        collegesa: "Colleges A",
        collegesb: "Colleges B",
        collegesc: "Colleges C",
        collegesd: "Colleges D",

        jamiaata: "Jamiaat A",
        jamiaatb: "Jamiaat B",
        jamiaatc: "Jamiaat C",
        jamiaatd: "Jamiaat D",
        jamiaate: "Jamiaat E",

        arkan: "ارکان",
        umeedwaran: "امیدواران",
        rafaqa: "رفقا",
        karkunan: "کارکنان",
        shaheen: "شاہین",
        members: "ممبرز",

        ijtarkan: "اجتمع ارکان",
        studycircle: "سٹڈی سرکل",
        ijtnazmeen: "اجتماع ناظمین",
        ijtumeedwaran: "اجتماع امیدواران",
        sadurmeeting: "صدورمیٹینگ",

        ijtrafaqa: "اجتماع رفقا",
        studycircle: "سٹڈی سرکل",
        ijtkarkunan: "اجتماع کارکنان",
        darsequran: "درس قرآن",
        shaheenmeeting: "شاہین میٹنگ",
        paighamevent: "پیغام محفل",

        dawatiwafud: "دعوتی وفود",
        rawabitparties: "روابط پارٹیز",
        nizamsalah: "نظام الصلوٰۃ",
        shabbedari: "شب بیداری",
        anyOther: "",

        rawabitdecided: "طے شدہ",
        currentsum: "موجود",
        meetingssum: "ملاقاتیں",
        literaturedistribution: "تقسیم لٹریچر",
        rwabitmeetingsgoal: "روابط سےملاقاتوں کاہدف",
        commonstudentmeetings: "عام طلبہ ملاقاتیں",
        commonliteraturedistribution: "عام طلبہ تقسیم لٹریچر ",
        registered: "",

        totallibraries: "کل تعداد لائبریریز",
        totalbooks: "تعداد کتب",
        totalincrease: "اضافہ کتب",
        totaldecrease: "کمی کتب",
        totalbookrent: "اجرائے کتب",

        totalreceived: "کل موصولہ",
        totalsold: "فروخت کردہ",
        monthlyreceivinggoal: "ڈائجسٹ ماہانہ ہدف",

        umeedwaranfilledsum: "امیدواران فل",
        rafaqafilledsum: "رفقا فل",

        monthlyincome: "ماہانہ آمدن",
        monthlyexpenditure: "ماہانہ خرچ",
        savings: "بدست",
        loss: "خسارہ",
      };
    
      const province = {
        rehaishhalqay: "رہائشی حلقے",
        taleemhalqay: "تعلیمی حلقے",
        totalhalqay: "کل حلقے",
        subrehaishhalqay: "رِہائشی ذیلی حلقے",
        subtaleemhalqay: "تعلیمی ذیلی حلقے",
        subtotalhalqay: "کل ذیلی حلقے",
        busmschoolunits: "بزم کے سکول یونٹس",
        busmrehaishunits: "بزم کےرِہائشی یونٹس",
        busmtotalunits: "بزم کے کل یونٹس",
        collegesa: "Colleges A",
        collegesb: "Colleges B",
        collegesc: "Colleges C",
        collegesd: "Colleges D",
        jamiaata: "Jamiaat A",
        jamiaatb: "Jamiaat B",
        jamiaatc: "Jamiaat C",
        jamiaatd: "Jamiaat D",
        jamiaate: "Jamiaat E",
        arkan: "ارکان",
        umeedwaran: "امیدواران",
        rafaqa: "رفقا",
        karkunan: "کارکنان",
        shaheen: "شاہین",
        members: "ممبرز",
        divmushawarat: "ڈویژنل مشاورت",
        ijtarkan: "اجتمع ارکان",
        ijtnazmeen: "اجتماع ناظمین",
        ijtumeedwaran: "اجتماع امیدواران",
        studycircle: "سٹڈی سرکل",
        sadurmeeting: "صدورمیٹینگ",
        ijtrafaqa: "اجتماع رفقا",
        studycircle: "سٹڈی سرکل",
        ijtkarkunan: "اجتماع کارکنان",
        darsequran: "درس قرآن",
        shaheenmeeting: "شاہین میٹنگ",
        paighamevent: "پیغام محفل",
        dawatiwafud: "دعوتی وفود",
        rawabitparties: "روابط پارٹیز",
        nizamsalah: "نظام الصلوٰۃ",
        shabbedari: "شب بیداری",
        anyOther: "",
        tarbiyatgaahgoalsum: "تربیت گاہ ہدف",
        tarbiyatgaahheldsum: "تربیت گاہ انعقاد",
        tarbiyatgaah: "تربیت گاہ",
        tanzeemiround: "تنظیمی دورہ",
        totalprinted: "کل پرنٹ کردہ",
        totalsoldmarket: "کل فروخت کردہ (مارکیٹ)",
        totalsoldtanzeemi: "کل فروخت کردہ (تنظیمی)",
        gift: "گفٹ",
        rawabitdecided: "طے شدہ",
        current: "موجود",
        meetings: "ملاقاتیں",
        literaturedistribution: "تقسیم لٹریچر",
        rwabitmeetingsgoal: "روابط سےملاقاتوں کاہدف",
        commonstudentmeetings: "عام طلبہ ملاقاتیں",
        commonliteraturedistribution: "عام طلبہ تقسیم لٹریچر ",
        registered: "",
        totallibraries: "کل تعداد لائبریریز",
        totalbooks: "تعداد کتب",
        totalincrease: "اضافہ کتب",
        totaldecrease: "کمی کتب",
        totalbookrent: "اجرائے کتب",
        totalreceived: "کل موصولہ",
        totalsold: "فروخت کردہ",
        monthlyreceivinggoal: "ڈائجسٹ ماہانہ ہدف",
        umeedwaranfilled: "امیدواران فل",
        rafaqafilled: "رفقا فل",
        monthlyincome: "ماہانہ آمدن",
        monthlyexpenditure: "ماہانہ خرچ",
        savings: "بدست",
        loss: "خسارہ",
      };
      const markaz = {
        rehaishhalqay: "رہائشی حلقے",
        taleemhalqay: "تعلیمی حلقے",
        totalhalqay: "کل حلقے",
        subrehaishhalqay: "رِہائشی ذیلی حلقے",
        subtaleemhalqay: "تعلیمی ذیلی حلقے",
        subtotalhalqay: "کل ذیلی حلقے",
        busmschoolunits: "بزم کے سکول یونٹس",
        busmrehaishunits: "بزم کےرِہائشی یونٹس",
        busmtotalunits: "بزم کے کل یونٹس",
        collegesa: "Colleges A",
        collegesb: "Colleges B",
        collegesc: "Colleges C",
        collegesd: "Colleges D",
        jamiaata: "Jamiaat A",
        jamiaatb: "Jamiaat B",
        jamiaatc: "Jamiaat C",
        jamiaatd: "Jamiaat D",
        jamiaate: "Jamiaat E",
        arkan: "ارکان",
        umeedwaran: "امیدواران",
        rafaqa: "رفقا",
        karkunan: "کارکنان",
        shaheen: "شاہین",
        members: "ممبرز",
        divmushawarat: "ڈویژنل مشاورت",
        ijtarkan: "اجتمع ارکان",
        ijtnazmeen: "اجتماع ناظمین",
        ijtumeedwaran: "اجتماع امیدواران",
        studycircle: "سٹڈی سرکل",
        sadurmeeting: "صدورمیٹینگ",
        ijtrafaqa: "اجتماع رفقا",
        studycircle: "سٹڈی سرکل",
        ijtkarkunan: "اجتماع کارکنان",
        darsequran: "درس قرآن",
        shaheenmeeting: "شاہین میٹنگ",
        paighamevent: "پیغام محفل",
        dawatiwafud: "دعوتی وفود",
        rawabitparties: "روابط پارٹیز",
        nizamsalah: "نظام الصلوٰۃ",
        shabbedari: "شب بیداری",
        anyOther: "",
        tarbiyatgaahgoalsum: "تربیت گاہ ہدف",
        tarbiyatgaahheldsum: "تربیت گاہ انعقاد",
        tarbiyatgaah: "تربیت گاہ",
        tanzeemiround: "تنظیمی دورہ",
        totalprinted: "کل پرنٹ کردہ",
        totalsoldmarket: "کل فروخت کردہ (مارکیٹ)",
        totalsoldtanzeemi: "کل فروخت کردہ (تنظیمی)",
        gift: "گفٹ",
        rawabitdecided: "طے شدہ",
        current: "موجود",
        meetings: "ملاقاتیں",
        literaturedistribution: "تقسیم لٹریچر",
        rwabitmeetingsgoal: "روابط سےملاقاتوں کاہدف",
        commonstudentmeetings: "عام طلبہ ملاقاتیں",
        commonliteraturedistribution: "عام طلبہ تقسیم لٹریچر ",
        registered: "",
        totallibraries: "کل تعداد لائبریریز",
        totalbooks: "تعداد کتب",
        totalincrease: "اضافہ کتب",
        totaldecrease: "کمی کتب",
        totalbookrent: "اجرائے کتب",
        totalreceived: "کل موصولہ",
        totalsold: "فروخت کردہ",
        monthlyreceivinggoal: "ڈائجسٹ ماہانہ ہدف",
        umeedwaranfilled: "امیدواران فل",
        rafaqafilled: "رفقا فل",
        monthlyincome: "ماہانہ آمدن",
        monthlyexpenditure: "ماہانہ خرچ",
        savings: "بدست",
        loss: "خسارہ",
      };
      const personal = {
        // Personal

        fajarinfradi: "فجرانفرادی ",
        fajarontime: "فجرباجماعت",
        fajarqaza: "فجر قضا ",
        fajartotal: "فجر ٹوٹل",
        otherprayersinfradi: "دیگرانفرادی",
        otherprayersontime: "دیگرباجماعت",
        otherprayersqaza: "دیگرقضا",
        otherprayerstotal: "دیگرٹوٹل",

        tafseertotaldays: "تفسیرکتنےدن پڑہی",
        tafseertotalrakoo: "تفسیرکےکتنے رکوع پڑہے",
        ahdeestotaldays: "کل کتنےدن پڑہی",
        litraturetotaldays: "لٹریچر کتنے دن پڑہا",
        hifztotaldays: "حفظ کتنے دن کیا",
        institutionAttendance: "تعلیمی ادارے میں حاضری",

        genralstudentstotalmeetups: "عام طلبہ سے کل ملاقاتیں",
        genralstudentstotallitraturedivided: "عام طلبہ لٹریچرتقسیم ",
        genralstudentscount: "عام طلبہ کل سے ملاقاتیں",
        monthlyincome: "ماہانہ آمدن",
        monthlyexpenditure: "ماہانہ خرچ",
        savings: "بدست",
        loss: "خسارہ",
        currentsum: "موجود",
        rwabitmeetingsgoal: "روابط سےملاقاتوں کاہدف",
        meetingssum: "ملاقاتیں",
        literaturedum: "تقسیم لٹریچر",
        commonstudentmeetingssum: "عام طلبہ ملاقاتیں",
        commonliteraturedistributionsum: "عام طلبہ لٹریچرتقسیم ",
      };
      if (reportType === "markaz") {
        myData.labels = myData.labels.map((i) => markaz[i]);
      } else if (reportType === "province") {
        myData.labels = myData.labels.map((i) => province[i]);
      } else if (reportType === "maqam") {
        const isMunt = ilaqas?.filter((i)=> i?.maqam?._id === areaId);
        myData.labels = myData.labels.map((i) => 
          isMunt.length>0 ? mMaqam[i] : gMaqam[i]
          );
      } else if (reportType === "division") {
      myData.labels = myData.labels.map((i) => division[i]);
      } else if (reportType === "ilaqa") {
        myData.labels = myData.labels.map((i) => ilaqa[i]);
      }
      else if (reportType === "halqa") {
        myData.labels = myData.labels.map((i) => halqa[i]);
      }
      else if (reportType === "personal") {
        myData.labels = myData.labels.map((i) => personal[i]);
      }
     
      setResponse(myData);
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR", payload: error?.response?.data?.message });
    }
  };

  
  const getAreaType = (area) => {
    if (area?.parentType === "Maqam") {
      const name = maqams.find((i) => i?._id === area?.parentId);
      return `${name?.name}(Maqam)`;
    } else if (area?.parentType === "Tehsil") {
      const tehsil = tehsils?.find((i) => i._id === area.parentId);

      // const name = getDivisionByTehsil(tehsil, districts);
      return `${tehsil?.district?.division?.name}(Division)`;
    } else if (area?.parentType === "Ilaqa") {
      const ilaqa = ilaqas?.find((i) => i._id === area.parentId);
      return `${ilaqa}(Maqam)`;
    } else if (area?.province) {
      return maqams.find((i) => i?._id === area?._id) ? "Maqam" : "Division";
    } else if (area?.country) {
      return "";
    } else {
      return `${area?.maqam?.name}`;
    }
  };
  const handleEventClick = (e) => {
    if (e?.target?.id !== "autocomplete0") {
      if (
        !document
          ?.getElementById("autocomplete0-list")
          ?.classList?.contains("hidden")
      ) {
        document
          ?.getElementById("autocomplete0-list")
          ?.classList?.add("hidden");
      }
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleEventClick);
    return () => {
      document.removeEventListener("click", handleEventClick);
    };
  }, []);

  return (
    <GeneralLayout title={"Comparison"} active={"comparison"}>
      <div className="relative flex flex-col gap-3 h-[calc(100vh-66px-64px)] w-full p-3">
        <div
          style={{
            overflow: "hidden",
            overflowY: "visible",
            overflowX: "scroll",
          }}
          className="flex mr-10 items-center justify-start lg:justify-center xl:justify-center gap-3 border-b border-t py-3 inlineQ"
        >
          <select
            value={reportType}
            onChange={(e) => {
              setReportType(e.target.value);
              if (e.target.value === "self" || e.target.value === "markaz") {
                setAreaId(me.userAreaId._id);
              }
            }}
            className="select select-bordered"
          >
            <option value="" disabled>
              Report Type
            </option>
            <option value="halqa">Halqa</option>
            {localStorage.getItem("@type") === "province" ||
              (localStorage.getItem("@type") === "country" && (
                <>
                  <option value="maqam">Maqam</option>
                  <option value="division">Division</option>
                  <option value="province">Province</option>
                  <option value="markaz">Markaz</option>
                </>
              ))}
            {localStorage.getItem("@type") !== "halqa" &&
              localStorage.getItem("@type") !== "division" && (
                <>
                  <option value="ilaqa">Ilaqa</option>
                </>
              )}
            {["umeedwar", "rukan", "umeedwaar-nazim", "rukan-nazim"].includes(
              me?.nazimType
            ) && <option value="personal">Personal</option>}
            {/* <option value='self'>Self Compare</option> */}
          </select>
          {reportType !== "self" &&
            reportType !== "personal" &&
            reportType !== "markaz" && (
              <select
                value={areaId}
                onChange={(e) => setAreaId(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="" disabled>
                  Area {reportType}
                </option>
                {areas[reportType]?.map((i, index) => (
                  <option key={index} value={i?._id} className="w-[200px]">
                    {i?.name} - {getAreaType(i)}
                  </option>
                ))}
              </select>
            )}

          {reportType === "personal" && (
            <div className="relative w-full min-w-[140px]">
              <input type="hidden" name="userAreaId" id="userAreaId" />
              <input
                id="autocomplete0"
                type="search"
                className="input input-bordered input-primary w-full min-w-[140px]"
                placeholder="Select area"
                onChange={(e) => setSearchArea(e.target.value)}
                onClick={() => {
                  if (
                    document
                      .getElementById("autocomplete0-list")
                      .classList.contains("hidden")
                  ) {
                    document
                      .getElementById("autocomplete0-list")
                      .classList.remove("hidden");
                  } else {
                    document
                      .getElementById("autocomplete0-list")
                      .classList.add("hidden");
                  }
                }}
              />
              <div
                id="autocomplete0-list"
                className="fixed hidden z-50 max-h-[100px] overflow-y-scroll bg-white border border-gray-300 w-full md:max-w-[228px] mt-1 left-0 md:left-[155px]"
              >
                {nazims?.nazim
                  ?.sort((a, b) =>
                    a?.userAreaId?.name?.localeCompare(b?.userAreaId?.name)
                  )
                  ?.filter((item) => {
                    if (searchArea && searchArea !== "") {
                      if (
                        item?.userAreaId?.name
                          ?.toString()
                          ?.toLowerCase()
                          ?.includes(searchArea?.toString()?.toLowerCase()) ||
                        item?.name
                          ?.toString()
                          ?.toLowerCase()
                          ?.includes(searchArea?.toString()?.toLowerCase())
                      ) {
                        return true;
                      }
                      return false;
                    } else {
                      return true;
                    }
                  })
                  ?.map((area, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        document.getElementById("userAreaId").value = area?._id;
                        setAreaId(area?._id);
                        document.getElementById(
                          "autocomplete0"
                        ).value = `${area?.userAreaId?.name} - ${area?.name} `;
                        document
                          .getElementById("autocomplete0-list")
                          .classList.add("hidden");
                      }}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {area?.userAreaId?.name} - {area?.name}
                    </div>
                  ))}
              </div>
            </div>
          )}
          <select
            value={selectedProperty}
            className="select select-bordered"
            onChange={(e) => setSelectedProperty(e.target.value)}
          >
            <option value="" disabled>
              Property
            </option>
            {reportType !== "personal" && (
              <>
                <option value={"compareAll"}>Compare All</option>
              </>
            )}
            {["umeedwar", "rukan", "umeedwaar-nazim", "rukan-nazim"].includes(
              me?.nazimType
            ) &&
              reportType === "personal" && (
                <>
                  <option value={"prayers"}> Prayers</option>
                  <option value={"studies"}> Mutalajaat</option>
                  <option value={"toseeDawa"}>ToseeDawat</option>
                </>
              )}
          </select>
          <select
            value={durationType}
            onChange={(e) => setDurationType(e.target.value)}
            className="select select-bordered"
          >
            <option value="" disabled>
              Duration Type
            </option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
          <button
            onClick={() => {
              if (
                durationType !== "" &&
                reportType !== "" &&
                selectedProperty !== ""
              )
                showDates(true);
            }}
            className="btn"
          >
            Dates
          </button>
        </div>
        <div className="relative flex flex-col gap-3 h-[calc(100vh-100px-64px-73.6px)] w-full p-3 overflow-scroll">
          {response ? (
            <ReportChart res={response} type={selectedProperty} />
          ) : (
            <div className="flex justify-center items-center top-[50%] relative left-[0%]">
              <p className="text-2xl text-[#7a7a7a]">No Reports Data</p>
            </div>
          )}
        </div>
      </div>
      {dates && durationType !== "" && (
        <Dates
          durationMonths={durationMonths}
          setDurationMonths={setDurationMonths}
          durationType={durationType}
          showDates={showDates}
          durationYears={durationYears}
          setDurationYears={setDurationYears}
          getData={getData}
        />
      )}
    </GeneralLayout>
  );
};
