import React from "react";
import { dataLogin } from "../utils/globals";

export const handleLogout = () => {
  window.localStorage.removeItem("dataLogin");

  window.location.href = "/";
};
