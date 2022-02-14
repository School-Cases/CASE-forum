import { useContext } from "react";

// import { get, POST } from "../../../utils/http";

import { ShowContext } from "../Dashboard";
import { UserContext } from "../../../App";

import styled from "styled-components";
import { If } from "../../../utils/If";
const StyledDiv = styled("div")`
  background-image: url(./static/media/${(props) => props.img});
`;

export const Header = ({ notiAmount }) => {
  const { dispatch } = useContext(ShowContext);
  const { user } = useContext(UserContext);

  return (
    <>
      <header className="flex JC-SB header">
        <StyledDiv
          img={user.image}
          className="header-user-img"
          onClick={() => {
            if (notiAmount > 0) dispatch({ type: "showNotifications" });
          }}
        >
          <If condition={notiAmount > 0}>
            <div className="flex notis">
              <div>{notiAmount}</div>
            </div>
          </If>
        </StyledDiv>
        <div className="header-stars"></div>
      </header>

      <section style={{ position: "relative" }}>
        <section className="top-btns flex JC-C">
          <div
            className="menu-btn flex"
            onClick={() => {
              dispatch({ type: "showMenu" });
            }}
          >
            <i class="fas fa-bars"></i>
          </div>
          <div
            className="write-post-btn flex"
            onClick={() => {
              dispatch({ type: "showWritePost" });
            }}
          >
            <i class="fas fa-pencil-alt"></i>
          </div>
          <div
            className="search-btn flex"
            onClick={() => {
              dispatch({ type: "showSearch" });
            }}
          >
            <i class="fas fa-search"></i>
          </div>
        </section>
      </section>
    </>
  );
};
