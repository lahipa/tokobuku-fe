import React from "react";
import { dataLogin } from "../../utils/globals";

export const handleLogout = (props) => {
  let dateTime = new Date(); // next this will be uses to update last login

  if (dataLogin && dataLogin.user.role === "admin") {
    window.localStorage.removeItem("dataLogin");

    window.location.href = "/imcoolmaster/";
  }
};
