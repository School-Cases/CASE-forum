import { useCallback, useEffect, useState, useContext } from "react";

import { get, POST } from "../../../utils/http";
import { If } from "../../../utils/If";

import { UserContext } from "../../../App";

export const Settings = ({ setShowSettings }) => {
  const { user } = useContext(UserContext);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [image, setImage] = useState(null);

  const [resMessage, setResMessage] = useState("");

  // const fetchUserUpdate = async () => {
  //   let res = await POST(`/user/user_update`, {
  //     user_id: user.user_id,
  //     current_password: currentPassword,
  //     new_password: newPassword,
  //   });
  //   if (res.fail) {
  //     setResMessage("Fel current lösen");
  //   } else {
  //     setResMessage("Uppdatering success");
  //   }
  // };

  const fetchUserUpdate = async () => {
    let formData = new FormData();
    formData.append("image", image);
    formData.append("user_id", user.user_id);
    formData.append("current_password", currentPassword);
    formData.append("new_password", newPassword);

    await fetch(`/user/user_update`, {
      method: "POST",
      body: formData,
    });
    // if (res.fail) {
    //   setResMessage("Fel current lösen");
    // } else {
    //   setResMessage("Uppdatering success");
    // }
  };

  return (
    <section className="main-container">
      <section className="menu-header">
        <h5 onClick={() => setShowSettings(false)}>
          <span>
            <i class="fas fa-arrow-left"></i>
          </span>
          <span className="menu-header-text">Tillbaka</span>
        </h5>
      </section>

      <section className="pad-1 main-view settings-main">
        <h4>Byt lösenord:</h4>

        <div className="flex FD-C">
          <label htmlFor="">Nuvarande:</label>
          <input
            className="input-settings"
            type="password"
            name=""
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className="flex FD-C">
          <label htmlFor="">Nytt:</label>
          <input
            className="input-settings"
            type="password"
            name=""
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <h4 className="change-pic-set">Byt profilbild:</h4>
        <input
          className="file-upload"
          name="image"
          type="file"
          src=""
          alt=""
          onChange={(e) => setImage(e.target.files[0])}
        />

        <div className="flex JC-C settings-bot">
          <button
            className="settings-save"
            onClick={() => {
              fetchUserUpdate();
            }}
          >
            Spara
          </button>
        </div>
      </section>
    </section>
  );
};
