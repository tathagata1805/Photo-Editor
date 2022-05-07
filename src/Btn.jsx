import React from "react";

// creating the respective btns.... they will appear once a picture is uploaded...

export default function Btn({ name, active, handleClick, isDisable }) {
  return (
    <>
      <button
        className={active ? "active" : ""}
        onClick={handleClick}
        disabled={isDisable}
      >
        {name}
      </button>
    </>
  );
}
