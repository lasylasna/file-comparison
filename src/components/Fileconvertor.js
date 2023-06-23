import React, { useState } from "react";
import CsvDownloader from "./CsvDownloader";
import csvtojson from "csvtojson";
import data from "../jsonData/data.json";
import upload from "../images/upload.png";
import dx_logo from "../images/dx_logo.png";
import "./Fileconvertor.css";
import { useWorker } from "@koale/useworker";
import abbreviations from '../jsonData/abbreviations.json'
import filterIfSubset from "../utils/filterIfSubset"
import convertToJSON from "../utils/convertToJSON"

 
const Fileconvertor = () => {
  const [jsonData, setJsonData] = useState(null);
  const [csvJsonData, setCsvJsonData] = useState(data);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortWorker] = useWorker(filterIfSubset);
  const [completed, setCompleted] = useState(false);
  const [dataArray, setDataArray] = useState([]);

  const handleFileUpload = (event) => {
    //setDataArray([]);
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



  const runSort = async () => {
    try {
      setLoading(true);
      const result = await sortWorker(csvJsonData, jsonData,abbreviations); // non-blocking UI
      setLoading(false);
      setCompleted(true);
      setDataArray(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } 
  };

  return (
    <div className="header-div">
      <img src={dx_logo} className="logo" />
      {loading ? (
        <div className="wrap-loader">
          <div className="loader">
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="wrap-text">
              <div className="text">
                <span>L</span>
                <span>O</span>
                <span>A</span>
                <span>D</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
                <span>...</span>
              </div>
            </div>
          </div>
          <div className="loader-text">wait please</div>
        </div>
      ) : (
        <div className="file-uploder">
          <div>
            <div className="file-container">
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
                <hr />

                <label htmlFor="file-input">{fileName}</label>
                <hr />
              </div>
              {completed ? (
                <div>
                  <CsvDownloader dataArray={dataArray} fileName="data.csv" />
                </div>
              ) : (
                <div>
                  {fileName && (
                    <button
                      className="button-71"
                      role="button"
                      onClick={runSort}
                    >
                      Click to add SortInfo
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default Fileconvertor;
