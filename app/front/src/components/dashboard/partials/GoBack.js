import { useCallback, useEffect, useState, useContext } from "react";
import { ShowContext } from "../Dashboard";

export const GoBack = ({ show }) => {
  const { dispatch } = useContext(ShowContext);
  return (
    <section className="menu-header">
      <h5 onClick={() => dispatch({ type: show })}>
        <span>
          <i class="fas fa-arrow-left"></i>
        </span>
        <span className="menu-header-text">tillbaka</span>
      </h5>
    </section>
  );
};
