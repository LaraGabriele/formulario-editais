import React from "react";
import "./style.css";

const Alert = ({ message, show }) => {
  return <div className={`alert ${show ? "" : "hidden"}`}>{message}</div>;
};

export default Alert;
