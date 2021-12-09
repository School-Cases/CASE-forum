import { useState, useEffect, useCallback } from "react";

import { get, POST } from "../../utils/http";

export const Signup = ({ setMainState, setPage, setUser }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState("test@test.com");
  const [type, setType] = useState(0);
  const [password, setPassword] = useState(null);
  const [image, setImage] = useState(null);

  const [resMessage, setResMessage] = useState(null);

  const fetchCreateUser = async () => {
    let res = await POST(`/user/create_user`, {
      name: name,
      email: email,
      type: type,
      password: password,
      // image: image,
    });
    console.log(res);

    if (res.fail) {
      console.log("hej");
      setResMessage(res.fail);
    } else {
      setUser(res.user);
      setPage("dashboard");
    }
  };

  return (
    <>
      <section className="flex login-top">
        <div className="glimra-logo"></div>
      </section>

      <section className="flex login-container">
        <section className="flex JC-SB heading">
          <span
            className="back-arrow login-welcome"
            onClick={() => setMainState("login")}
          >
            <i class="fas fa-arrow-left"></i>
          </span>
          <span className="login-welcome">Skapa konto</span>
          <span></span>
        </section>

        <div>
          <label className="login-text" htmlFor="">
            name:{" "}
          </label>
          <input
            className="login-input"
            type="text"
            name=""
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="login-text" htmlFor="password">
            password:{" "}
          </label>
          <input
            className="login-input"
            type="password"
            name=""
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="login-text" htmlFor="">
            Deltagare
          </label>{" "}
          <input type="checkbox" name="" onClick={() => setType(0)} />
          <label className="login-text" htmlFor="">
            Personal
          </label>{" "}
          <input type="checkbox" name="" onClick={() => setType(1)} />
        </div>

        <div className="user-img-upload">
          <section className="flex">
            <label className="login-text" htmlFor="profilepic">
              Profilbild:{" "}
            </label>
            <input
              className="file-upload"
              name="profilepic"
              type="file"
              src=""
              alt=""
              onChange={(e) => console.log(e.target.value)}
            />
          </section>
        </div>

        <div>{resMessage}</div>

        <button className="login-btn" onClick={() => fetchCreateUser()}>
          Skapa
        </button>
      </section>
    </>
  );
};
