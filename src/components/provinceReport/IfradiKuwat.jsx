import { Box } from "../halqa";

  export const IfradiKuwat = ({data}) => {
    const calcultate= (v)=>{
      // (start + increase)- decrease
      const s = parseInt(data?.[`${v}-start`]);
      const i = parseInt(data?.[`${v}-increase`]);
      const d = parseInt(data?.[`${v}-decrease`]);
      return (s+i)-d;
    }
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
                  value={calcultate('arkan')}
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
                  value={calcultate('umeedWaran')}
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
              <Box>رفقاء</Box>
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
                  value={calcultate('rafaqa')}
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
                  value={calcultate('karkunan')}
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
            <tr>
              <Box>شاہین</Box>
              <Box>
                <input
                  type="number"
                  name={`shaheen-start`}
                  id={`shaheen-start`}
                  className="p-1 text-center min-w-full"
                />
              </Box>
              <Box>
                <input
                  type="number"
                  name={`shaheen-increase`}
                  id={`shaheen-increase`}
                  className="p-1 text-center min-w-full"
                />
              </Box>
              <Box>
                <input
                  type="number"
                  name={`shaheen-decrease`}
                  id={`shaheen-decrease`}
                  className="p-1 text-center min-w-full"
                />
              </Box>
              <Box>
                <input
                  type="number"
                  name={`shaheen-end`}
                  id={`shaheen-end`}
                  value={calcultate('shaheen')}
                  className="p-1 text-center min-w-full"
                />
              </Box>
              <Box>
                <input
                  type="number"
                  name={`shaheen-annual`}
                  id={`shaheen-annual`}
                  className="p-1 text-center min-w-full"
                />
              </Box>
              <Box>
                <input
                  type="checkbox"
                  className="p-1 text-center min-w-full checkbox"
                  name={`shaheen-registered`}
                  id={`shaheen-registered`}
                />
              </Box>
            </tr>
            <tr>
              <Box>ممبرز</Box>
              <Box>
                <input
                  type="number"
                  name={`members-start`}
                  id={`members-start`}
                  className="p-1 text-center min-w-full"
                />
              </Box>
              <Box>
                <input
                  type="number"
                  name={`members-increase`}
                  id={`members-increase`}
                  className="p-1 text-center min-w-full"
                />
              </Box>
              <Box>
                <input
                  type="number"
                  name={`members-decrease`}
                  id={`members-decrease`}
                  className="p-1 text-center min-w-full"
                />
              </Box>
              <Box>
                <input
                  type="number"
                  name={`members-end`}
                  id={`members-end`}
                  value={calcultate('members')}
                  className="p-1 text-center min-w-full"
                />
              </Box>
              <Box>
                <input
                  type="number"
                  name={`members-annual`}
                  id={`members-annual`}
                  className="p-1 text-center min-w-full"
                />
              </Box>
              <Box>
                <input
                  type="checkbox"
                  className="p-1 text-center min-w-full checkbox"
                  name={`members-registered`}
                  id={`members-registered`}
                />
              </Box>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  