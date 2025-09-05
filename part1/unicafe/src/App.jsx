import React, { useState } from "react";
import StatisticsLine from "./StatisticsLine";
import Button from "./Button";

const Statistics = ({ good, neutral, bad }) => {
  const feedback = good + neutral + bad;
  if (feedback === 0) {
    return <p>No feedback given</p>;
  }

  const average =
    feedback === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / feedback;

  const positive = feedback === 0 ? 0 : (good / feedback) * 100;
  return (
    <>
      <table>
        <tbody>
          <StatisticsLine text={"Good"} value={good} />
          <StatisticsLine text={"Neutral"} value={neutral} />
          <StatisticsLine text={"Bad"} value={bad} />
          <StatisticsLine text={"All"} value={feedback} />
          <StatisticsLine text={"Average"} value={average} />
        </tbody>
      </table>

      <StatisticsLine text={"Positive"} value={positive} />
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function clickGood() {
    setGood(good + 1);
  }
  function clickNeutral() {
    setNeutral(neutral + 1);
  }
  function clickBad() {
    setBad(bad + 1);
  }

  return (
    <div>
      <Button onClickFunc={clickGood} label="Good" />
      <Button onClickFunc={clickNeutral} label="Neutral" />
      <Button onClickFunc={clickBad} label="Bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
