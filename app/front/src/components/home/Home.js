import { useEffect, useState } from "react";

import { If } from "../../utils/If";

import { Login } from "./Login";
import { Signup } from "./Signup";

export const Home = ({ setLoggedIn, theme, setTheme, setPage, setUser }) => {
  const [mainState, setMainState] = useState("login");

  const [loading, setLoading] = useState(false);

  if (loading) {
    return <h3>loading ..</h3>;
  }

  return (
    <>
      <If condition={mainState === "login"}>
        <Login
          setLoggedIn={setLoggedIn}
          setMainState={setMainState}
          setPage={setPage}
          setUser={setUser}
        />
      </If>

      <If condition={mainState === "signup"}>
        <Signup
          setLoggedIn={setLoggedIn}
          setMainState={setMainState}
          setPage={setPage}
          setUser={setUser}
        />
      </If>
    </>
  );
};
