import React from "react";
import { hot } from "react-hot-loader";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { btnAdmin } from "./AdminHeader.module.css";

function AdminHeader() {
  return (
    <>
      <Link to="/setting/umbrellacount">
        <button className={`${btnAdmin}`}>Set Count</button>
      </Link>
      <Link to="/applylist">
        <button className={`${btnAdmin}`}>Apply List</button>
      </Link>
      <Link to="/rentallist">
        <button className={`${btnAdmin}`}>Rental List</button>
      </Link>
    </>
  );
}

export default hot(module)(AdminHeader);
