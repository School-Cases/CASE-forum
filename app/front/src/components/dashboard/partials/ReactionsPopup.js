import { useCallback, useContext, useEffect, useState } from "react";

import { If } from "../../../utils/If";

import { UserContext } from "../../../App";

export const ReactionsPopup = ({
  postUserId,
  reactions,
  setReactions,
  fetchLike,
  setShowReactions,
}) => {
  const { user } = useContext(UserContext);

  const reactionAmount = [0, 1, 2];
  return (
    <div className="flex noshow-com reactions">
      {reactionAmount.map((a) => {
        return (
          <span
            className="flex noshow-com"
            onClick={(e) => {
              if (
                !reactions.some((r) => r.user_id === user.user_id) &&
                postUserId !== user.user_id
              ) {
                setReactions((prev) => {
                  return [...prev, { user_id: user.user_id, reaction: `${a}` }];
                });
                setShowReactions(false);
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
              {/* <If condition={a === 0}>
                <i class="fas fa-grin-alt"></i>
              </If>
              <If condition={a === 1}>
                <i class="fas fa-surprise"></i>
              </If>
              <If condition={a === 2}>
                <i class="fas fa-grin-tears"></i>
              </If> */}
              <div className="flex noshow-com">
                <i
                  className={`noshow-com fas ${
                    a === 0
                      ? "fa-grin-alt"
                      : a === 1
                      ? "fa-surprise"
                      : "fa-grin-tears"
                  }
                  ${
                    reactions
                      .filter((r) => r.reaction !== `${a}`)
                      .some((r) => r.user_id === user.user_id && r.type !== a)
                      ? "no-picked"
                      : ""
                  }`}
                ></i>
                <span className="noshow-com">
                  {reactions.filter((r) => r.reaction === `${a}`).length}
                </span>
              </div>
            </span>
            {/* <span className="noshow-com">
              {reactions.filter((r) => r.reaction === `${a}`).length}
            </span> */}
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
