import { useState } from "react";

import { POST } from "../../utils/http";

export const Login = ({ setTheme, setLoggedIn, setSignup, setUser }) => {
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);

  const [resMessage, setResMessage] = useState(null);

  const fetchUserLogin = async () => {
    let res = await POST(`/user/user_login`, {
      name: name,
      password: password,
    });

    if (res.fail) {
      setResMessage(res.fail);
    } else {
      setUser(res);
      setTheme(parseInt(res.theme));
      setLoggedIn(true);
    }
  };

  return (
    <>
      <section className="flex login-top">
        <div className="glimra-logo"></div>
      </section>

      <section className="flex login-container">
        <h2 className="login-welcome">Välkommen!</h2>

        <div className="home-pad-input2">
          <label className="login-label" htmlFor="namn">
            Namn:
          </label>
          <input
            className="login-input"
            type="text"
            name=""
            placeholder=""
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="home-pad-input">
          <label className="login-label" htmlFor="password">
            Lösenord:
          </label>
          <input
            className="login-input"
            type="password"
            name=""
            placeholder=""
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>{resMessage}</div>

        <button className="login-btn" onClick={() => fetchUserLogin()}>
          Logga in
        </button>

        <div className="login-create-user">
          Ny användare?{" "}
          <span className="create-user-link" onClick={() => setSignup(true)}>
            skapa konto
          </span>
        </div>
        <div className="login-tree"></div>
      </section>
    </>
  );
};
