import React from "react";
import Part from "./Part";
const Content = ({ parts}) => {
  return (
    <div>
      <p>{parts[0].name}</p>
      <p>{parts[1].name}</p>
      <p>{parts[2].name}</p>
    </div>
  );
};
export default Content;
