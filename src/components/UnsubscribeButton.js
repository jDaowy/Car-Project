import React, { useState } from "react";
import Axios from "axios";
import "../App.css";
import validator from "validator";
import "./UnsubscribeButton.css";

function UnsubscribeButton() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // State to hold success/error message

  const deleteEmail = () => {
    if (validator.isEmail(email)) {
      Axios.post("http://localhost:3306/delete-email", {
        email: email,
      });
      setMessage("Email deleted from mailing list");
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
        <a href="#_" className="button-style" onClick={deleteEmail}>
          Unsubscribe
        </a>
      </div>
    </>
  );
}

export default UnsubscribeButton;
