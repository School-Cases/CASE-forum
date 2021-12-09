import { useState, useEffect, useCallback } from "react";

import { get, POST } from "../../utils/http";

export const Login = ({ setMainState, setPage, setUser }) => {
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);

  const [resMessage, setResMessage] = useState(null);

  const fetchUserLogin = async () => {
    let res = await POST(`/user/user_login`, {
      name: name,
      password: password,
    });
    console.log(!res.fail);

    if (res.fail) {
      console.log("hej");
      setResMessage(res.fail);
    } else {
      setUser(res);
      setPage("dashboard");
    }
  };

  return (
    <>
      <section className="flex login-top">
        <div className="glimra-logo"></div>
      </section>

      <section className="flex login-container">
        <h2 className="login-welcome">Välkommen!</h2>

        <div>
          <label className="login-text" htmlFor="namn">
            namn:
          </label>
          {/* <input
            className="login-input"
            type="email"
            name=""
            placeholder="mejl"
          /> */}
          <input
            className="login-input"
            type="text"
            name=""
            placeholder="namn"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="login-text" htmlFor="password">
            lösenord:
          </label>
          <input
            className="login-input"
            type="password"
            name=""
            placeholder="lösenord"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>{resMessage}</div>

        <button className="login-btn" onClick={() => fetchUserLogin()}>
          logga in
        </button>

        <div className="login-create-user">
          Ny användare?{" "}
          <span
            className="create-user-link"
            onClick={() => setMainState("signup")}
          >
            skapa konto
          </span>
        </div>
        <div className="login-tree"></div>
      </section>
    </>
  );
};
