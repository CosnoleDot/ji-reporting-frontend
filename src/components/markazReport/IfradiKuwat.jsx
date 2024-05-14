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
  const sumUpTwoValues = (val1, val2, final) => {
    document.getElementById(final).value = val1 + val2;
  };
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
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("arkan-start").value),
                      parseInt(
                        document.getElementById("arkan-manualStart").value
                      ),
                      "arkan-startSum"
                    )
                  }
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
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("arkan-start").value),
                      parseInt(
                        document.getElementById("arkan-manualStart").value
                      ),
                      "arkan-startSum"
                    )
                  }
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={
                    parseInt(document.getElementById("arkan-start")?.value) +
                    parseInt(
                      document.getElementById("arkan-manualStart")?.value
                    )
                  }
                  required
                  name={`arkan-startSum`}
                  id={`arkan-startSum`}
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
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("arkan-increase").value),
                      parseInt(
                        document.getElementById("arkan-manualIncrease").value
                      ),
                      "arkan-increaseSum"
                    )
                  }
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
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("arkan-increase").value),
                      parseInt(
                        document.getElementById("arkan-manualIncrease").value
                      ),
                      "arkan-increaseSum"
                    )
                  }
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  required
                  name={`arkan-increaseSum`}
                  id={`arkan-increaseSum`}
                  defaultValue={
                    parseInt(document.getElementById("arkan-increase")?.value) +
                    parseInt(
                      document.getElementById("arkan-manualIncrease")?.value
                    )
                  }
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
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("arkan-decrease").value),
                      parseInt(
                        document.getElementById("arkan-manualDecrease").value
                      ),
                      "arkan-decreaseSum"
                    )
                  }
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
                    {
                      sumUpTwoValues(
                        parseInt(
                          document.getElementById("arkan-decrease").value
                        ),
                        parseInt(
                          document.getElementById("arkan-manualDecrease").value
                        ),
                        "arkan-decreaseSum"
                      );
                     
                    }
                  }}
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={
                    parseInt(document.getElementById("arkan-decrease")?.value) +
                    parseInt(
                      document.getElementById("arkan-manualDecrease")?.value
                    )
                  }
                  required
                  name={`arkan-decreaseSum`}
                  id={`arkan-decreaseSum`}
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
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("umeedWaran-start").value),
                      parseInt(
                        document.getElementById("umeedWaran-manualStart").value
                      ),
                      "umeedWaran-startSum"
                    )
                  }
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
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("umeedWaran-start").value),
                      parseInt(
                        document.getElementById("umeedWaran-manualStart").value
                      ),
                      "umeedWaran-startSum"
                    )
                  }
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={
                    parseInt(document.getElementById("umeedWaran-start")?.value) +
                    parseInt(
                      document.getElementById("umeedWaran-manualStart")?.value
                    )
                  }
                  required
                  name={`umeedWaran-startSum`}
                  id={`umeedWaran-startSum`}
                  
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
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("umeedWaran-increase").value),
                      parseInt(
                        document.getElementById("umeedWaran-manualIncrease").value
                      ),
                      "umeedWaran-increaseSum"
                    )
                  }
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
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("umeedWaran-increase").value),
                      parseInt(
                        document.getElementById("umeedWaran-manualIncrease").value
                      ),
                      "umeedWaran-increaseSum"
                    )
                  }
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
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("umeedWaran-decrease").value),
                      parseInt(
                        document.getElementById("umeedWaran-manualDecrease").value
                      ),
                      "umeedWaran-decreaseSum"
                    )
                  }
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
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("umeedWaran-decrease").value),
                      parseInt(
                        document.getElementById("umeedWaran-manualDecrease").value
                      ),
                      "umeedWaran-decreaseSum"
                    )
                  }
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
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("rafaqa-start").value),
                      parseInt(
                        document.getElementById("rafaqa-manualStart").value
                      ),
                      "rafaqa-startSum"
                    )
                  }
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
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("rafaqa-increase").value),
                      parseInt(
                        document.getElementById("rafaqa-manualIncrease").value
                      ),
                      "rafaqa-increaseSum"
                    )
                  }
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
                  oonChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("rafaqa-decrease").value),
                      parseInt(
                        document.getElementById("rafaqa-manualDecrease").value
                      ),
                      "rafaqa-decreaseSum"
                    )
                  }
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
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("karkunan-start").value),
                      parseInt(
                        document.getElementById("karkunan-manualStart").value
                      ),
                      "karkunan-startSum"
                    )
                  }
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
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("karkunan-increase").value),
                      parseInt(
                        document.getElementById("karkunan-manualIncrease").value
                      ),
                      "karkunan-increaseSum"
                    )
                  }
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
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("karkunan-decrease").value),
                      parseInt(
                        document.getElementById("karkunan-manualDecrease").value
                      ),
                      "karkunan-decreaseSum"
                    )
                  }
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
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("karkunan-start").value),
                      parseInt(
                        document.getElementById("karkunan-manualStart").value
                      ),
                      "shaheen-startSum"
                    )
                  }
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
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("shaheen-increase").value),
                      parseInt(
                        document.getElementById("shaheen-manualIncrease").value
                      ),
                      "shaheen-increaseSum"
                    )
                  }
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
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("shaheen-decrease").value),
                      parseInt(
                        document.getElementById("shaheen-manualDecrease").value
                      ),
                      "shaheen-decreaseSum"
                    )
                  }
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
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("members-start").value),
                      parseInt(
                        document.getElementById("members-manualStart").value
                      ),
                      "members-startSum"
                    )
                  }
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
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("members-increase").value),
                      parseInt(
                        document.getElementById("members-manualIncrease").value
                      ),
                      "members-increaseSum"
                    )
                  }
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
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("members-decrease").value),
                      parseInt(
                        document.getElementById("members-manualDecrease").value
                      ),
                      "members-decreaseSum"
                    )
                  }
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
