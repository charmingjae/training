import React from "react";
import { withRouter } from "react-router-dom";
import {
  size,
  otherDesign,
  mainDesign,
  divBackground,
} from "../../Root/Root.module.css";

function LogoutButton({ logout, username, history }) {
  // onclick const
  const onButtonClick = () => {
    logout();
    history.push("/");
  };

  // return
  return (
    <button onClick={onButtonClick} className={`${size} ${otherDesign}`}>
      Logout
    </button>
  );
}

export default withRouter(LogoutButton);
