import { useState } from "react";

// import { get, POST, POSTFORMDATA } from "../../utils/http";

export const Signup = ({ setLoggedIn, setSignup, setUser }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState("test@test.com");
  const [type, setType] = useState(null);
  const [password, setPassword] = useState(null);
  const [image, setImage] = useState(null);

  const [resMessage, setResMessage] = useState(null);

  const fetchCreateUser = async () => {
    if (name && type !== null && password) {
      let formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("type", type);

      let resUser;
      await fetch(`http://localhost:8080/user/create_user`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => (resUser = data));

      if (resUser.fail) {
        console.log("failed");
      } else {
        console.log("success");
        setUser(resUser);
        setLoggedIn(true);
      }
    } else {
      setResMessage("try again");
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
            onClick={() => setSignup(false)}
          >
            <i class="fas fa-arrow-left"></i>
          </span>
          <span className="login-welcome">Skapa konto</span>
          <span></span>
        </section>

        <input
          hidden
          className="login-input"
          type="text"
          name="email"
          placeholder="name"
          value={email}
        />

        <div>
          <label className="login-text" htmlFor="">
            name:{" "}
          </label>
          <input
            className="login-input"
            type="text"
            name="name"
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
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="login-text" htmlFor="">
            Deltagare
          </label>{" "}
          <input type="radio" name="type" onClick={(e) => setType(0)} />
          <label className="login-text" htmlFor="">
            Personal
          </label>{" "}
          <input type="radio" name="type" onClick={(e) => setType(1)} />
        </div>

        <div className="user-img-upload">
          <section className="flex">
            <label className="login-text" htmlFor="profilepic">
              Profilbild:{" "}
            </label>
            <input
              className="file-upload"
              name="image"
              type="file"
              src=""
              alt=""
              onChange={(e) => setImage(e.target.files[0])}
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
