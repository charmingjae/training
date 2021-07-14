import React from "react";
import { withRouter } from "react-router-dom";
import { size, otherDesign } from "../../Root/Root.module.css";

function AdminButton() {
  return <button className={`${size} ${otherDesign}`}>Admin</button>;
}

export default withRouter(AdminButton);
