import { useState, useContext } from "react";

import { Settings } from "./Settings";
import { GoBack } from "./GoBack";

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
    console.log(res);
    // if (res) {
    //   setTheme(res.newTheme);
    // }
  };

  return (
    <>
      <If condition={!showSettings}>
        <section className="menu-container">
          <GoBack show={"showPosts"} />

          {/* menu items go here */}

          <section>
            <div
              onClick={() => {
                fetchLogout();
              }}
            >
              logout
            </div>

            <div
              onClick={() => {
                setShowSettings(true);
              }}
            >
              settings
            </div>

            <div
              onClick={() => {
                setTheme(theme === 0 ? 1 : 0);
                fetchUserChangeTheme();
              }}
            >
              change theme
            </div>
          </section>
        </section>
      </If>
      <If condition={showSettings}>
        <Settings setShowSettings={setShowSettings} />
      </If>
    </>
  );
};
