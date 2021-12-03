import { useEffect, useState } from "react";

import { If } from "../../utils/If";

import { Login } from "./Login";
import { Signup } from "./Signup";

export const Home = () => {
  const [mainState, setMainState] = useState("login");

  const [loading, setLoading] = useState(true);

  if (loading) {
    return <h3>loading ..</h3>;
  }

  return (
    <>
      <If condition={mainState === "login"}>
        <Login setMainState={setMainState} />
      </If>

      <If condition={mainState === "signup"}>
        <Signup setMainState={setMainState} />
      </If>
    </>
  );
};
