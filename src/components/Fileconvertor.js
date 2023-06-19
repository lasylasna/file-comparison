import React, { useEffect, useRef, useState } from "react";
import CsvDownloader from "./CsvDownloader";
import csvtojson from "csvtojson";
import data from "./data.json";
import upload from "./images/upload.png";
import dx_logo from "./images/dx_logo.png";
import "./Header.css";

const Fileconvertor = () => {
  const [jsonData, setJsonData] = useState(null);
  const [csvJsonData, setCsvJsonData] = useState(data);
  const [dataArray, setDataArray] = useState([]);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversionArray, setConversionArray] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(
    `Please click on "Click to add SortInfo" and wait until it changes to "Download".`
  );
  const [loadingMessage2, setLoadingMessage2] = useState(
    ` Please keep the window open and be patient as the process may take a few minutes, depending on the speed of your internet connection.`
  );
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (conversionArray.length > 0) {
      setLoading(true);
    }
  }, [conversionArray.length]);

  useEffect(() => {
    if (dataArray.length > 0) {
      setLoading(false);
    }
  }, [dataArray.length]);

  const handleFileUpload = (event) => {
    setDataArray([]);
    const file = event.target.files[0];
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const jsonData = convertToJSON(text);
      setJsonData(jsonData);
    };
    reader.readAsText(file);
  };

  const handleCsvFileUpload = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = async (e, index) => {
      const text = e.target.result;
      const tempJsonData = await csvtojson().fromString(text);
      setCsvJsonData(tempJsonData);
    };

    reader.readAsText(file);
  };

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

  const handleClick = async () => {
    await filterIfSubset(csvJsonData, jsonData);
    // updateState();
  };

  const filterIfSubset = async (csv, textData) => {
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
    console.log(csv.length, textData.length);
    //let tempPercentage;
    //const subset = data.slice(0, 10);
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
      //conversionArray.push(tempArray)
      //updateArrayLength(tempArray);
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

          //conversionArray.push(tempArray)
          // updateArrayLength(tempArray);
          break;
        }
      }
    });

    //}
    finalArray = tempArray;
    setDataArray(tempArray);
    console.log(dataArray);
    return dataArray;
  };

  return (
    <div className="header-div">
    <img src={dx_logo} className="logo" />
      {dataArray.length > 0
        ? null
        : fileName && (
            <div className="header-loading-message">
              <p>{loadingMessage} </p>
              <hr />
              <p>{loadingMessage2} </p>
            </div>
          )}

      <div className="file-uploder">
        <div>
          <div>
            <div className="image-upload">
              <label htmlFor="file-input">
                <img src={upload} id="upload-img" />
              </label>

              <input
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                id="file-input"
                name="file-input"
              />
              <label htmlFor="file-input">{fileName}</label>
            </div>
            {dataArray.length > 0 ? (
              <div>
                <CsvDownloader dataArray={dataArray} fileName="data.csv" />
              </div>
            ) : (
              <div>
                {fileName && (
                  <button
                    className="button-71"
                    role="button"
                    onClick={handleClick}
                  >
                    Click to add SortInfo
                  </button>
                )}
              </div>
            )}
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Fileconvertor;
