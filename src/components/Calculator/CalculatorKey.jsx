import React from "react";

function CalculatorKey(props) {
  return (
    <button
      className={`${props.className} rounded-md m-1 p-4 text-xl flex justify-center items-cente`}
      onClick={() => props.onClick(props.keyValue)}
    >
      {props.keyValue}{" "}
    </button>
  );
}

export default CalculatorKey;
