export const toJson = (formData) => {
  const obj = {};
  formData.forEach(function (value, key) {
    obj[key] = value;
  });
  return obj;
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

    result[section][attribute] = data[key];
    return null;
  }

  const result = {};

  Object.keys(data).forEach((key) => {
    const processedKey = processKey(key);

    // if (processedKey !== null) {
    result[processedKey] = data?.[key] || null;
    // }
  });

  return result;
};

export const reverseDataFormat = (data) => {
  const obj = {};
  Object.keys(data).forEach((i) => {
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
