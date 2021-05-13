import React from "react";
import { withRouter } from "react-router-dom";

function LogoutButton({ logout, username, history }) {
  // onclick const
  const onButtonClick = () => {
    logout();
    history.push("/");
  };

  // return
  return <button onClick={onButtonClick}>Logout {username}</button>;
}

export default withRouter(LogoutButton);
