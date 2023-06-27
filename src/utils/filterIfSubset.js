const filterIfSubset = (csv, textData, abbreviations) => {
 

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

 
    // if (text && text.Address1Postal.includes('"')) {
    //   text.Address1Postal = text.Address1Postal.split("'")[0]
    //   console.log( text.Address1Postal)
    // }
 

    for (var key in abbreviations) {
      let abrStd = abbreviations[key]["Standard"];
      let abrSfx = abbreviations[key]["Suffix"];
      let words;
      let lastWord;
      if (text.Address1Postal) { 
        words = text.Address1Postal.trim().split(" "); 
        lastWord = words[words.length - 1]; 
       // console.log(abrStd,abrSfx,text.Address1Postal)
        if(abrSfx == (lastWord)){
          
          break;
        }else if(abrStd == (lastWord)) { 
          text.Address1Postal = text.Address1Postal.replace(
            lastWord,
            abbreviations[key]["Suffix"]
          ); // Replace the value with the corresponding key
          //console.log(text.Address1Postal) 
          break;
        }
      }
    }

    // if (text.Address1Postal === text.Address2Postal) {
    //   text.Address2Postal = text.Address3Postal;
    // }

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
        //csv[j].SUBURBNAME.toUpperCase() == text.Address2Postal.toUpperCase() &&
        parseInt(csv[j].POSTCODE) == parseInt(text.PostCode)
      ) {
        // console.log(text)
        tempArray[i + 1]["SortInfo"] = csv[j].SORTINFO;
        break;
      }

      //  }
    }
  });

  //}
  finalArray = tempArray;
  return finalArray;
};

export default filterIfSubset;
