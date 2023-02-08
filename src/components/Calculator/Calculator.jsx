import React, { useState, useEffect } from "react";
import CalculatorKey from "./CalculatorKey";

function Calculator() {
  const [prevValue, setPrevValue] = useState(null);
  const [nextValue, setNextValue] = useState("0");
  const [op, setOp] = useState(null);

  useEffect(() => {}, [op, nextValue, prevValue]);

  const CalculatorOperations = {
    "/": (firstValue, secondValue) => firstValue / secondValue,
    "*": (firstValue, secondValue) => firstValue * secondValue,
    "+": (firstValue, secondValue) => firstValue + secondValue,
    "-": (firstValue, secondValue) => firstValue - secondValue,
    "=": (firstValue, secondValue) => secondValue,
  };

  const performOperation = () => {
    let temp = CalculatorOperations[op](
      parseFloat(prevValue),
      parseFloat(nextValue)
    );
    setOp(null);
    setNextValue(String(temp));
    setPrevValue(null);
  };

  const handleNum = (number) => {
    setNextValue(nextValue === "0" ? String(number) : nextValue + number);
  };

  const insertDot = () => {
    if (!/\./.test(nextValue)) {
      setNextValue(nextValue + ".");
    }
  };
  const percentage = () => {
    setNextValue(parseFloat(nextValue) / 100);
    if (prevValue && nextValue === "") {
      setPrevValue(parseFloat(prevValue) / 100);
    }
  };
  const changeSign = () => {
    setNextValue(parseFloat(nextValue) * -1);
  };
  const clearData = () => {
    setNextValue("0");
    setPrevValue(0);
  };

  const handleOperation = (value) => {
    if (Number.isInteger(value)) {
      handleNum(parseInt(value, 10));
    } else if (value in CalculatorOperations) {
      if (op === null) {
        setOp(value);
        setPrevValue(nextValue);
        setNextValue("");
      }
      if (op) {
        setOp(value);
      }
      if (prevValue && op && nextValue) {
        performOperation();
      }
    } else if (value === "c") {
      clearData();
    } else if (value === "\xB1") {
      changeSign();
    } else if (value === ".") {
      insertDot();
    } else if (value === "%") {
      percentage();
    }
  };

  return (
    <div className="flex flex-col h-auto w-auto p-12 bg-purple-400 rounded-md gap-2">
      <div className="flex justify-start items-center bg-white h-12 p-2 w-4rem rounded-md">
        <h1 classname="text-3xl p-4 text-gray-300">{nextValue} </h1>
      </div>
      <div className="flex">
        <div className="grid grid-rows-4 justify-center items-center">
          <CalculatorKey
            className="bg-gray-300"
            keyValue={"c"}
            onClick={handleOperation}
          />
          <CalculatorKey
            className="bg-gray-300"
            keyValue={"\xB1"}
            onClick={handleOperation}
          />
          <CalculatorKey
            className="bg-gray-300"
            keyValue={"%"}
            onClick={handleOperation}
          />

          <CalculatorKey
            className="bg-gray-300"
            keyValue={"."}
            onClick={handleOperation}
          />
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 justify-center items-center">
            <CalculatorKey
              keyValue={1}
              onClick={handleOperation}
              className="bg-pink-300"
            />
            <CalculatorKey
              keyValue={2}
              onClick={handleOperation}
              className="bg-blue-300"
            />
            <CalculatorKey
              keyValue={3}
              onClick={handleOperation}
              className="bg-pink-300"
            />
          </div>
          <div className="grid grid-cols-3 justify-center items-center">
            <CalculatorKey
              keyValue={4}
              onClick={handleOperation}
              className="bg-blue-300"
            />
            <CalculatorKey
              keyValue={5}
              onClick={handleOperation}
              className="bg-pink-300"
            />
            <CalculatorKey
              keyValue={6}
              onClick={handleOperation}
              className="bg-blue-300"
            />
          </div>
          <div className="grid grid-cols-3 justify-center items-center">
            <CalculatorKey
              keyValue={7}
              onClick={handleOperation}
              className="bg-pink-300"
            />
            <CalculatorKey
              keyValue={8}
              onClick={handleOperation}
              className="bg-blue-300"
            />
            <CalculatorKey
              keyValue={9}
              onClick={handleOperation}
              className="bg-pink-300"
            />
          </div>
          <div className="grid grid-cols-2 justify-center items-center">
            <CalculatorKey
              className="bg-gray-300"
              keyValue={0}
              onClick={handleOperation}
            />
            <CalculatorKey
              className="bg-gray-300"
              keyValue={"="}
              onClick={handleOperation}
            />
          </div>
        </div>
        <div className="grid grid-rows-4 justify-center items-center">
          <CalculatorKey
            className="bg-gray-300"
            keyValue={"+"}
            onClick={handleOperation}
          />
          <CalculatorKey
            className="bg-gray-300"
            keyValue={"-"}
            onClick={handleOperation}
          />
          <CalculatorKey
            className="bg-gray-300"
            keyValue={"*"}
            onClick={handleOperation}
          />
          <CalculatorKey
            className="bg-gray-300"
            keyValue={"/"}
            onClick={handleOperation}
          />
        </div>
      </div>
    </div>
  );
}

export default Calculator;
