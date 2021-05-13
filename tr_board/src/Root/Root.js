import React, { useState } from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { hot } from "react-hot-loader";

// import component
import { LoginButton, LogoutButton } from "../Components";

// import pages
import { LoginForm, Main } from "../Pages";

// import function
import { signIn } from "../Function";

const Root = () => {
  // init user const
  const [user, setUser] = useState(null);

  // init check login
  const authenticated = user != null;

  // Login Function
  const doLogin = ({ userID, userPW }) => {
    // Set User using returned value : user
    setUser(signIn({ userID, userPW }));
  };

  // Logout const
  const doLogout = () => setUser(null);

  // return
  return (
    <Router>
      <header>
        <Link to="/">
          <button>Main</button>
        </Link>

        {authenticated ? (
          <LogoutButton logout={doLogout} username={user.name} />
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
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
        </Switch>
      </main>
    </Router>
  );
};

export default hot(module)(Root);
