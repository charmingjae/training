import React from "react";
import { withRouter } from "react-router-dom";
import { size, otherDesign } from "../../Root/Root.module.css";

function MyinfoButton() {
  // return
  return <button className={`${size} ${otherDesign}`}>Info</button>;
}

export default withRouter(MyinfoButton);
