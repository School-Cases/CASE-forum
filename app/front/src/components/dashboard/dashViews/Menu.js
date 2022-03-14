import { useState, useContext } from "react";

import { Settings } from "../partials/Settings";
import { GoBack } from "../partials/GoBack";

import { get, POST } from "../../../utils/http";
import { If } from "../../../utils/If";

// import { ShowContext } from "../Dashboard";
import { UserContext } from "../../../App";

export const Menu = ({ setLoggedIn, theme, setTheme }) => {
  // const { dispatch } = useContext(ShowContext);
  const { user } = useContext(UserContext);

  const [showSettings, setShowSettings] = useState(false);

  const fetchLogout = async () => {
    const abortController = new AbortController();
    let res = await get(`/user/user_logout`, abortController.signal);
    setLoggedIn(false);
    return () => abortController.abort();
  };

  const fetchUserChangeTheme = async () => {
    let res = await POST(`/user/user_theme_update`, {
      user_id: user.user_id,
    });
  };

  return (
    <>
      <If condition={!showSettings}>
        <section className="main-container">
          <GoBack show={"showPosts"} />

          {/* menu items go here */}

          <section className="pad-1 main-view">
            <section className="flex FD-C menu-view">
              <div
                className="menu-item pointer"
                onClick={() => {
                  setShowSettings(true);
                }}
              >
                Inställningar
              </div>

              <div
                className="menu-item pointer"
                onClick={() => {
                  fetchLogout();
                }}
              >
                Logga ut
              </div>

              <div
                className="menu-item-theme pointer"
                onClick={() => {
                  setTheme(theme === 0 ? 1 : 0);
                  fetchUserChangeTheme();
                }}
              >
                Byt till {theme === 0 ? "dark theme" : "standard theme"}
              </div>
            </section>
          </section>
        </section>
      </If>
      <If condition={showSettings}>
        <Settings setShowSettings={setShowSettings} />
      </If>
    </>
  );
};
