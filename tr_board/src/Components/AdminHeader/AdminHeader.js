import React from "react";
import { hot } from "react-hot-loader";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { btnAdmin } from "./AdminHeader.module.css";

function AdminHeader() {
  return (
    <>
      <Link to="/setUmbrellaCount">
        <button className={`${btnAdmin}`}>Set Count</button>
      </Link>
      <Link to="menu2">
        <button className={`${btnAdmin}`}>Menu2</button>
      </Link>
      <button className={`${btnAdmin}`}>Menu3</button>
      <button className={`${btnAdmin}`}>Menu4</button>
    </>
  );
}

export default hot(module)(AdminHeader);
