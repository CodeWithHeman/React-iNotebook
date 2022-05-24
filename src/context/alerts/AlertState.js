import React, { useState } from "react";
import alertContext from "./alertContext";

const AlertState = (props) => {
  const [alert, setAlert] = useState(null);
  const showAlert = (alertType, alertMessage) => {
    setAlert({
      type: alertType,
      msg: alertMessage
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <alertContext.Provider value={{ alert, showAlert }}>
      {props.children}
    </alertContext.Provider>
  )

}

export default AlertState;