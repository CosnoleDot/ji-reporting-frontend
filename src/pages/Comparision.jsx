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
import { months } from "./Reports";
import { UIContext } from "../context/ui";
import { CircularChart } from "../components/CircularChart";

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
    <div className=" w-full h-screen bg-white">
      <div className="flex  w-full p-3 items-center border-b justify-between">
        <h1 className="text-xl font-bold">Dates</h1>
        <div className="flex justify-end items-center gap-3">
          <button
            className="border px-4 py-2 rounded-md bg-primary text-white capitalize"
            onClick={() => {
              showDates(false);
              getData();
            }}
          >
            Generate
          </button>
          <button
            className="border px-4 py-2 rounded-md bg-none text-primary capitalize"
            onClick={() => showDates(false)}
          >
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
              className="input-bordered input w-full input-sm mt-4"
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
  const { nazim, setLoading } = useContext(UIContext);
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
    setLoading(true);
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
        shaheenmeeting: "شاہین میٹنگ",
        paighamevent: "پیغام محفل",
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
        rwabitmeetingsgoal: "روابط سےملاقاتوں کاہدف",

        literaturedistribution: "تقسیم لٹریچر",
        registered: "",
        commonstudentmeetings: "عام طلبہ ملاقاتیں",
        commonliteraturedistribution: "عام طلبہ تقسیم لٹریچر ",

        umeedwaranfilled: "امیدواران فل",
        rafaqafilled: "رفقا فل",

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
        monthlyincome: "ماہانہ آمدن",
        monthlyexpenditure: "ماہانہ خرچ",
        savings: "بدست",
        loss: "خسارہ",
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
        meetings: "ملاقاتیں",
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
        meetings: "ملاقاتیں",
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
        ijtarkan: "اجتماع ارکان",
        ijtnazmeen: "اجتماع ناظمین",
        ijtumeedwaran: "اجتماع امیدواران",
        studycircle: "سٹڈی سرکل",
        sadurmeeting: "صدورمیٹینگ",
        ijtrafaqa: "اجتماع رفقا",
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
        const isMunt = ilaqas?.filter((i) => i?.maqam?._id === areaId);
        myData.labels = myData.labels.map((i) =>
          isMunt.length > 0 ? mMaqam[i] : gMaqam[i]
        );
      } else if (reportType === "division") {
        myData.labels = myData.labels.map((i) => division[i]);
      } else if (reportType === "ilaqa") {
        myData.labels = myData.labels.map((i) => ilaqa[i]);
      } else if (reportType === "halqa") {
        myData.labels = myData.labels.map((i) => halqa[i]);
      } else if (reportType === "personal") {
        myData.labels = myData.labels.map((i) => personal[i]);
      }

      setResponse(myData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      dispatch({ type: "ERROR", payload: error?.response?.data?.message });
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
  const getDivName = (area, type) => {
    if (reportType === "halqa") {
      if (type === "Tehsil") {
        let div = districts?.find((i) => area?.parentId?.district === i._id);
        return `${div?.division?.name}(Division) - ${div?.division?.province?.name}`;
      } else if (type === "Ilaqa") {
        let maqam = maqams.find((i) => area?.parentId?.maqam === i?._id);
        return `${area?.parentId?.name}(Ilaqa) - ${maqam?.name}(Maqam)`;
      } else if (type === "Maqam") {
        return `${area?.parentId?.name}(Maqam)`;
      }
    } else if (reportType === "ilaqa") {
      let maqam = maqams.find((i) => area?.parentId?.maqam === i?._id);
      return `${area?.maqam?.name}(Maqam) - ${area?.maqam?.province?.name}`;
    } else if (reportType === "division") {
      return `${area?.province?.name}`;
    } else if (reportType === "maqam") {
      return `${area?.province?.name}`;
    } else {
      return "Pakistan";
    }
  };

  return (
    <GeneralLayout title={"Comparison"} active={"comparison"}>
      <div className=" flex flex-col gap-3 h-[calc(100vh)] overflow-y-scroll w-full p-3">
        <div className="w-full flex md:flex-row flex-col justify-between items-center py-4">
          <div className="mb-4 w-full md:w-[70%] flex flex-col">
            <h1 className="text-2xl font-bold text-start ">Comparison</h1>
            <p className="text-gray-500">Get a sneak peak into your reports </p>
          </div>
          <div className="w-full md:w-[30%]  flex justify-start md:justify-end">
            <button
              className="px-4 py-2 rounded-md bg-primary text-white capitalize p-[8px]"
              onClick={() => {
                document.getElementById("add_comparison_modal").showModal();
              }}
            >
              +New Comparios
            </button>
          </div>
        </div>
        <div className="divider mt-0"></div>
        {!dates && (
          <div className="flex flex-col gap-3 w-full p-3 overflow-hidden overflow-x-scroll h-[80vh]">
            {response ? (
              response?.chart === "radial" ? (
                <CircularChart res={response} type={selectedProperty} />
              ) : (
                <ReportChart res={response} type={selectedProperty} />
              )
            ) : (
              <div className="flex justify-center items-center top-[50%] relative left-[0%]">
                <p className="text-2xl text-[#7a7a7a]">No Reports Data</p>
              </div>
            )}
          </div>
        )}
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
      </div>

      <dialog id="add_comparison_modal" className="modal">
        <div className="modal-box min-w-[90%] h-full flex flex-col justify-between">
          <div className="flex mr-10 items-center space-y-10 flex-col justify-between inlineQ">
            <div className="w-full space-y-2">
              <label
                htmlFor="Reprot Type"
                className="w-full font-semibold text-innerAlignment"
              >
                Select Type of Report
              </label>
              <select
                value={reportType}
                onChange={(e) => {
                  setReportType(e.target.value);
                  if (
                    e.target.value === "self" ||
                    e.target.value === "markaz"
                  ) {
                    setAreaId(me.userAreaId._id);
                  }
                }}
                className="select select-bordered select-sm min-w-lg w-full"
              >
                <option value="" disabled>
                  Report Type
                </option>
                {(localStorage.getItem("@type") === "province" ||
                  localStorage.getItem("@type") === "country") && (
                  <>
                    {localStorage.getItem("@type") === "country" && (
                      <option value="markaz">Markaz</option>
                    )}
                    <option value="province">Province</option>
                    <option value="division">Division</option>
                    <option value="maqam">Maqam</option>
                  </>
                )}
                {localStorage.getItem("@type") !== "halqa" &&
                  localStorage.getItem("@type") !== "division" && (
                    <>
                      <option value="ilaqa">Ilaqa</option>
                    </>
                  )}
                <option value="halqa">Halqa</option>
                {[
                  "umeedwar",
                  "rukan",
                  "umeedwaar-nazim",
                  "rukan-nazim",
                ].includes(me?.nazimType) && (
                  <option value="personal">Personal</option>
                )}
                {/* <option value='self'>Self Compare</option> */}
              </select>
            </div>
            <div className="w-full space-y-2">
              <label
                htmlFor="area"
                className="w-full font-semibold text-innerAlignment"
              >
                Select Your Area
              </label>
              {reportType !== "self" &&
                reportType !== "personal" &&
                reportType !== "markaz" && (
                  <select
                    value={areaId}
                    onChange={(e) => setAreaId(e.target.value)}
                    className="select select-bordered select-sm w-full"
                  >
                    <option value="" disabled>
                      Area {reportType}
                    </option>
                    {areas[reportType]?.map((i, index) => (
                      <option key={index} value={i?._id} className="w-auto">
                        {i?.name} - {getDivName(i, i.parentType)}
                      </option>
                    ))}
                  </select>
                )}
            </div>

            {reportType === "personal" && (
              <div className="relative  w-full">
                <input type="hidden" name="userAreaId" id="userAreaId" />
                <input
                  id="autocomplete0"
                  type="search"
                  className="input input-bordered w-full input-sm"
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
                  className="fixed hidden z-50 max-h-[100px] overflow-y-scroll bg-white border border-gray-300 w-auto"
                >
                  {nazim
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
                          document.getElementById("userAreaId").value =
                            area?._id;
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
            <div className="w-full space-y-2">
              <label
                htmlFor="area"
                className="w-full font-semibold text-innerAlignment"
              >
                Select Property
              </label>
              <select
                value={selectedProperty}
                className="select select-bordered select-sm w-full"
                onChange={(e) => setSelectedProperty(e.target.value)}
              >
                <option value="" disabled>
                  Property
                </option>
                {reportType !== "personal" && (
                  <>
                    <option value={"compareAll"}>Compare All</option>
                    <option value={"spiderChart"}>Spider Chart</option>
                    <option value={"radialChart"}>Radial Chart</option>
                  </>
                )}
                {[
                  "umeedwar",
                  "rukan",
                  "umeedwaar-nazim",
                  "rukan-nazim",
                ].includes(me?.nazimType) &&
                  reportType === "personal" && (
                    <>
                      <option value={"prayers"}> Prayers</option>
                      <option value={"studies"}> Mutalajaat</option>
                      <option value={"toseeDawa"}>ToseeDawat</option>
                    </>
                  )}
              </select>
            </div>
            <div className="w-full space-y-2">
              <label
                htmlFor="area"
                className="w-full font-semibold text-innerAlignment"
              >
                Select Duration
              </label>
              <select
                value={durationType}
                onChange={(e) => setDurationType(e.target.value)}
                className="select select-bordered select-sm w-full"
              >
                <option value="" disabled>
                  Duration Type
                </option>
                <option value="month">Month</option>
                {selectedProperty !== "spider" && (
                  <option value="year">Year</option>
                )}
              </select>
            </div>
            <form method="dialog">
              <button
                onClick={() => {
                  if (
                    durationType !== "" &&
                    reportType !== "" &&
                    selectedProperty !== ""
                  )
                    showDates(true);
                }}
                id="close-comparison-modal"
                className="border px-4 py-2 rounded-md bg-primary text-white capitalize"
              >
                Dates
              </button>
            </form>
          </div>

          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              id="close-comparison-modal"
              className="border px-4 py-2 rounded-md bg-none text-primary capitalize"
            >
              Cancel
            </button>
          </form>
        </div>
      </dialog>
    </GeneralLayout>
  );
};
