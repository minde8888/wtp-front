import React from "react";
import NavBar from "./nav/nav";
import  GetNewPassword from "./auth/nwePassword/getNewPassword"

const Main = () => {
  return (
    <div className="main">
      <div className="colom4">
        <NavBar />
        <GetNewPassword />
      </div>
    </div>
  );
};

export default Main;
