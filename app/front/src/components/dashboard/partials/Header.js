import { useCallback, useContext, useEffect, useState } from "react";

import { get, POST } from "../../../utils/http";

import { ShowContext } from "../Dashboard";
import { UserContext } from "../../../App";

import styled from "styled-components";
const StyledDiv = styled("div")`
  background-image: url(./static/media/${(props) => props.img});
`;

export const Header = () => {
  const { dispatch } = useContext(ShowContext);
  const { user } = useContext(UserContext);

  return (
    <>
      <header className="flex JC-SB header">
        <StyledDiv img={user.image} className="header-user-img"></StyledDiv>
        <div className="header-stars"></div>
      </header>

      <section>
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
