import { calculateRawabitDecided } from "./ToseeDawat";

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
export const calcultate = (v) => {
  // (start + increase)- decrease
  const s = document.getElementById(`${v}-start`);
  const i = document.getElementById(`${v}-increase`);
  const d = document.getElementById(`${v}-decrease`);

  document.getElementById(`${v}-end`).value =
    parseInt(s.value) + parseInt(i.value) - parseInt(d.value);
};
export const IfradiKuwat = ({ view }) => {
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
            {/* <Box>مرتب</Box> */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <Box>ارکان</Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                defaultValue={0}
                required
                name={`arkan-start`}
                id={`arkan-start`}
                onChange={() => {
                  calcultate("arkan");
                  calculateRawabitDecided();
                }}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                defaultValue={0}
                required
                name={`arkan-increase`}
                id={`arkan-increase`}
                onChange={() => {
                  calcultate("arkan");
                  calculateRawabitDecided();
                }}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                defaultValue={0}
                required
                name={`arkan-decrease`}
                id={`arkan-decrease`}
                onChange={() => {
                  calcultate("arkan");
                  calculateRawabitDecided();
                }}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
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
                defaultValue={0}
                required
                name={`arkan-monthly`}
                id={`arkan-monthly`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            {/* <Box>-</Box> */}
          </tr>
          <tr>
            <Box>امیدواران</Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                defaultValue={0}
                required
                name={`umeedWaran-start`}
                onChange={() => {
                  calcultate("umeedWaran");
                  calculateRawabitDecided();
                }}
                id={`umeedWaran-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                defaultValue={0}
                required
                name={`umeedWaran-increase`}
                onChange={() => {
                  calcultate("umeedWaran");
                  calculateRawabitDecided();
                }}
                id={`umeedWaran-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                defaultValue={0}
                required
                name={`umeedWaran-decrease`}
                onChange={() => {
                  calcultate("umeedWaran");
                  calculateRawabitDecided();
                }}
                id={`umeedWaran-decrease`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
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
                defaultValue={0}
                required
                name={`umeedWaran-monthly`}
                id={`umeedWaran-monthly`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            {/* <Box>
              {view ? (
                <input
                  type="checkbox"
                  className="p-1 text-center min-w-full checkbox"
                  disabled
                  name={`umeedWaran-registered`}
                  id={`umeedWaran-registered`}
                />
              ) : (
                <input
                  type="checkbox"
                  className="p-1 text-center min-w-full checkbox"
                  name={`umeedWaran-registered`}
                  id={`umeedWaran-registered`}
                />
              )}
            </Box> */}
          </tr>
          <tr>
            <Box>رفقا</Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                defaultValue={0}
                required
                name={`rafaqa-start`}
                onChange={() => {
                  calcultate("rafaqa");
                  calculateRawabitDecided();
                }}
                id={`rafaqa-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                defaultValue={0}
                required
                name={`rafaqa-increase`}
                onChange={() => {
                  calcultate("rafaqa");
                  calculateRawabitDecided();
                }}
                id={`rafaqa-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                defaultValue={0}
                required
                name={`rafaqa-decrease`}
                onChange={() => {
                  calcultate("rafaqa");
                  calculateRawabitDecided();
                }}
                id={`rafaqa-decrease`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
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
                defaultValue={0}
                required
                name={`rafaqa-monthly`}
                id={`rafaqa-monthly`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            {/* <Box>
              {view ? (
                <input
                  type="checkbox"
                  className="p-1 text-center min-w-full checkbox"
                  disabled={view}
                  name={`rafaqa-registered`}
                  id={`rafaqa-registered`}
                />
              ) : (
                <input
                  type="checkbox"
                  className="p-1 text-center min-w-full checkbox"
                  name={`rafaqa-registered`}
                  id={`rafaqa-registered`}
                />
              )}
            </Box> */}
          </tr>
          <tr>
            <Box>کارکنان</Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                defaultValue={0}
                required
                name={`karkunan-start`}
                onChange={() => calcultate("karkunan")}
                id={`karkunan-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                defaultValue={0}
                required
                name={`karkunan-increase`}
                onChange={() => calcultate("karkunan")}
                id={`karkunan-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                defaultValue={0}
                required
                name={`karkunan-decrease`}
                onChange={() => calcultate("karkunan")}
                id={`karkunan-decrease`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
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
                defaultValue={0}
                required
                name={`karkunan-monthly`}
                id={`karkunan-monthly`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            {/* <Box>
              {view ? (
                <input
                  type="checkbox"
                  className="p-1 text-center min-w-full checkbox"
                  disabled={view}
                  name={`karkunan-registered`}
                  id={`karkunan-registered`}
                />
              ) : (
                <input
                  type="checkbox"
                  className="p-1 text-center min-w-full checkbox"
                  name={`karkunan-registered`}
                  id={`karkunan-registered`}
                />
              )}
            </Box> */}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
