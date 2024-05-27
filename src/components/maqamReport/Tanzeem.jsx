import { Box } from "./IfradiKuwat";

export const Tanzeem = ({ view }) => {
  const calcultate = (v) => {
    // (start + increase)- decrease
    const s = document.getElementById(`${v}-start`);
    const i = document.getElementById(`${v}-increase`);
    const d = document.getElementById(`${v}-decrease`);
    document.getElementById(`${v}-end`).value =
      parseInt(s.value) + parseInt(i.value) - parseInt(d.value);
    return parseInt(s.value) + parseInt(i.value) - parseInt(d.value);
  };

  const totalCalculate = (arg1, arg2, final) => {
    // Function to safely access and set element value
    const setElementValue = (id, value) => {
      const element = document.getElementById(id);
      if (element) {
        element.value = value;
      } else {
        console.error(`Element with ID '${id}' not found.`);
      }
    };

    // Arguments 1
    const start1 = parseFloat(document.getElementById(`${arg1}-start`).value);
    const increase1 = parseFloat(
      document.getElementById(`${arg1}-increase`).value
    );
    const decrease1 = parseFloat(
      document.getElementById(`${arg1}-decrease`).value
    );
    const end1 = parseFloat(document.getElementById(`${arg1}-end`).value);
    const continue1 = parseFloat(
      document.getElementById(`${arg1}-continue`).value
    );
    const paused1 = parseFloat(document.getElementById(`${arg1}-paused`).value);

    // Arguments 2
    const start2 = parseFloat(document.getElementById(`${arg2}-start`).value);
    const increase2 = parseFloat(
      document.getElementById(`${arg2}-increase`).value
    );
    const decrease2 = parseFloat(
      document.getElementById(`${arg2}-decrease`).value
    );
    const end2 = parseFloat(document.getElementById(`${arg2}-end`).value);
    const continue2 = parseFloat(
      document.getElementById(`${arg2}-continue`).value
    );
    const paused2 = parseFloat(document.getElementById(`${arg2}-paused`).value);
    if (end1 && end2) {
      document.getElementById(`${final.split("-")[0]}-end`).value = end1 + end2;
    }
    // Functionality
    const calculationSwitch = (key) => {
      switch (key) {
        case "start":
          return start1 + start2;
        case "increase":
          return increase1 + increase2;
        case "decrease":
          return decrease1 + decrease2;
        case "end":
          return end1 + end2;
        case "continue":
          return continue1 + continue2;
        case "paused":
          return paused1 + paused2;
        default:
          break;
      }
    };

    // Set the value of the final element if it exists
    setElementValue(final, calculationSwitch(final.split("-")[1]));
  };

  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full table">
        <thead>
          <tr>
            <h3
              className="border text-sm md:text-md text-center p-3 w-[10rem] lg:max-w-[15rem]"
              type={"heading"}
            >
              تنظیم
            </h3>
            <Box>آغازمیں</Box>
            <Box>اِضافہ</Box>
            <Box>کمی</Box>
            <Box>اختتام پر</Box>
            <Box>فعال</Box>
            <Box>غیرفعال</Box>
            <Box>ماہانہ ہدف</Box>
          </tr>
        </thead>
        <tbody>
          <tr>
            <h3 className="border text-sm md:text-md text-center p-3 w-[10rem] lg:max-w-[15rem]">
              رہائشی حلقے
            </h3>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`rehaishHalqay-start`}
                id={`rehaishHalqay-start`}
                onChange={() => {
                  calcultate("rehaishHalqay");
                  totalCalculate(
                    "taleemHalqay",
                    "rehaishHalqay",
                    "totalHalqay-start"
                  );
                }}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`rehaishHalqay-increase`}
                id={`rehaishHalqay-increase`}
                onChange={() => {
                  calcultate("rehaishHalqay");
                  totalCalculate(
                    "taleemHalqay",
                    "rehaishHalqay",
                    "totalHalqay-increase"
                  );
                }}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`rehaishHalqay-decrease`}
                id={`rehaishHalqay-decrease`}
                onChange={() => {
                  calcultate("rehaishHalqay");
                  totalCalculate(
                    "taleemHalqay",
                    "rehaishHalqay",
                    "totalHalqay-decrease"
                  );
                }}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`rehaishHalqay-end`}
                onChange={() => {
                  totalCalculate(
                    "taleemHalqay",
                    "rehaishHalqay",
                    "rehaishHalqay-end"
                  );
                }}
                id={`rehaishHalqay-end`}
                className="p-1 text-center max-w-full"
              />
            </Box>

            <Box>
              <input
                readOnly={view}
                type="number"
                required
                onChange={() => {
                  calcultate("taleemHalqay");
                  totalCalculate(
                    "taleemHalqay",
                    "rehaishHalqay",
                    "totalHalqay-continue"
                  );
                }}
                name={`rehaishHalqay-continue`}
                id={`rehaishHalqay-continue`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`rehaishHalqay-paused`}
                id={`rehaishHalqay-paused`}
                onChange={() => {
                  calcultate("taleemHalqay");
                  totalCalculate(
                    "taleemHalqay",
                    "rehaishHalqay",
                    "totalHalqay-paused"
                  );
                }}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`rehaishHalqay-monthly`}
                id={`rehaishHalqay-monthly`}
                className="p-1 text-center max-w-full"
              />
            </Box>
          </tr>
          <tr>
            <h3 className="border text-sm md:text-md text-center p-3 w-[10rem] lg:max-w-[15rem]">
              تعلیمی حلقے
            </h3>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`taleemHalqay-start`}
                id={`taleemHalqay-start`}
                onChange={() => {
                  calcultate("taleemHalqay");
                  totalCalculate(
                    "taleemHalqay",
                    "rehaishHalqay",
                    "totalHalqay-start"
                  );
                }}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`taleemHalqay-increase`}
                id={`taleemHalqay-increase`}
                onChange={() => {
                  calcultate("taleemHalqay");
                  totalCalculate(
                    "taleemHalqay",
                    "rehaishHalqay",
                    "totalHalqay-increase"
                  );
                }}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`taleemHalqay-decrease`}
                id={`taleemHalqay-decrease`}
                onChange={() => {
                  calcultate("taleemHalqay");
                  totalCalculate(
                    "taleemHalqay",
                    "rehaishHalqay",
                    "totalHalqay-decrease"
                  );
                }}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`taleemHalqay-end`}
                onChange={() => {
                  totalCalculate(
                    "taleemHalqay",
                    "rehaishHalqay",
                    "totalHalqay-end"
                  );
                }}
                id={`taleemHalqay-end`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`taleemHalqay-continue`}
                id={`taleemHalqay-continue`}
                onChange={() =>
                  totalCalculate(
                    "taleemHalqay",
                    "rehaishHalqay",
                    "totalHalqay-continue"
                  )
                }
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`taleemHalqay-paused`}
                id={`taleemHalqay-paused`}
                onChange={() =>
                  totalCalculate(
                    "taleemHalqay",
                    "rehaishHalqay",
                    "totalHalqay-paused"
                  )
                }
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`taleemHalqay-monthly`}
                id={`taleemHalqay-monthly`}
                className="p-1 text-center max-w-full"
              />
            </Box>
          </tr>
          <tr>
            <h3 className="border text-sm md:text-md text-center p-3 w-[10rem] lg:max-w-[15rem]">
              کل حلقے
            </h3>
            <Box>
              <input
                readOnly
                type="number"
                required
                name={`totalHalqay-start`}
                id={`totalHalqay-start`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly
                type="number"
                required
                name={`totalHalqay-increase`}
                id={`totalHalqay-increase`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly
                type="number"
                required
                name={`totalHalqay-decrease`}
                id={`totalHalqay-decrease`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly
                type="number"
                required
                name={`totalHalqay-end`}
                id={`totalHalqay-end`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly
                type="number"
                required
                name={`totalHalqay-continue`}
                id={`totalHalqay-continue`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly
                type="number"
                required
                name={`totalHalqay-paused`}
                id={`totalHalqay-paused`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`totalHalqay-monthly`}
                id={`totalHalqay-monthly`}
                className="p-1 text-center max-w-full"
              />
            </Box>
          </tr>
          <tr>
            <h3 className="border text-sm md:text-md text-center p-3 w-[10rem] lg:max-w-[15rem]">
              رہائشی ذیلی حلقے
            </h3>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`subRehaishHalqay-start`}
                id={`subRehaishHalqay-start`}
                onChange={() => {
                  calcultate("subRehaishHalqay");
                  totalCalculate(
                    "subTaleemHalqay",
                    "subRehaishHalqay",
                    "subTotalHalqay-start"
                  );
                }}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`subRehaishHalqay-increase`}
                id={`subRehaishHalqay-increase`}
                onChange={() => {
                  calcultate("subRehaishHalqay");
                  totalCalculate(
                    "subTaleemHalqay",
                    "subRehaishHalqay",
                    "subTotalHalqay-increase"
                  );
                }}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`subRehaishHalqay-decrease`}
                id={`subRehaishHalqay-decrease`}
                onChange={() => {
                  calcultate("subRehaishHalqay");
                  totalCalculate(
                    "subTaleemHalqay",
                    "subRehaishHalqay",
                    "subTotalHalqay-decrease"
                  );
                }}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`subRehaishHalqay-end`}
                id={`subRehaishHalqay-end`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                onChange={() => {
                  totalCalculate(
                    "subTaleemHalqay",
                    "subRehaishHalqay",
                    "subTotalHalqay-continue"
                  );
                }}
                name={`subRehaishHalqay-continue`}
                id={`subRehaishHalqay-continue`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                onChange={() => {
                  totalCalculate(
                    "subTaleemHalqay",
                    "subRehaishHalqay",
                    "subTotalHalqay-paused"
                  );
                }}
                name={`subRehaishHalqay-paused`}
                id={`subRehaishHalqay-paused`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`subRehaishHalqay-monthly`}
                id={`subRehaishHalqay-monthly`}
                className="p-1 text-center max-w-full"
              />
            </Box>
          </tr>
          <tr>
            <h3 className="border text-sm md:text-md text-center p-3 w-[10rem] lg:max-w-[15rem]">
              تعلیمی ذیلی حلقے
            </h3>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`subTaleemHalqay-start`}
                id={`subTaleemHalqay-start`}
                onChange={() => {
                  calcultate("subTaleemHalqay");
                  totalCalculate(
                    "subTaleemHalqay",
                    "subRehaishHalqay",
                    "subTotalHalqay-start"
                  );
                }}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`subTaleemHalqay-increase`}
                id={`subTaleemHalqay-increase`}
                onChange={() => {
                  calcultate("subTaleemHalqay");
                  totalCalculate(
                    "subTaleemHalqay",
                    "subRehaishHalqay",
                    "subTotalHalqay-increase"
                  );
                }}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`subTaleemHalqay-decrease`}
                id={`subTaleemHalqay-decrease`}
                onChange={() => {
                  calcultate("subTaleemHalqay");
                  totalCalculate(
                    "subTaleemHalqay",
                    "subRehaishHalqay",
                    "subTotalHalqay-decrease"
                  );
                }}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`subTaleemHalqay-end`}
                id={`subTaleemHalqay-end`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`subTaleemHalqay-continue`}
                id={`subTaleemHalqay-continue`}
                onChange={() => {
                  totalCalculate(
                    "subTaleemHalqay",
                    "subRehaishHalqay",
                    "subTotalHalqay-continue"
                  );
                }}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                onChange={() => {
                  totalCalculate(
                    "subTaleemHalqay",
                    "subRehaishHalqay",
                    "subTotalHalqay-paused"
                  );
                }}
                name={`subTaleemHalqay-paused`}
                id={`subTaleemHalqay-paused`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`subTaleemHalqay-monthly`}
                id={`subTaleemHalqay-monthly`}
                className="p-1 text-center max-w-full"
              />
            </Box>
          </tr>
          <tr>
            <h3 className="border text-sm md:text-md text-center p-3 w-[10rem] lg:max-w-[15rem]">
              کل ذیلی حلقے
            </h3>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`subTotalHalqay-start`}
                id={`subTotalHalqay-start`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`subTotalHalqay-increase`}
                id={`subTotalHalqay-increase`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`subTotalHalqay-decrease`}
                id={`subTotalHalqay-decrease`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`subTotalHalqay-end`}
                id={`subTotalHalqay-end`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`subTotalHalqay-continue`}
                id={`subTotalHalqay-continue`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`subTotalHalqay-paused`}
                id={`subTotalHalqay-paused`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`subTotalHalqay-monthly`}
                id={`subTotalHalqay-monthly`}
                className="p-1 text-center max-w-full"
              />
            </Box>
          </tr>
          <tr>
            <h3 className="border text-sm md:text-md text-center p-3 w-[10rem] lg:max-w-[15rem]">
              بزم کے سکول یونٹس
            </h3>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`busmSchoolUnits-start`}
                id={`busmSchoolUnits-start`}
                onChange={() => {
                  calcultate("busmSchoolUnits");
                  totalCalculate(
                    "busmSchoolUnits",
                    "busmRehaishUnits",
                    "busmTotalUnits-start"
                  );
                }}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`busmSchoolUnits-increase`}
                id={`busmSchoolUnits-increase`}
                onChange={() => {
                  calcultate("busmSchoolUnits");
                  totalCalculate(
                    "busmSchoolUnits",
                    "busmRehaishUnits",
                    "busmTotalUnits-increase"
                  );
                }}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`busmSchoolUnits-decrease`}
                id={`busmSchoolUnits-decrease`}
                onChange={() => {
                  calcultate("busmSchoolUnits");
                  totalCalculate(
                    "busmSchoolUnits",
                    "busmRehaishUnits",
                    "busmTotalUnits-decrease"
                  );
                }}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`busmSchoolUnits-end`}
                id={`busmSchoolUnits-end`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                onChange={() => {
                  totalCalculate(
                    "busmSchoolUnits",
                    "busmRehaishUnits",
                    "busmTotalUnits-continue"
                  );
                }}
                name={`busmSchoolUnits-continue`}
                id={`busmSchoolUnits-continue`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                onChange={() => {
                  calcultate("busmSchoolUnits");
                  totalCalculate(
                    "busmSchoolUnits",
                    "busmRehaishUnits",
                    "busmTotalUnits-paused"
                  );
                }}
                required
                name={`busmSchoolUnits-paused`}
                id={`busmSchoolUnits-paused`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`busmSchoolUnits-monthly`}
                id={`busmSchoolUnits-monthly`}
                className="p-1 text-center max-w-full"
              />
            </Box>
          </tr>
          <tr>
            <h3 className="border text-sm md:text-md text-center p-3 w-[10rem] lg:max-w-[15rem]">
              بزم کے رہائشی یونٹس
            </h3>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`busmRehaishUnits-start`}
                id={`busmRehaishUnits-start`}
                onChange={() => {
                  calcultate("busmRehaishUnits");
                  totalCalculate(
                    "busmSchoolUnits",
                    "busmRehaishUnits",
                    "busmTotalUnits-start"
                  );
                }}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`busmRehaishUnits-increase`}
                id={`busmRehaishUnits-increase`}
                onChange={() => {
                  calcultate("busmRehaishUnits");
                  totalCalculate(
                    "busmSchoolUnits",
                    "busmRehaishUnits",
                    "busmTotalUnits-increase"
                  );
                }}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`busmRehaishUnits-decrease`}
                id={`busmRehaishUnits-decrease`}
                onChange={() => {
                  calcultate("busmRehaishUnits");
                  totalCalculate(
                    "busmSchoolUnits",
                    "busmRehaishUnits",
                    "busmTotalUnits-decrease"
                  );
                }}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`busmRehaishUnits-end`}
                id={`busmRehaishUnits-end`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                onChange={() => {
                  totalCalculate(
                    "busmSchoolUnits",
                    "busmRehaishUnits",
                    "busmTotalUnits-continue"
                  );
                }}
                type="number"
                required
                name={`busmRehaishUnits-continue`}
                id={`busmRehaishUnits-continue`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                onChange={() => {
                  totalCalculate(
                    "busmSchoolUnits",
                    "busmRehaishUnits",
                    "busmTotalUnits-paused"
                  );
                }}
                required
                name={`busmRehaishUnits-paused`}
                id={`busmRehaishUnits-paused`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`busmRehaishUnits-monthly`}
                id={`busmRehaishUnits-monthly`}
                className="p-1 text-center max-w-full"
              />
            </Box>
          </tr>
          <tr>
            <h3 className="border text-sm md:text-md text-center p-3 w-[10rem] lg:max-w-[15rem]">
              بزم کے کل یونٹس
            </h3>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`busmTotalUnits-start`}
                id={`busmTotalUnits-start`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`busmTotalUnits-increase`}
                id={`busmTotalUnits-increase`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`busmTotalUnits-decrease`}
                id={`busmTotalUnits-decrease`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`busmTotalUnits-end`}
                id={`busmTotalUnits-end`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`busmTotalUnits-continue`}
                id={`busmTotalUnits-continue`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`busmTotalUnits-paused`}
                id={`busmTotalUnits-paused`}
                className="p-1 text-center max-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`busmTotalUnits-monthly`}
                id={`busmTotalUnits-monthly`}
                className="p-1 text-center max-w-full"
              />
            </Box>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
