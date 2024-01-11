import React from "react";
import "./MainContainer.css";
import Title from "./Title"; // Import the Title component
import Car from "./Car";

const MainContainer = () => {
  return (
    <div
      className="main-container"
      style={{ backgroundImage: `url('pipboybg.png')` }}
    >
      <Title />
      <Car />
    </div>
  );
};

export default MainContainer;
