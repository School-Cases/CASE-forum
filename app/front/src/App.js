import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { GuardProvider, GuardedRoute } from "react-router-guards";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style/main.scss";

import { Home } from "./components/home/Home";
import { Dashboard } from "./components/dashboard/Dashboard";
import { useState } from "react";

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
  const [theme, setTheme] = useState(true);

  return (
    <div className={`App ${theme ? "light" : "dark"}`}>
      {/* <Home /> */}
      <BrowserRouter>
        {/* <GuardProvider
          guards={[requireLogin]}
          loading={Loading}
          error={NotFound}
        > */}
        <Routes>
          <Route
            path="/"
            exact
            element={<Dashboard theme={theme} setTheme={setTheme} />}
            // meta={{ auth: false }}
          />
          <Route
            path="/dashboard"
            exact
            element={<Dashboard theme={theme} setTheme={setTheme} />}
            // meta={{ auth: true }}
          />
          <Route path="*" component={NotFound} />
        </Routes>
        {/* </GuardProvider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
