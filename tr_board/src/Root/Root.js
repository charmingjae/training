import React, { useState } from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { hot } from "react-hot-loader";

// import css
import {
  size,
  otherDesign,
  mainDesign,
  divBackground,
} from "./Root.module.css";
// import component
import { LogoutButton } from "../Components";
// import pages
import { LoginForm, Main, RegisterForm } from "../Pages";
// import function
import { signIn } from "../Function";
import { signUp } from "../Function";

const Root = () => {
  // init user const
  const [user, setUser] = useState(null);
  // init check login
  const authenticated = user != null;
  // Login Function
  const doLogin = async ({ userID, userPW }) => {
    var getSigninResult = await signIn({ userID, userPW });
    if (getSigninResult === undefined) {
      return undefined;
    } else {
      setUser(getSigninResult);
      return true;
    }
  };
  // Register Function
  const doRegister = async ({ userID, userPW, userPhone }) => {
    var getSignupResult = await signUp({ userID, userPW, userPhone });
    console.log("get registerresult : ", getSignupResult);
    if (getSignupResult === undefined) {
      return undefined;
    } else {
      setUser(getSignupResult);
      return true;
    }
  };
  // Logout Function
  const doLogout = () => setUser(null);

  // return
  return (
    <Router>
      <header>
        <div className={divBackground}>
          <Link to="/" className={`${mainDesign}`}>
            <button className={`${size} ${mainDesign}`}>Basket</button>
          </Link>

          {authenticated ? (
            <LogoutButton logout={doLogout} username={user} />
          ) : (
            <>
              <Link to="/register">
                <button className={`${size} ${otherDesign}`}>Register</button>
              </Link>
              <Link to="/login">
                <button className={`${size} ${otherDesign}`}>Login</button>
              </Link>
            </>
          )}
        </div>
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route
            path="/login"
            render={(props) => (
              <LoginForm
                authenticated={authenticated}
                login={doLogin}
                {...props}
              />
            )}
          />
          <Route
            path="/register"
            render={(props) => (
              <RegisterForm
                authenticated={authenticated}
                register={doRegister}
                {...props}
              />
            )}
          />
        </Switch>
      </main>
    </Router>
  );
};

export default hot(module)(Root);
