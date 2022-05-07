import React, { useState, useEffect } from "react";
import Btn from "./Btn";
import "./App.css";
import { toJpeg } from "html-to-image";
import * as download from "downloadjs";

// editing options and formats..

const defaultOptions = [
  {
    name: "Brightness",
    property: "brightness",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Contrast",
    property: "contrast",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Saturation",
    property: "saturate",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Gray Scale",
    property: "grayscale",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Sepia",
    property: "sepia",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Hue Rotate",
    property: "hue-rotate",
    value: 0,
    range: {
      min: 0,
      max: 360,
    },
    unit: "deg",
  },
  {
    name: "Blur",
    property: "blur",
    value: 0,
    range: {
      min: 0,
      max: 20,
    },
    unit: "px",
  },
];

// states

function App() {
  let [file, setFile] = useState(null);
  let [btnOptions, setBtnOptions] = useState(defaultOptions);
  let [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  let selectedOption = btnOptions[selectedOptionIndex];

  useEffect(() => {
    setBtnOptions(defaultOptions);
    setSelectedOptionIndex(0);
  }, [file]);

  // getting the image from the user..

  function handelImg(e) {
    setFile(e.target.files[0]);
  }

  function handleRange(e) {
    // update setBtnOptions options not default options

    setBtnOptions((preValues) => {
      return preValues.map((option, index) => {
        if (selectedOptionIndex !== index) return option;
        else return { ...option, value: e.target.value };
      });
    });
  }

  // getting the styles and updating them dynamically..

  function getImgStyle() {
    let filters = btnOptions.map((option, index) => {
      return `${option.property}(${option.value}${option.unit})`;
    });
    return { filter: filters.join(" ") };
  }

  // downloading the edited image..

  function downloadImg() {
    var node = document.getElementById("image");
    toJpeg(node)
      .then((dataUrl) => {
        console.log(dataUrl);
        download(dataUrl, `${Date.now()}Tathagata_Chakraborty`);
      })
      .catch((error) => {
        console.error("Oops, Something went wrong!", error);
      });
  }

  // The UI starts here...

  return (
    <>
      <div className="main">
        <div className="container">
          <h1>Editor</h1>
          {file ? (
            <img
              id="image"
              src={file ? URL.createObjectURL(file) : null}
              alt={file ? file.name : null}
              style={getImgStyle()}
            />
          ) : (
            <h4>Your image will appear here...</h4>
          )}

          <div className="btnsDiv">
            {btnOptions.map((data, index) => (
              <Btn
                key={index}
                name={data.name}
                handleClick={() => {
                  setSelectedOptionIndex(index);
                }}
                active={index === selectedOptionIndex}
                isDisable={file ? false : true}
              />
            ))}
          </div>
          <div className="rangeDiv">
            <p className="rangeValue">
              {selectedOption.value} {selectedOption.unit}
            </p>
            <input
              type="range"
              min={selectedOption.range.min}
              max={selectedOption.range.max}
              value={selectedOption.value}
              onChange={handleRange}
              disabled={file ? false : true}
            />
          </div>
        </div>

        <div className="rightDiv">
          <button
            className="downloadBtn"
            onClick={downloadImg}
            disabled={file ? false : true}
          >
            Download
          </button>
          <input
            type="file"
            name="srcImg"
            onChange={handelImg}
            accept="image/*"
          />
        </div>
      </div>
      <div className="footerDiv">
        <p>Created by Tathagata Chakraborty</p>
      </div>
    </>
  );
}

export default App;
