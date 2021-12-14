import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { GuardProvider, GuardedRoute } from "react-router-guards";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style/main.scss";

import { Home } from "./components/home/Home";
import { Dashboard } from "./components/dashboard/Dashboard";
import { useState, useEffect } from "react";

import { If } from "./utils/If";

import { get } from "./utils/http";
// const requireLogin = async (to, from, next) => {
//   const res = await get("/logged-in");

//   if (to.meta.auth === undefined) return next();
//   if (to.meta.auth && !res.data) return next.redirect("/");
//   if (!to.meta.auth && res.data) return next.redirect("/dashboard");

//   return next();
// };

const Loading = () => {
  return <p>Loading...</p>;
};

const NotFound = () => {
  return <p>Not Found</p>;
};

function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  const [theme, setTheme] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const isLoggedIn = async (signal) => {
    let res = await get(`/user/is_loggedin`, signal);
    console.log(res);
    if (res.fail) {
      setLoggedIn(false);
    } else {
      setUser(res.user);
      setLoggedIn(true);
    }
  };

  // useEffect(async () => {
  //   const abortController = new AbortController();
  //   await isLoggedIn(abortController.signal);
  //   return () => abortController.abort();
  // }, []);

  return (
    <div className={`App ${theme ? "light" : "dark"}`}>
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
          setPage={setPage}
          setUser={setUser}
        />
      </If>

      {/* <If condition={page === "dashboard"}> */}
      <If condition={loggedIn}>
        <Dashboard
          setLoggedIn={setLoggedIn}
          theme={theme}
          setTheme={setTheme}
          setPage={setPage}
          user={user}
        />
      </If>
    </div>
  );
}

export default App;
