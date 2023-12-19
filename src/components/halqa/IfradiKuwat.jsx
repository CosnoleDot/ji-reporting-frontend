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
            <Box>سالانہ ہدف</Box>
            <Box>مرتب</Box>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Box>ارکان</Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                name={`arkan-start`}
                id={`arkan-start`}
                onChange={() => calcultate("arkan")}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                name={`arkan-increase`}
                id={`arkan-increase`}
                onChange={() => calcultate("arkan")}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                name={`arkan-decrease`}
                id={`arkan-decrease`}
                onChange={() => calcultate("arkan")}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly
                type="number"
                name={`arkan-end`}
                id={`arkan-end`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                name={`arkan-annual`}
                id={`arkan-annual`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>-</Box>
          </tr>
          <tr>
            <Box>امیدواران</Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                name={`umeedWaran-start`}
                onChange={() => calcultate("umeedWaran")}
                id={`umeedWaran-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                name={`umeedWaran-increase`}
                onChange={() => calcultate("umeedWaran")}
                id={`umeedWaran-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                name={`umeedWaran-decrease`}
                onChange={() => calcultate("umeedWaran")}
                id={`umeedWaran-decrease`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly
                type="number"
                name={`umeedWaran-end`}
                id={`umeedWaran-end`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                name={`umeedWaran-annual`}
                id={`umeedWaran-annual`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
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
            </Box>
          </tr>
          <tr>
            <Box>رفقا</Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                name={`rafaqa-start`}
                onChange={() => calcultate("rafaqa")}
                id={`rafaqa-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                name={`rafaqa-increase`}
                onChange={() => calcultate("rafaqa")}
                id={`rafaqa-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                name={`rafaqa-decrease`}
                onChange={() => calcultate("rafaqa")}
                id={`rafaqa-decrease`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly
                type="number"
                name={`rafaqa-end`}
                id={`rafaqa-end`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                name={`rafaqa-annual`}
                id={`rafaqa-annual`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
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
            </Box>
          </tr>
          <tr>
            <Box>کارکنان</Box>
            <Box>
              <input
                readOnly={view}
                type="number"
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
                name={`karkunan-end`}
                id={`karkunan-end`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                name={`karkunan-annual`}
                id={`karkunan-annual`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
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
            </Box>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
