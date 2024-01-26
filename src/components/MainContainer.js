import React from "react";
import "./MainContainer.css";
import Title from "./Title"; // Import the Title component
import AddEmailButton from "./AddEmailButton";
import Car from "./Car";
import FluidTable from "./FluidTable";
import UnsubscribeButton from "./UnsubscribeButton";

const MainContainer = () => {
  return (
    <div
      className="main-container"
      style={{ backgroundImage: `url('pipboybg.png')` }}
    >
      <div className="title-container">
        <Title />
      </div>

      {/* <div className="car-container">
        <Car />
      </div> */}

      <span className="yap">
        Below is a table showing how often you should check the essential fluids
        in your car
      </span>

      <div className="table-container">
        <FluidTable />
      </div>

      <span className="signup">
        Sign up to recieve emails reminders when to check your fluids
      </span>
      <div className="input-container">
        <AddEmailButton />
      </div>

      <span className="signup">Input your email below to unsubscribe</span>

      <div className="unsub-container input-container">
        <UnsubscribeButton />
      </div>
    </div>
  );
};

export default MainContainer;
