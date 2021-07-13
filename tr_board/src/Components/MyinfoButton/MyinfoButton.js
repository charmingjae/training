import React from "react";
import { withRouter } from "react-router-dom";
import {
  size,
  otherDesign,
  mainDesign,
  divBackground,
} from "../../Root/Root.module.css";

function MyinfoButton({ username, history }) {
  // return
  return <button className={`${size} ${otherDesign}`}>Info</button>;
}

export default withRouter(MyinfoButton);
