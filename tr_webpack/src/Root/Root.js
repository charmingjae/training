import React, { useEffect, useState } from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { hot } from "react-hot-loader";
import { mainWrapper } from "./Root.module.css";

// import component
import { Act1 } from "../components";
import { Home } from "../components";
import { About } from "../components";
import { NotFound } from "../components";
import { Profile } from "../components";
import { LoginForm } from "../components";
import { LogoutButton } from "../components";
import { Test } from "../components";

// signin function
import { signIn } from "../function";
import { AuthRoute } from "../function";

const number = 4;
const Root = () => {
  const [user, setUser] = useState(null);
  const authenticated = user != null;

  // LoginForm에 넘겨줄 login 함수
  const login = ({ email, password }) => {
    console.log("login 접근 ");
    setUser(signIn({ email, password }));
    console.log("login 완료 ");
  };

  const logout = () => setUser(null);

  return (
    // <>
    //   <div className={mainWrapper}>
    //     <h1>Hello Webpack!! with Webpack</h1>
    //   </div>
    //   <Act1 params={number} />
    // </>
    <Router>
      <header>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/about">
          <button>About</button>
        </Link>
        <Link to="/profile">
          <button>Profile</button>
        </Link>
        {authenticated ? (
          <>
            <LogoutButton logout={logout} username={user.name} />
          </>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        <Link to="/test">
          <button>test</button>
        </Link>
      </header>
      <hr />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route
            path="/login"
            render={(props) => (
              <LoginForm
                authenticated={authenticated}
                login={login}
                {...props}
              />
            )}
          />
          <Route path="/test" component={Test} />
          <AuthRoute
            authenticated={authenticated}
            path="/profile"
            render={(props) => <Profile user={user} {...props} />}
          />
          <Route component={NotFound} />
        </Switch>
      </main>
    </Router>
  );
};

export default hot(module)(Root);
