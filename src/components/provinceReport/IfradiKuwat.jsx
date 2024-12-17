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
                  required
                  name={`arkan-start`}
                  id={`arkan-start`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  required
                  name={`arkan-manualStart`}
                  id={`arkan-manualStart`}
                  className="p-1 text-center "
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("arkan-start").value),
                      parseInt(
                        document.getElementById("arkan-manualStart").value
                      ),
                      "arkan-startSum"
                    )
                  }
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={
                    document.getElementById("arkan-startSum")?.value
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
                  required
                  name={`arkan-increase`}
                  id={`arkan-increase`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
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
                  defaultValue={
                    document.getElementById("arkan-increaseSum")?.value
                  }
                  required
                  name={`arkan-increaseSum`}
                  id={`arkan-increaseSum`}
                  className="p-1 text-center "
                />
              </div>
            </Box>
            <Box>
              <div className="flex w-full">
                <input
                  readOnly={true}
                  type="number"
                  required
                  name={`arkan-decrease`}
                  id={`arkan-decrease`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  required
                  name={`arkan-manualDecrease`}
                  id={`arkan-manualDecrease`}
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
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={
                    document.getElementById("arkan-decreaseSum")?.value
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
                // value={
                //   document.getElementById("arkan-increaseSum")?.value +
                //   document.getElementById("arkan-startSum")?.value -
                //   document.getElementById("arkan-decreaseSum")?.value
                // }
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
                  required
                  name={`umeedWaran-start`}
                  id={`umeedWaran-start`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  required
                  name={`umeedWaran-manualStart`}
                  id={`umeedWaran-manualStart`}
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(
                        document.getElementById("umeedWaran-start").value
                      ),
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
                    document.getElementById("umeedWaran-startSum")?.value
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
                  required
                  name={`umeedWaran-increase`}
                  id={`umeedWaran-increase`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  required
                  name={`umeedWaran-manualIncrease`}
                  id={`umeedWaran-manualIncrease`}
                  className="p-1 text-center "
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(
                        document.getElementById("umeedWaran-increase").value
                      ),
                      parseInt(
                        document.getElementById("umeedWaran-manualIncrease")
                          .value
                      ),
                      "umeedWaran-increaseSum"
                    )
                  }
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={
                    document.getElementById("umeedWaran-increaseSum")?.value
                  }
                  required
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
                  required
                  name={`umeedWaran-decrease`}
                  id={`umeedWaran-decrease`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  required
                  name={`umeedWaran-manualDecrease`}
                  id={`umeedWaran-manualDecrease`}
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(
                        document.getElementById("umeedWaran-decrease").value
                      ),
                      parseInt(
                        document.getElementById("umeedWaran-manualDecrease")
                          .value
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
                  defaultValue={
                    document.getElementById("umeedWaran-decreaseSum")?.value
                  }
                  required
                  name={`umeedWaran-decreaseSum`}
                  id={`umeedWaran-decreaseSum`}
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
                  required
                  name={`rafaqa-start`}
                  id={`rafaqa-start`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  required
                  name={`rafaqa-manualStart`}
                  id={`rafaqa-manualStart`}
                  className="p-1 text-center "
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("rafaqa-start").value),
                      parseInt(
                        document.getElementById("rafaqa-manualStart").value
                      ),
                      "rafaqa-startSum"
                    )
                  }
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={
                    document.getElementById("rafaqa-startSum")?.value
                  }
                  required
                  name={`rafaqa-startSum`}
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
                  required
                  name={`rafaqa-increase`}
                  id={`rafaqa-increase`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  required
                  name={`rafaqa-manualIncrease`}
                  id={`rafaqa-manualIncrease`}
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(
                        document.getElementById("rafaqa-increase").value
                      ),
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
                  defaultValue={
                    document.getElementById("rafaqa-increaseSum")?.value
                  }
                  required
                  name={`rafaqa-increaseSum`}
                  id={`rafaqa-increaseSum`}
                  className="p-1 text-center "
                />
              </div>
            </Box>
            <Box>
              <div className="flex w-full">
                <input
                  readOnly={true}
                  type="number"
                  required
                  name={`rafaqa-decrease`}
                  id={`rafaqa-decrease`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  required
                  name={`rafaqa-manualDecrease`}
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(
                        document.getElementById("rafaqa-decrease").value
                      ),
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
                  defaultValue={
                    document.getElementById("rafaqa-decreaseSum")?.value
                  }
                  required
                  name={`rafaqa-decreaseSum`}
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
                  required
                  name={`karkunan-start`}
                  id={`karkunan-start`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
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
                  defaultValue={
                    document.getElementById("karkunan-startSum")?.value
                  }
                  required
                  name={`karkunan-startSum`}
                  id={`karkunan-startSum`}
                  className="p-1 text-center "
                />
              </div>
            </Box>
            <Box>
              <div className="flex w-full">
                <input
                  readOnly={true}
                  type="number"
                  required
                  name={`karkunan-increase`}
                  id={`karkunan-increase`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  required
                  name={`karkunan-manualIncrease`}
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(
                        document.getElementById("karkunan-increase").value
                      ),
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
                  defaultValue={
                    document.getElementById("karkunan-increaseSum")?.value
                  }
                  required
                  name={`karkunan-increaseSum`}
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
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  required
                  name={`karkunan-manualDecrease`}
                  id={`karkunan-manualDecrease`}
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(
                        document.getElementById("karkunan-decrease").value
                      ),
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
                  defaultValue={
                    document.getElementById("karkunan-decreaseSum")?.value
                  }
                  required
                  name={`karkunan-decreaseSum`}
                  id={`karkunan-decreaseSum`}
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
                  required
                  name={`shaheen-start`}
                  id={`shaheen-start`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  required
                  name={`shaheen-manualStart`}
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("shaheen-start").value),
                      parseInt(
                        document.getElementById("shaheen-manualStart").value
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
                  defaultValue={
                    document.getElementById("shaheen-startSum")?.value
                  }
                  required
                  name={`shaheen-startSum`}
                  id={`shaheen-startSum`}
                  className="p-1 text-center "
                />
              </div>
            </Box>
            <Box>
              <div className="flex w-full">
                <input
                  readOnly={true}
                  type="number"
                  required
                  name={`shaheen-increase`}
                  id={`shaheen-increase`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  required
                  name={`shaheen-manualIncrease`}
                  id={`shaheen-manualIncrease`}
                  className="p-1 text-center "
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(
                        document.getElementById("shaheen-increase").value
                      ),
                      parseInt(
                        document.getElementById("shaheen-manualIncrease").value
                      ),
                      "shaheen-increaseSum"
                    )
                  }
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={
                    document.getElementById("shaheen-increaseSum")?.value
                  }
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
                  required
                  name={`shaheen-decrease`}
                  id={`shaheen-decrease`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  required
                  name={`shaheen-manualDecrease`}
                  id={`shaheen-manualDecrease`}
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(
                        document.getElementById("shaheen-decrease").value
                      ),
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
                  defaultValue={
                    document.getElementById("shaheen-decreaseSum")?.value
                  }
                  required
                  name={`shaheen-decreaseSum`}
                  id={`shaheen-decreaseSum`}
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
                  required
                  name={`members-start`}
                  id={`members-start`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  required
                  name={`members-manualStart`}
                  id={`members-manualStart`}
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(document.getElementById("members-start").value),
                      parseInt(
                        document.getElementById("members-manualStart").value
                      ),
                      "members-startSum"
                    )
                  }
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={
                    document.getElementById("members-startSum")?.value
                  }
                  required
                  name={`members-startSum`}
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
                  required
                  name={`members-increase`}
                  id={`members-increase`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  required
                  name={`members-manualIncrease`}
                  id={`members-manualIncrease`}
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(
                        document.getElementById("members-increase").value
                      ),
                      parseInt(
                        document.getElementById("members-manualIncrease").value
                      ),
                      "members-increaseSum"
                    )
                  }
                  className="p-1 text-center "
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={
                    document.getElementById("members-increaseSum")?.value
                  }
                  required
                  name={`members-increaseSum`}
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
                  required
                  name={`members-decrease`}
                  id={`members-decrease`}
                  className="p-1 text-center "
                />
                +
                <input
                  readOnly={view}
                  type="number"
                  required
                  name={`members-manualDecrease`}
                  id={`members-manualDecrease`}
                  className="p-1 text-center "
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(
                        document.getElementById("members-decrease").value
                      ),
                      parseInt(
                        document.getElementById("members-manualDecrease").value
                      ),
                      "members-decreaseSum"
                    )
                  }
                />
                =
                <input
                  readOnly={true}
                  type="number"
                  defaultValue={
                    document.getElementById("members-decreaseSum")?.value
                  }
                  required
                  name={`members-decreaseSum`}
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
