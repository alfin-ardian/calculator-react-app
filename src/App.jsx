import { useEffect, useState } from "react";
import logo from "./assets/logo.svg";
import iconDollar from "./assets//icon-dollar.svg";
import iconPerson from "./assets//icon-person.svg";
import "./App.css";
import { Input } from "antd";

const App = () => {
  const [totalBill, setTotalBill] = useState("");
  const [totalPeople, setTotalPeople] = useState("");
  const [splitAmount, setSplitAmount] = useState(0.0);
  const [tipPerPerson, setTipPerPerson] = useState(0.0);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [activeButton, setActiveButton] = useState("");
  const [showCustomButton, setShowCustomButton] = useState(true);

  const handleTipButtonClick = (e) => {
    setTipPercentage(e.target.value);
    setActiveButton(e.target.value);
  };

  const resetAll = () => {
    setTotalBill("");
    setTotalPeople("");
    setSplitAmount(0.0);
    setTipPerPerson(0.0);
    setTipPercentage(0);
    setActiveButton("");
    setShowCustomButton(true);
  };

  const buttonClass = (value) => {
    return activeButton === value ? "active" : "";
  };

  const handleCalculateSplit = () => {
    const bill = parseFloat(totalBill);
    const tip = parseFloat(tipPercentage) / 100;
    const people = parseFloat(totalPeople);

    if (bill && tip && people) {
      const total = bill * (1 + tip);
      const split = total / people;
      const tipAmount = bill * tip;
      const tipPerPerson = tipAmount / people;
      setSplitAmount(split.toFixed(2));
      setTipPerPerson(tipPerPerson.toFixed(2));
    }
  };

  useEffect(() => {
    handleCalculateSplit();
  }, [totalBill, totalPeople, tipPercentage]);

  return (
    <>
      <div className="logo" style={{ marginBottom: "25px", marginTop: "25px" }}>
        <img src={logo} alt="Logo" />
      </div>
      <div className="app">
        <div className="app-body">
          <div className="left">
            <div className="row">
              <p>Bill</p>
              <Input
                type="number"
                prefix={<img src={iconDollar} alt="Dollar icon" />}
                style={{ color: "red", fontSize: "16px" }}
                className="custom-input"
                min={0}
                value={totalBill}
                onChange={(e) => {
                  setTotalBill(e.target.value);
                }}
              />
            </div>
            <div className="row">
              <p>Select Tip %</p>
              <div className="select">
                <button
                  value="5"
                  onClick={(e) => {
                    handleTipButtonClick(e);
                    setShowCustomButton(true);
                  }}
                  className={buttonClass("5")}
                >
                  5%
                </button>
                <button
                  value="10"
                  onClick={(e) => {
                    handleTipButtonClick(e);
                    setShowCustomButton(true);
                  }}
                  className={buttonClass("10")}
                >
                  10%
                </button>
                <button
                  value="15"
                  onClick={(e) => {
                    handleTipButtonClick(e);
                    setShowCustomButton(true);
                  }}
                  className={buttonClass("15")}
                >
                  15%
                </button>
                <button
                  value="25"
                  onClick={(e) => {
                    handleTipButtonClick(e);
                    setShowCustomButton(true);
                  }}
                  className={buttonClass("25")}
                >
                  25%
                </button>
                <button
                  value="50"
                  onClick={(e) => {
                    handleTipButtonClick(e);
                    setShowCustomButton(true);
                  }}
                  className={buttonClass("50")}
                >
                  50%
                </button>
                {showCustomButton ? (
                  <button
                    onClick={(e) => {
                      setShowCustomButton(false);
                      handleTipButtonClick(e);
                    }}
                  >
                    Custom
                  </button>
                ) : (
                  <Input
                    type="number"
                    id="custom"
                    style={{
                      width: "90px",
                      height: "50px",
                      marginLeft: "8px",
                    }}
                    className={`${buttonClass("custom")} ${
                      window.innerWidth < 480 ? "custom-mobile" : ""
                    }`}
                    onChange={(e) => {
                      handleTipButtonClick(e);
                    }}
                  />
                )}
              </div>
            </div>
            <div className="row">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ alignItems: "start" }}>Number of People</p>
                <p style={{ color: "red", alignItems: "end" }}>
                  {totalPeople < 1 && totalPeople ? "can't be zero" : ""}
                </p>
              </div>
              {console.log(totalPeople, "totalPeople")}
              <Input
                type="number"
                prefix={
                  <img
                    src={iconPerson}
                    alt="Dollar icon"
                    className="site-form-item-icon"
                  />
                }
                min={0}
                value={totalPeople}
                onChange={(e) => {
                  setTotalPeople(e.target.value);
                }}
                status={totalPeople < 1 && totalPeople ? "error" : ""}
              />
            </div>
          </div>
          <div className="right">
            <div className="content">
              <div className="bill">
                <p className="white">Tip Amount</p>
                <p className="white person">/ person</p>
              </div>
              <p className="result"> ${tipPerPerson}</p>
            </div>
            <div className="content">
              <div className="bill">
                <p className="white">Total</p>
                <p className="white person">/ person</p>
              </div>
              <p className="result">${splitAmount}</p>
            </div>
            <button className="button-reset" onClick={resetAll}>
              RESET
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
