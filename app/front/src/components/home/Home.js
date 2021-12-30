import { useEffect, useState } from "react";

import { Login } from "./Login";
import { Signup } from "./Signup";

import { If } from "../../utils/If";

export const Home = ({ setLoggedIn, setTheme, setUser }) => {
  const [signup, setSignup] = useState(false);

  return (
    <>
      <If condition={!signup}>
        <Login
          setLoggedIn={setLoggedIn}
          setSignup={setSignup}
          setUser={setUser}
          setTheme={setTheme}
        />
      </If>

      <If condition={signup}>
        <Signup
          setLoggedIn={setLoggedIn}
          setSignup={setSignup}
          setUser={setUser}
        />
      </If>
    </>
  );
};
