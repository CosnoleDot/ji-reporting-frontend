export const Box = ({ children, type }) => {
  return (
    <td
      className={`border text-center  p-1 ${
        type === "heading" ? "text-lg text-black" : ""
      }`}
    >
      {children}
    </td>
  );
};
export const IfradiKuwat = ({ view, id }) => {
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
            <Box>سالانہ ہدف</Box>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Box>ارکان</Box>
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
                required
                name={`arkan-start`}
                id={`arkan-start`}
                onChange={() => calcultate("arkan")}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
                required
                name={`arkan-increase`}
                id={`arkan-increase`}
                onChange={() => calcultate("arkan")}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
                required
                name={`arkan-decrease`}
                id={`arkan-decrease`}
                onChange={() => calcultate("arkan")}
                className="p-1 text-center min-w-full"
              />
            </Box>
            {
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
            }
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
                required
                name={`arkan-annual`}
                id={`arkan-annual`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>امیدواران</Box>
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
                required
                name={`umeedWaran-start`}
                id={`umeedWaran-start`}
                onChange={() => calcultate("umeedWaran")}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
                required
                onChange={() => calcultate("umeedWaran")}
                name={`umeedWaran-increase`}
                id={`umeedWaran-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
                required
                name={`umeedWaran-decrease`}
                id={`umeedWaran-decrease`}
                onChange={() => calcultate("umeedWaran")}
                className="p-1 text-center min-w-full"
              />
            </Box>
            {
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
            }
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
                required
                name={`umeedWaran-annual`}
                id={`umeedWaran-annual`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>رفقا</Box>
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
                required
                name={`rafaqa-start`}
                onChange={() => calcultate("rafaqa")}
                id={`rafaqa-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
                required
                name={`rafaqa-increase`}
                id={`rafaqa-increase`}
                onChange={() => calcultate("rafaqa")}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
                required
                name={`rafaqa-decrease`}
                onChange={() => calcultate("rafaqa")}
                id={`rafaqa-decrease`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            {
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
            }
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
                required
                name={`rafaqa-annual`}
                id={`rafaqa-annual`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>کارکنان</Box>
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
                required
                name={`karkunan-start`}
                id={`karkunan-start`}
                onChange={() => calcultate("karkunan")}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly
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
                readOnly
                type="number"
                defaultValue={0}
                required
                name={`karkunan-decrease`}
                id={`karkunan-decrease`}
                onChange={() => calcultate("karkunan")}
                className="p-1 text-center min-w-full"
              />
            </Box>
            {
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
            }
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
                required
                name={`karkunan-annual`}
                id={`karkunan-annual`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>شاہین</Box>
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
                required
                name={`shaheen-start`}
                onChange={() => calcultate("shaheen")}
                id={`shaheen-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly
                onChange={() => calcultate("shaheen")}
                type="number"
                defaultValue={0}
                required
                name={`shaheen-increase`}
                id={`shaheen-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
                required
                name={`shaheen-decrease`}
                id={`shaheen-decrease`}
                onChange={() => calcultate("shaheen")}
                className="p-1 text-center min-w-full"
              />
            </Box>
            {
              <Box>
                <input
                  readOnly
                  type="number"
                  defaultValue={0}
                  required
                  name={`shaheen-end`}
                  id={`shaheen-end`}
                  className="p-1 text-center min-w-full"
                />
              </Box>
            }
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
                required
                name={`shaheen-annual`}
                id={`shaheen-annual`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>ممبرز</Box>
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
                required
                name={`members-start`}
                onChange={() => calcultate("members")}
                id={`members-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
                required
                name={`members-increase`}
                onChange={() => calcultate("members")}
                id={`members-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
                required
                name={`members-decrease`}
                onChange={() => calcultate("members")}
                id={`members-decrease`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            {
              <Box>
                <input
                  readOnly
                  type="number"
                  defaultValue={0}
                  required
                  name={`members-end`}
                  id={`members-end`}
                  className="p-1 text-center min-w-full"
                />
              </Box>
            }
            <Box>
              <input
                readOnly
                type="number"
                defaultValue={0}
                required
                name={`members-annual`}
                id={`members-annual`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
