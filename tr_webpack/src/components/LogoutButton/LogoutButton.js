import React from "react";
import { withRouter } from "react-router-dom";

function LogoutButton({ logout, username, history }) {
  const handleClick = () => {
    logout();
    history.push("/");
  };
  return <button onClick={handleClick}>Logout {username}</button>;
}

export default withRouter(LogoutButton);
