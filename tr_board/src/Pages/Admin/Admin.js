import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import {
  divWrapPage,
  divWrapHeader,
  divWrapContents,
} from "./Admin.module.css";
import { hot } from "react-hot-loader";
import { AdminHeader } from "../../Components";
import { SetUmbrellaCount } from "../../Pages";

function Admin() {
  return (
    <Router>
      <div className={`${divWrapPage}`}>
        <div className={`${divWrapHeader}`}>
          <AdminHeader />
        </div>
        <div className={`${divWrapContents}`}>
          <Switch>
            <Route
              path={["/admin", "/setUmbrellaCount"]}
              render={(props) => <SetUmbrellaCount {...props} />}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default hot(module)(Admin);
