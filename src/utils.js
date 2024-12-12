import instance from "./api/instrance";
import CryptoJS from "crypto-js";

export const toJson = (formData) => {
  const obj = {};
  formData.forEach(function (value, key) {
    obj[key] = value;
  });
  return obj;
};
// DECRYPT

export const decryptData = (data) => {
  try {
    if (data && data !== "") {
      const bytes = CryptoJS.AES.decrypt(
        data,
        process.env.REACT_APP_SECRET.replace(/['"]+/g, "")
      );
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

      if (decryptedData) {
        return decryptedData;
      }
    } else {
      return;
    }
  } catch (error) {
    console.log("Decryption failed or data is not encrypted:", error);
  }

  return data;
};
export const convertDataFormat = (data) => {
  function processKey(key) {
    const parts = key.split("-");
    if (parts.length === 1) {
      return key;
    }

    const section = parts[0];
    const attribute = parts.slice(1).join("-");

    if (!result[section]) {
      result[section] = {};
    }

    if (attribute === "registered") {
      result[section][attribute] = data[key] ? true : false;
    } else {
      result[section][attribute] = data[key];
    }
    return null;
  }

  const result = {};

  Object.keys(data).forEach((key) => {
    if (
      key === "umeedwaranFilled-sum" ||
      key === "manual-umeedwaranFilled" ||
      key === "rafaqaFilled-sum" ||
      key === "manual-rafaqaFilled"
    ) {
      return;
    } else {
      const processedKey = processKey(key);

      // if (processedKey !== null) {
      result[processedKey] = data?.[key] || null;
      // }
    }
  });

  return result;
};

export const reverseDataFormat = (data) => {
  const obj = {};
  Object.keys(data || {}).forEach((i) => {
    if (!data[i]) {
      obj[i] = null;
    } else if (typeof data[i] === "object") {
      Object.keys(data[i])
        .filter((j) => j !== "_id" && j !== "__v")
        .forEach((j) => {
          if (!data[i][j]) {
            obj[j] = null;
          } else if (typeof data[i][j] === "object") {
            Object.keys(data[i][j])
              .filter((k) => k !== "_id" && k !== "__v")
              .forEach((k) => {
                if (i === "mentionedActivityId" && j === "studyCircle") {
                  obj[j + "Mentioned-" + k] = data[i][j][k];
                } else if (i === "tdId" && j === "registered") {
                  obj["registeredTosee"] = data[i][j][k];
                } else {
                  obj[j + "-" + k] = data[i][j][k];
                }
              });
          } else {
            if (i === "tdId" && j === "registered") {
              obj["registeredTosee"] = data[i][j];
            } else if (i === "halqaLibId" && j === "registered") {
              obj["registeredLibrary"] = data[i][j];
            } else if (i === "wiId" && j === "registered") {
              obj["registeredWorker"] = data[i][j];
            } else {
              obj[j] = data[i][j];
            }
          }
        });
    } else {
      obj[i] = data[i];
    }
  });
  return obj;
};

export const getPReports = async (tab, id, areaType) => {
  try {
    const req = await instance.get(
      `/reports/${tab}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
          "Content-Type": "application/json",
        },
      },
      { AreaType: areaType, tab: tab }
    );
    return req?.data?.data;
  } catch (err) {
    console.log(err);
  }
};
export const validateForm = (form) => {
  // Check if any key in the object has an empty value
  return Object.entries(form).every(([key, value]) => value.trim() !== "");
};
export const validateSnakeCase = (input) => {
  // Regex to match snake_case format
  const regex = /^[a-z0-9]+(_[a-z0-9]+)*$/;
  return regex.test(input);
};
