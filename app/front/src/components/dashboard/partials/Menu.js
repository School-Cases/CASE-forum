import { get, POST } from "../../../utils/http";
import { If } from "../../../utils/If";
import { useCallback, useEffect, useState } from "react";
import { Settings } from "./Settings";

export const Menu = ({ user, setShowMenu, setLoggedIn }) => {
  const [showSettings, setShowSettings] = useState(false);

  const fetchLogout = async () => {
    const abortController = new AbortController();
    let res = await get(`/user/user_logout`, abortController.signal);
    console.log(res);
    setLoggedIn(false);
    setShowMenu(false);
    return () => abortController.abort();
  };

  return (
    <>
      <If condition={!showSettings}>
        <section className="menu-container">
          <section className="menu-header">
            <h5 onClick={() => setShowMenu(false)}>
              <span>
                <i class="fas fa-arrow-left"></i>
              </span>
              <span className="menu-header-text">tillbaka</span>
            </h5>
          </section>

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
        <Settings user={user} setShowSettings={setShowSettings} />
      </If>
    </>
  );
};
