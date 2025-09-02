import React from "react";
import Part from "./Part";
const Content = ({ part1, part2, part3}) => {
  return (
    <div>
      <p>{part1.name}</p>
      <p>{part2.name}</p>
      <p>{part3.name}</p>
    </div>
  );
};
export default Content;
