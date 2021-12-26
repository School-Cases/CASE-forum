import { useCallback, useContext, useEffect, useState } from "react";

import { If } from "../../../utils/If";

import { UserContext } from "../../../App";

export const ReactionsPopup = ({ reactions, fetchLike }) => {
  const { user } = useContext(UserContext);

  const reactionAmount = [0, 1, 2];
  return (
    <div className="flex reactions">
      {reactionAmount.map((a) => {
        return (
          <span
            className="flex noshow-com"
            onClick={() => {
              if (!reactions.some((r) => r.user_id === user.user_id)) {
                fetchLike(1, a);
              }
            }}
          >
            <span
              className={`noshow-com ${
                reactions
                  .filter((r) => r.reaction === `${a}`)
                  .some((r) => r.user_id === user.user_id)
                  ? "picked"
                  : ""
              }`}
            >
              :D
            </span>
            <span className="noshow-com">
              {reactions.filter((r) => r.reaction === `${a}`).length}
            </span>
          </span>
        );
      })}
      {/* <span
        className="flex noshow-com"
        onClick={() => {
          if (!postReactions.some((r) => r.user_id === user.user_id)) {
            fetchLikePost(1, 0);
          }
        }}
      >
        <span className="noshow-com">:D</span>
        <span className="noshow-com">
          {postReactions.filter((r) => r.reaction === "0").length}
        </span>
      </span>

      <span
        className="flex noshow-com"
        onClick={() => {
          if (!postReactions.some((r) => r.user_id === user.user_id)) {
            fetchLikePost(1, 1);
          }
        }}
      >
        <span className="noshow-com">:*</span>
        <span className="noshow-com">
          {postReactions.filter((r) => r.reaction === "1").length}
        </span>
      </span>
      <span
        className="flex noshow-com"
        onClick={() => {
          if (!postReactions.some((r) => r.user_id === user.user_id)) {
            fetchLikePost(1, 2);
          }
        }}
      >
        <span className="noshow-com">:)</span>
        <span className="noshow-com">
          {postReactions.filter((r) => r.reaction === "2").length}
        </span>
      </span> */}
    </div>
  );
};
