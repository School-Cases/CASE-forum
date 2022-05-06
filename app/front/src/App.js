// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { GuardProvider, GuardedRoute } from "react-router-guards";
import { useState, useEffect, useContext, createContext } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style/main.scss";

import { Home } from "./components/home/Home";
import { Dashboard } from "./components/dashboard/Dashboard";

import { If } from "./utils/If";
import { get } from "./utils/http";
import { breakpoints } from "./utils/breakpoints";
// const requireLogin = async (to, from, next) => {
//   const res = await get("/logged-in");

//   if (to.meta.auth === undefined) return next();
//   if (to.meta.auth && !res.data) return next.redirect("/");
//   if (!to.meta.auth && res.data) return next.redirect("/dashboard");

//   return next();
// };

export const UserContext = createContext(null);

// const Loading = () => {
//   return <p>Loading...</p>;
// };

const NotFound = () => {
  return <p>Not Found</p>;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(0);

  const [loggedIn, setLoggedIn] = useState(false);

  const [W, setW] = useState(window.innerWidth);

  const isLoggedIn = async (signal) => {
    let res = await get(`/user/is_loggedin`, signal);
    if (res.fail) {
      setLoggedIn(false);
    } else {
      setUser(res.user);
      setTheme(res.user.theme);
      setLoggedIn(true);
    }
  };

  useEffect(async () => {
    const abortController = new AbortController();
    await isLoggedIn(abortController.signal);
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    let changeW = window.addEventListener("resize", () =>
      setW(window.innerWidth)
    );
    return window.removeEventListener("resize", changeW);
  }, []);

  return (
    <div
      className={`App ${theme === 0 ? "light" : "dark"} ${
        W >= breakpoints.DT ? "DT" : ""
      } ${loggedIn ? "" : "home-p"}`}
    >
      {/* <div className={`App ${user.theme == 0 ? "light" : "dark"}`}> */}
      <section className="main-back">
        <UserContext.Provider value={{ user }}>
          {/* <BrowserRouter>
        <GuardProvider
          guards={[requireLogin]}
          guards={[isLoggedIn]}
          loading={Loading}
          error={NotFound}
        >
        <Routes>
          <Route
            path="/"
            exact
            element={<Home theme={theme} setTheme={setTheme} />}
            meta={{ loggedIn: false }}
          />
          <Route
            path="/dashboard"
            exact
            element={<Dashboard theme={theme} setTheme={setTheme} />}
            meta={{ loggedIn: true }}
          />
          <Route path="*" component={NotFound} />
        </Routes>
        </GuardProvider>
      </BrowserRouter> */}

          {/* <If condition={page === "home"}> */}
          <If condition={!loggedIn}>
            <Home
              setLoggedIn={setLoggedIn}
              theme={theme}
              setTheme={setTheme}
              setUser={setUser}
            />
          </If>

          {/* <If condition={page === "dashboard"}> */}
          <If condition={loggedIn}>
            <Dashboard
              setLoggedIn={setLoggedIn}
              theme={theme}
              setTheme={setTheme}
            />
          </If>
        </UserContext.Provider>
      </section>
    </div>
  );
};

export default App;
