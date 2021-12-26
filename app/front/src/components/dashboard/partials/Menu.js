import { get, POST } from "../../../utils/http";
import { If } from "../../../utils/If";
import { useCallback, useEffect, useState, useContext } from "react";
import { Settings } from "./Settings";

import { ShowContext } from "../Dashboard";
import { UserContext } from "../../../App";
import { GoBack } from "./GoBack";

export const Menu = ({ setLoggedIn }) => {
  const { dispatch } = useContext(ShowContext);
  const { user } = useContext(UserContext);
  const [showSettings, setShowSettings] = useState(false);

  const fetchLogout = async () => {
    const abortController = new AbortController();
    let res = await get(`/user/user_logout`, abortController.signal);
    console.log(res);
    setLoggedIn(false);
    return () => abortController.abort();
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
          </section>
        </section>
      </If>
      <If condition={showSettings}>
        <Settings setShowSettings={setShowSettings} />
      </If>
    </>
  );
};
