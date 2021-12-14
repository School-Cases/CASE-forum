import { get, POST } from "../../../utils/http";
import { If } from "../../../utils/If";
import { useCallback, useEffect, useState } from "react";

export const Settings = ({ user, setShowSettings }) => {
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);

  const [resMessage, setResMessage] = useState(null);

  const fetchUserUpdate = async () => {
    let res = await POST(`/user/user_update`, {
      user_id: user.user_id,
      current_password: currentPassword,
      new_password: newPassword,
    });
    if (res.fail) {
      setResMessage("Fel current lösen");
    } else {
      setResMessage("Uppdatering success");
    }
  };

  return (
    <section className="menu-container">
      <section className="menu-header">
        <h5 onClick={() => setShowSettings(false)}>
          <span>
            <i class="fas fa-arrow-left"></i>
          </span>
          <span className="menu-header-text">tillbaka</span>
        </h5>
      </section>

      <h4>Change password:</h4>

      <div className="flex FD-C">
        <label htmlFor="">current:</label>
        <input
          type="password"
          name=""
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>

      <div className="flex FD-C">
        <label htmlFor="">new:</label>
        <input
          type="password"
          name=""
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <h4>Change pic:</h4>

      <div
        onClick={() => {
          fetchUserUpdate();
        }}
      >
        save
      </div>

      <div>{resMessage}</div>
    </section>
  );
};
