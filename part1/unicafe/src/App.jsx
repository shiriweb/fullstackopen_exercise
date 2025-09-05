import React, { use, useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const feedback = good + neutral + bad;

  const average =
    feedback === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / feedback;

  const positive = feedback === 0 ? 0 : (good / feedback) * 100;
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
    <>
      <button onClick={clickGood}>Good</button>
      <button onClick={clickNeutral}>Neutral</button>
      <button onClick={clickBad}>Bad</button>

      <h1>Statistics</h1>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {feedback}</p>
      <p>Average {average}</p>
      <p>Positive {positive}</p>
    </>
  );
};

export default App;
