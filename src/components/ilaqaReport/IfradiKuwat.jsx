import { ilaqaRawabitDecided } from "./ToseeDawat";

export const Box = ({ children, type }) => {
  return (
    <td
      className={`border text-center p-2 ${
        type === "heading" ? "text-lg text-black" : ""
      }`}
    >
      {children}
    </td>
  );
};
export const IfradiKuwat = ({ view }) => {
  const calcultate = (v) => {
    // (start + increase)- decrease
    const s = document.getElementById(`${v}-start`);
    const i = document.getElementById(`${v}-increase`);
    const d = document.getElementById(`${v}-decrease`);
    document.getElementById(`${v}-end`).value =
      parseInt(s.value) + parseInt(i.value) - parseInt(d.value);
  };
  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full table">
        <thead>
          <tr>
            <Box type={"heading"}>افرادی قوت</Box>
            <Box>آغاز میں</Box>
            <Box>اضافہ</Box>
            <Box>کمی</Box>
            <Box>اختتام پر</Box>
            <Box>ماہانہ ہدف</Box>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Box>ارکان</Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`arkan-start`}
                id={`arkan-start`}
                onChange={() => {
                  calcultate("arkan");
                  ilaqaRawabitDecided();
                }}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`arkan-increase`}
                id={`arkan-increase`}
                onChange={() => {
                  calcultate("arkan");
                  ilaqaRawabitDecided();
                }}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`arkan-decrease`}
                id={`arkan-decrease`}
                onChange={() => {
                  calcultate("arkan");
                  ilaqaRawabitDecided();
                }}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`arkan-end`}
                id={`arkan-end`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`arkan-monthly`}
                id={`arkan-monthly`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>امیدواران</Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`umeedWaran-start`}
                id={`umeedWaran-start`}
                onChange={() => {
                  calcultate("umeedWaran");
                  ilaqaRawabitDecided();
                }}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                onChange={() => {
                  calcultate("umeedWaran");
                  ilaqaRawabitDecided();
                }}
                name={`umeedWaran-increase`}
                id={`umeedWaran-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`umeedWaran-decrease`}
                id={`umeedWaran-decrease`}
                onChange={() => {
                  calcultate("umeedWaran");
                  ilaqaRawabitDecided();
                }}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`umeedWaran-end`}
                id={`umeedWaran-end`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`umeedWaran-monthly`}
                id={`umeedWaran-monthly`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>رفقا</Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`rafaqa-start`}
                onChange={() => calcultate("rafaqa")}
                id={`rafaqa-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`rafaqa-increase`}
                id={`rafaqa-increase`}
                onChange={() => calcultate("rafaqa")}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`rafaqa-decrease`}
                onChange={() => calcultate("rafaqa")}
                id={`rafaqa-decrease`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`rafaqa-end`}
                id={`rafaqa-end`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`rafaqa-monthly`}
                id={`rafaqa-monthly`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>کارکنان</Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`karkunan-start`}
                id={`karkunan-start`}
                onChange={() => calcultate("karkunan")}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`karkunan-increase`}
                onChange={() => calcultate("karkunan")}
                id={`karkunan-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`karkunan-decrease`}
                id={`karkunan-decrease`}
                onChange={() => calcultate("karkunan")}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`karkunan-end`}
                id={`karkunan-end`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`karkunan-monthly`}
                id={`karkunan-monthly`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>شاہین</Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`shaheen-start`}
                onChange={() => calcultate("shaheen")}
                id={`shaheen-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                onChange={() => calcultate("shaheen")}
                type="number"
                required
                name={`shaheen-increase`}
                id={`shaheen-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`shaheen-decrease`}
                id={`shaheen-decrease`}
                onChange={() => calcultate("shaheen")}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`shaheen-end`}
                id={`shaheen-end`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`shaheen-monthly`}
                id={`shaheen-monthly`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>ممبرز</Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`members-start`}
                onChange={() => calcultate("members")}
                id={`members-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`members-increase`}
                onChange={() => calcultate("members")}
                id={`members-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`members-decrease`}
                onChange={() => calcultate("members")}
                id={`members-decrease`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                required
                name={`members-end`}
                id={`members-end`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`members-monthly`}
                id={`members-monthly`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
