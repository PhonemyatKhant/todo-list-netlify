import React, { useEffect } from "react";

const Alert = ({ clearAlert, msg, type, list }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      clearAlert();
    }, 3000);
    return () => clearTimeout(timer);
  }, [list]);
  return <p className={`alert ${type}`}>{msg}</p>;
};

export default Alert;
