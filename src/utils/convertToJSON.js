const convertToJSON = (text) => {
    const lines = text.replace(/\r/g, "").split("\n");
    const keys = lines[0].split("\t");
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split("\t");
      const obj = {};

      for (let j = 0; j < keys.length; j++) {
        obj[keys[j]] = values[j];
      }

      data.push(obj);
    }

    return data;
  };

  export default convertToJSON;