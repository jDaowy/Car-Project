import React, { useState } from "react";
import Axios from "axios";
import "../App.css";
import validator from "validator";
import "./AddEmailButton.css";

function AddEmailButton() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // State to hold success/error message

  const submitEmail = () => {
    if (validator.isEmail(email)) {
      Axios.post("http://localhost:3306/generate-verification-code", {
        email: email,
      });
      setMessage("Please Confirm Email");
    } else {
      setMessage("*INVALID EMAIL FORMAT*");
    }
  };

  return (
    <>
      <div className="AddEmailText">
        <input
          className="email-input"
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div className="input-result">
          <p>{message}</p> {/* Display the success/error message */}
        </div>
      </div>
      {/* <button onClick={submitEmail}>Add Email</button> */}
      <div className="border w-full h-40 flex items-center justify-center">
        <a href="#_" className="button-style" onClick={submitEmail}>
          Add Email
        </a>
      </div>
    </>
  );
}

export default AddEmailButton;
