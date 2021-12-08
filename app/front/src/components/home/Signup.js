import { useState, useEffect, useCallback } from "react";

import { get, POST } from "../../utils/http";

export const Signup = ({ setMainState }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState("test@test.com");
  const [type, setType] = useState(0);
  const [password, setPassword] = useState(null);
  const [image, setImage] = useState(null);

  const fetchCreateUser = async () => {
    let res = await POST(`/user/create_user`, {
      name: name,
      email: email,
      type: type,
      // image: image,
    });
    console.log(res);
  };

  return (
    <>
      <h2>
        <span onClick={() => setMainState("login")}>back</span> Skapa konto
      </h2>

      <div>
        <label htmlFor="">name: </label>
        <input
          type="text"
          name=""
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password">password: </label>
        <input
          type="password"
          name=""
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="">Deltagare</label>{" "}
        <input type="checkbox" name="" onClick={() => setType(0)} />
        <label htmlFor="">Personal</label>{" "}
        <input type="checkbox" name="" onClick={() => setType(1)} />
      </div>

      <div>
        <form action="http://localhost:8080/user/create_user" method="POST">
          <label htmlFor="profilepic">Profilbild: </label>
          <input
            name="profilepic"
            type="file"
            src=""
            alt=""
            onChange={(e) => console.log(e.target.value)}
          />
          <button type="submit">sdgsdgsdgs</button>
        </form>
      </div>

      <button onClick={() => fetchCreateUser()}>Skapa</button>
    </>
  );
};
