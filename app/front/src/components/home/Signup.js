import { useState } from "react";

import { If } from "../../utils/If";
import courses from "../../utils/courses";
import { api_address } from "../../utils/http";

import { api_address } from "../../utils/http";

// import { get, POST, POSTFORMDATA } from "../../utils/http";

export const Signup = ({ setLoggedIn, setSignup, setUser }) => {
  console.log(courses);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState("test@test.com");
  const [type, setType] = useState(null);
  const [course, setCourse] = useState("VÄLJ KURS");
  const [password, setPassword] = useState(null);
  const [image, setImage] = useState(null);

  const [showDropdown, setShowDropdown] = useState(false);

  const [resMessage, setResMessage] = useState(null);

  const fetchCreateUser = async () => {
    if (name && type !== null && password) {
      let formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("type", type);
      formData.append("course", type === 0 ? course.toLowerCase() : null);

      let resUser;
      await fetch(`${api_address}/user/create_user`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => (resUser = data));

      if (resUser.fail) {
        setResMessage("Något gick snett lol");
      } else {
        setResMessage("Gick finfint!");
        setUser(resUser);
        setLoggedIn(true);
      }
    } else {
      setResMessage("Något gick snett lol, testa igen");
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

        <div className="home-pad-input2">
          <label className="login-label" htmlFor="">
            Namn:{" "}
          </label>
          <input
            className="login-input"
            type="text"
            name="name"
            placeholder=""
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="home-pad-input">
          <label className="login-label" htmlFor="password">
            Lösenord:{" "}
          </label>
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder=""
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex home-pad-input login-radio-content">
          <div>
            <label className="" htmlFor="">
              Deltagare
            </label>{" "}
            <input type="radio" name="type" onClick={(e) => setType(0)} />
          </div>
          <div>
            <label className="" htmlFor="">
              Personal
            </label>{" "}
            <input type="radio" name="type" onClick={(e) => setType(1)} />
          </div>
        </div>

        <If condition={type === 0}>
          <div className="flex home-pad-input">
            <div class="select-custom">
              <If condition={showDropdown}>
                <input id="dropdownMenu" type="checkbox" checked />
              </If>
              <If condition={!showDropdown}>
                <input id="dropdownMenu" type="checkbox" />
              </If>
              <label
                for="dropdownMenu"
                class="select-custom__label"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {course}
              </label>
              <span class="input-custom__border"></span>

              <ul
                class={`select-custom__dropdownMenu ${
                  showDropdown ? "" : "noshowdrop"
                }`}
              >
                {courses.map((c, i) => {
                  return (
                    <li
                      onClick={() => {
                        setCourse(c);
                        setShowDropdown(false);
                      }}
                      class={`select-custom__option ${
                        course === c ? "picked" : ""
                      }`}
                      key={i}
                    >
                      {c}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </If>

        <div className="flex JC-C user-img-upload">
          <section className="flex" style={{ marginLeft: "5rem" }}>
            <label className="login-label" htmlFor="profilepic">
              Profilbild:{" "}
            </label>
            <input
              className="file-upload"
              name="image"
              type="file"
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
