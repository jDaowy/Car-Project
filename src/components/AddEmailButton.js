import React, { useState } from "react";
import Axios from "axios";
import "../App.css";
import validator from "validator";

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
      setMessage("Invalid email format");
    }
  };

  return (
    <>
      <div className="AddEmailText">
        <input
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <button onClick={submitEmail}>Add Email</button>
      <p>{message}</p> {/* Display the success/error message */}
    </>
  );
}

export default AddEmailButton;
