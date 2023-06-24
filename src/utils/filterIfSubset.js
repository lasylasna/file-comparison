const filterIfSubset = (csv, textData) => {

  let tempArray = [
    {
      Address1Postal: "Address1Postal",
      Address2Postal: "Address2Postal",
      Address3Postal: "Address3Postal",
      Address4Postal: "Address4Postal",
      Address5Postal: "Address5Postal",
      PostCode: "PostCode",
      SortInfo: "SortInfo",
    },
  ];
  let finalArray = [];
  let temp = {};
  textData.map((text, i) => {
    temp = {
      Address1Postal: text.Address1Postal,
      Address2Postal: text.Address2Postal,
      Address3Postal: text.Address3Postal,
      Address4Postal: text.Address4Postal,
      Address5Postal: text.Address5Postal,
      PostCode: text.PostCode,
      SortInfo: text.PostCode,
    };
    tempArray[i + 1] = temp;
    for (let j = 0; j < csv.length; j++) {
      if (
        (
          csv[j].HOUSENUMBER +
          " " +
          csv[j].STREETNAME +
          " " +
          csv[j].CUSTOM1
        ).toUpperCase() == text.Address1Postal.toUpperCase() &&
        parseInt(csv[j].POSTCODE) == parseInt(text.PostCode)
      ) {
        tempArray[i + 1]["SortInfo"] = csv[j].SORTINFO;
        break;
      }
    }
  });

  //}
  finalArray = tempArray;
  return finalArray;
};

export default filterIfSubset;
