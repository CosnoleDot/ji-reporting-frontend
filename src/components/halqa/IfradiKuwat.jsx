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
export const IfradiKuwat = () => {
  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full table">
        <thead>
          <tr>
            <Box type={"heading"}>افرادی قوت</Box>
            <Box>آغاز میں</Box>
            <Box>اضافہ</Box>
            <Box>کمی</Box>
            <Box>اختاتام</Box>
            <Box>سالانہ ہدف</Box>
            <Box>مرتب</Box>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Box>ارکان</Box>
            <Box>
              <input
                type="number"
                name={`arkan-start`}
                id={`arkan-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`arkan-increase`}
                id={`arkan-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`arkan-decrease`}
                id={`arkan-decrease`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`arkan-end`}
                id={`arkan-end`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
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
                type="number"
                name={`umeedWaran-start`}
                id={`umeedWaran-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`umeedWaran-increase`}
                id={`umeedWaran-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`umeedWaran-decrease`}
                id={`umeedWaran-decrease`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`umeedWaran-end`}
                id={`umeedWaran-end`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`umeedWaran-annual`}
                id={`umeedWaran-annual`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="checkbox"
                className="p-1 text-center min-w-full checkbox"
                name={`umeedWaran-registered`}
                id={`umeedWaran-registered`}
              />
            </Box>
          </tr>
          <tr>
            <Box>رفقا</Box>
            <Box>
              <input
                type="number"
                name={`rafaqa-start`}
                id={`rafaqa-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`rafaqa-increase`}
                id={`rafaqa-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`rafaqa-decrease`}
                id={`rafaqa-decrease`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`rafaqa-end`}
                id={`rafaqa-end`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`rafaqa-annual`}
                id={`rafaqa-annual`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="checkbox"
                className="p-1 text-center min-w-full checkbox"
                name={`rafaqa-registered`}
                id={`rafaqa-registered`}
              />
            </Box>
          </tr>
          <tr>
            <Box>کارکنان</Box>
            <Box>
              <input
                type="number"
                name={`karkunan-start`}
                id={`karkunan-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`karkunan-increase`}
                id={`karkunan-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`karkunan-decrease`}
                id={`karkunan-decrease`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`karkunan-end`}
                id={`karkunan-end`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`karkunan-annual`}
                id={`karkunan-annual`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="checkbox"
                className="p-1 text-center min-w-full checkbox"
                name={`karkunan-registered`}
                id={`karkunan-registered`}
              />
            </Box>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
