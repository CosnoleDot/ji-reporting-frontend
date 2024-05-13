import { maqamRawabitDecided } from "./ToseeDawat";

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
            <Box> ماہانہ ہدف</Box>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Box>ارکان</Box>
            <Box>
              <div className="flex">
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`arkan-start`}
                  id={`arkan-start`}
                  onChange={() => {
                    calcultate("arkan");
                    maqamRawabitDecided();
                  }}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  defaultValue={0}
                  required
                  name={`arkan-manualStart`}
                  id={`arkan-manualStart`}
                  onChange={() => {
                    calcultate("arkan");
                    maqamRawabitDecided();
                  }}
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`arkan-startSum`}
                  id={`arkan-startSum`}
                  onChange={() => {
                    calcultate("arkan");
                    maqamRawabitDecided();
                  }}
                  className="p-1 text-center "
                />
              </div>
            </Box>
            <Box>
              <div className="flex w-full">
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`arkan-increase`}
                  id={`arkan-increase`}
                  onChange={() => {
                    calcultate("arkan");
                    maqamRawabitDecided();
                  }}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  defaultValue={0}
                  required
                  name={`arkan-manualIncrease`}
                  id={`arkan-manualIncrease`}
                  onChange={() => {
                    calcultate("arkan");
                    maqamRawabitDecided();
                  }}
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`arkan-increaseSum`}
                  id={`arkan-increaseSum`}
                  onChange={() => {
                    calcultate("arkan");
                    maqamRawabitDecided();
                  }}
                  className="p-1 text-center "
                />
              </div>
            </Box>
            <Box>
              <div className="flex w-full">
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`arkan-decrease`}
                  id={`arkan-decrease`}
                  onChange={() => {
                    calcultate("arkan");
                    maqamRawabitDecided();
                  }}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  defaultValue={0}
                  required
                  name={`arkan-manualDecrease`}
                  id={`arkan-manualDecrease`}
                  onChange={() => {
                    calcultate("arkan");
                    maqamRawabitDecided();
                  }}
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`arkan-decreaseSum`}
                  id={`arkan-decreaseSum`}
                  onChange={() => {
                    calcultate("arkan");
                    maqamRawabitDecided();
                  }}
                  className="p-1 text-center "
                />
              </div>
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                defaultValue={0}
                required
                name={`arkan-end`}
                id={`arkan-end`}
                className="p-1 text-center "
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                defaultValue={0}
                required
                name={`arkan-monthly`}
                id={`arkan-monthly`}
                className="p-1 text-center "
              />
            </Box>
          </tr>
          {/* ********************Umeedwaran***************** */}
          <tr>
            <Box>امیدواران</Box>
            <Box>
              <div className="flex w-full">
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`umeedWaran-start`}
                  id={`umeedWaran-start`}
                  onChange={() => {
                    calcultate("umeedWaran");
                    maqamRawabitDecided();
                  }}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  defaultValue={0}
                  required
                  name={`umeedWaran-manualStart`}
                  id={`umeedWaran-manualStart`}
                  onChange={() => {
                    calcultate("umeedWaran");
                    maqamRawabitDecided();
                  }}
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`umeedWaran-startSum`}
                  id={`umeedWaran-startSum`}
                  onChange={() => {
                    calcultate("umeedWaran");
                    maqamRawabitDecided();
                  }}
                  className="p-1 text-center "
                />
              </div>
            </Box>
            <Box>
              <div className="flex w-full">
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  onChange={() => {
                    calcultate("umeedWaran");
                    maqamRawabitDecided();
                  }}
                  name={`umeedWaran-increase`}
                  id={`umeedWaran-increase`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  defaultValue={0}
                  required
                  onChange={() => {
                    calcultate("umeedWaran");
                    maqamRawabitDecided();
                  }}
                  name={`umeedWaran-manualIncrease`}
                  id={`umeedWaran-manualIncrease`}
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  onChange={() => {
                    calcultate("umeedWaran");
                    maqamRawabitDecided();
                  }}
                  name={`umeedWaran-increaseSum`}
                  id={`umeedWaran-increaseSum`}
                  className="p-1 text-center "
                />
              </div>
            </Box>
            <Box>
              <div className="flex  w-full">
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`umeedWaran-decrease`}
                  id={`umeedWaran-decrease`}
                  onChange={() => {
                    calcultate("umeedWaran");
                    maqamRawabitDecided();
                  }}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  defaultValue={0}
                  required
                  name={`umeedWaran-manualDecrease`}
                  id={`umeedWaran-manualDecrease`}
                  onChange={() => {
                    calcultate("umeedWaran");
                    maqamRawabitDecided();
                  }}
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`umeedWaran-decreaseSum`}
                  id={`umeedWaran-decreaseSum`}
                  onChange={() => {
                    calcultate("umeedWaran");
                    maqamRawabitDecided();
                  }}
                  className="p-1 text-center "
                />
              </div>
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                defaultValue={0}
                required
                name={`umeedWaran-end`}
                id={`umeedWaran-end`}
                className="p-1 text-center "
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                defaultValue={0}
                required
                name={`umeedWaran-monthly`}
                id={`umeedWaran-monthly`}
                className="p-1 text-center "
              />
            </Box>
          </tr>
          {/* ********************Rafqa***************** */}

          <tr>
            <Box>رفقا</Box>
            <Box>
              <div className="flex w-full">
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`rafaqa-start`}
                  onChange={() => calcultate("rafaqa")}
                  id={`rafaqa-start`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  defaultValue={0}
                  required
                  name={`rafaqa-manualStart`}
                  onChange={() => calcultate("rafaqa")}
                  id={`rafaqa-manualStart`}
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`rafaqa-startSum`}
                  onChange={() => calcultate("rafaqa")}
                  id={`rafaqa-startSum`}
                  className="p-1 text-center "
                />
              </div>
            </Box>
            <Box>
              <div className="flex w-full">
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`rafaqa-increase`}
                  id={`rafaqa-increase`}
                  onChange={() => calcultate("rafaqa")}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  defaultValue={0}
                  required
                  name={`rafaqa-manualIncrease`}
                  id={`rafaqa-manualIncrease`}
                  onChange={() => calcultate("rafaqa")}
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`rafaqa-increaseSum`}
                  id={`rafaqa-increaseSum`}
                  onChange={() => calcultate("rafaqa")}
                  className="p-1 text-center "
                />
              </div>
            </Box>
            <Box>
              <div className="flex w-full">
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`rafaqa-decrease`}
                  onChange={() => calcultate("rafaqa")}
                  id={`rafaqa-decrease`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  defaultValue={0}
                  required
                  name={`rafaqa-manualDecrease`}
                  onChange={() => calcultate("rafaqa")}
                  id={`rafaqa-manualDecrease`}
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`rafaqa-decreaseSum`}
                  onChange={() => calcultate("rafaqa")}
                  id={`rafaqa-decreaseSum`}
                  className="p-1 text-center "
                />
              </div>
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                defaultValue={0}
                required
                name={`rafaqa-end`}
                id={`rafaqa-end`}
                className="p-1 text-center "
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                defaultValue={0}
                required
                name={`rafaqa-monthly`}
                id={`rafaqa-monthly`}
                className="p-1 text-center "
              />
            </Box>
          </tr>
          {/* ********************Karkunan***************** */}

          <tr>
            <Box>کارکنان</Box>
            <Box>
              <div className="flex w-full">
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`karkunan-start`}
                  id={`karkunan-start`}
                  onChange={() => calcultate("karkunan")}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  defaultValue={0}
                  required
                  name={`karkunan-manualStart`}
                  id={`karkunan-manualStart`}
                  onChange={() => calcultate("karkunan")}
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`karkunan-startSum`}
                  id={`karkunan-startSum`}
                  onChange={() => calcultate("karkunan")}
                  className="p-1 text-center "
                />
              </div>
            </Box>
            <Box>
              <div className="flex w-full">
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`karkunan-increase`}
                  onChange={() => calcultate("karkunan")}
                  id={`karkunan-increase`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  defaultValue={0}
                  required
                  name={`karkunan-manualIncrease`}
                  onChange={() => calcultate("karkunan")}
                  id={`karkunan-manualIncrease`}
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`karkunan-increaseSum`}
                  onChange={() => calcultate("karkunan")}
                  id={`karkunan-increaseSum`}
                  className="p-1 text-center "
                />
              </div>
            </Box>
            <Box>
              <div className="flex w-full">
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`karkunan-decrease`}
                  id={`karkunan-decrease`}
                  onChange={() => calcultate("karkunan")}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  defaultValue={0}
                  required
                  name={`karkunan-manualDecrease`}
                  id={`karkunan-manualDecrease`}
                  onChange={() => calcultate("karkunan")}
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`karkunan-decreaseSum`}
                  id={`karkunan-decreaseSum`}
                  onChange={() => calcultate("karkunan")}
                  className="p-1 text-center "
                />
              </div>
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                defaultValue={0}
                required
                name={`karkunan-end`}
                id={`karkunan-end`}
                className="p-1 text-center "
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                defaultValue={0}
                required
                name={`karkunan-monthly`}
                id={`karkunan-monthly`}
                className="p-1 text-center "
              />
            </Box>
          </tr>
          {/* ********************Shaheen***************** */}

          <tr>
            <Box>شاہین</Box>
            <Box>
              <div className="flex w-full">
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`shaheen-start`}
                  onChange={() => calcultate("shaheen")}
                  id={`shaheen-start`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  defaultValue={0}
                  required
                  name={`shaheen-manualStart`}
                  onChange={() => calcultate("shaheen")}
                  id={`shaheen-manualStart`}
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`shaheen-startSum`}
                  onChange={() => calcultate("shaheen")}
                  id={`shaheen-startSum`}
                  className="p-1 text-center "
                />
              </div>
            </Box>
            <Box>
              <div className="flex w-full">
                <input
                  readOnly={true}
                  onChange={() => calcultate("shaheen")}
                  type="number"
                  defaultValue={0}
                  required
                  name={`shaheen-increase`}
                  id={`shaheen-increase`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  onChange={() => calcultate("shaheen")}
                  type="number"
                  defaultValue={0}
                  required
                  name={`shaheen-manualIncrease`}
                  id={`shaheen-manualIncrease`}
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  onChange={() => calcultate("shaheen")}
                  type="number"
                  defaultValue={0}
                  required
                  name={`shaheen-increaseSum`}
                  id={`shaheen-increaseSum`}
                  className="p-1 text-center "
                />
              </div>
            </Box>
            <Box>
              <div className="flex w-full">
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`shaheen-decrease`}
                  id={`shaheen-decrease`}
                  onChange={() => calcultate("shaheen")}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  defaultValue={0}
                  required
                  name={`shaheen-manualDecrease`}
                  id={`shaheen-manualDecrease`}
                  onChange={() => calcultate("shaheen")}
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`shaheen-decreaseSum`}
                  id={`shaheen-decreaseSum`}
                  onChange={() => calcultate("shaheen")}
                  className="p-1 text-center "
                />
              </div>
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                defaultValue={0}
                required
                name={`shaheen-end`}
                id={`shaheen-end`}
                className="p-1 text-center "
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                defaultValue={0}
                required
                name={`shaheen-monthly`}
                id={`shaheen-monthly`}
                className="p-1 text-center "
              />
            </Box>
          </tr>
          {/* ********************Members***************** */}

          <tr>
            <Box>ممبرز</Box>
            <Box>
              <div className="flex w-full">
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`members-start`}
                  onChange={() => calcultate("members")}
                  id={`members-start`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  defaultValue={0}
                  required
                  name={`members-manualStart`}
                  onChange={() => calcultate("members")}
                  id={`members-manualStart`}
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`members-startSum`}
                  onChange={() => calcultate("members")}
                  id={`members-startSum`}
                  className="p-1 text-center "
                />
              </div>
            </Box>
            <Box>
              <div className="flex w-full">
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`members-increase`}
                  onChange={() => calcultate("members")}
                  id={`members-increase`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  defaultValue={0}
                  required
                  name={`members-manualIncrease`}
                  onChange={() => calcultate("members")}
                  id={`members-manualIncrease`}
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`members-increaseSum`}
                  onChange={() => calcultate("members")}
                  id={`members-increaseSum`}
                  className="p-1 text-center "
                />
              </div>
            </Box>
            <Box>
              <div className="flex w-full">
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`members-decrease`}
                  onChange={() => calcultate("members")}
                  id={`members-decrease`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  defaultValue={0}
                  required
                  name={`members-manualDecrease`}
                  onChange={() => calcultate("members")}
                  id={`members-manualDecrease`}
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={0}
                  required
                  name={`members-decreaseSum`}
                  onChange={() => calcultate("members")}
                  id={`members-decreaseSum`}
                  className="p-1 text-center "
                />
              </div>
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                defaultValue={0}
                required
                name={`members-end`}
                id={`members-end`}
                className="p-1 text-center "
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                defaultValue={0}
                required
                name={`members-monthly`}
                id={`members-monthly`}
                className="p-1 text-center "
              />
            </Box>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
