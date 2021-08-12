import React, { useState } from "react";
import axiosInstance from "../axiosApi";

function ValidationComponent() {
  const [isValidated, setIsValidated] = useState(false);
  const validate = () => {
    axiosInstance
      .get("user/validate")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setIsValidated(true);
      })
      .catch((error) => {
        console.log(error);
        setIsValidated(false);
      });
  };
  return (
    <div>
      <button onClick={validate}>Test</button>
      {isValidated ? (
        <p>You are already authenticated.</p>
      ) : (
        <p>authentication Failed.</p>
      )}
    </div>
  );
}

export default ValidationComponent;
