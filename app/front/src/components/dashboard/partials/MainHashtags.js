import { useCallback, useEffect, useState, useContext } from "react";

import { ShowContext } from "../Dashboard";

export const MainHashtags = ({
  postFilter,
  setPostFilter,
  setCertainPosts,
  mainHashtags,
  fetchCertainPosts,
  fetchPosts,
  setPostsLoading,
}) => {
  const { dispatch } = useContext(ShowContext);
  return (
    <div className="flex">
      <div
        className={postFilter === "ALL" ? "filter" : ""}
        onClick={async () => {
          dispatch({ type: "showPosts" });
          setPostsLoading(true);
          setPostFilter("ALL");
          const abortController = new AbortController();
          await fetchPosts(abortController.signal);
          return () => abortController.abort();
          // setCertainPosts([]);
        }}
      >
        ALL
      </div>
      {mainHashtags.map((h) => {
        return (
          <div
            className={postFilter === h.content ? "filter" : ""}
            onClick={() => {
              // setLoading(true);
              dispatch({ type: "showPosts" });
              setPostsLoading(true);
              setPostFilter(h.content);
              fetchCertainPosts(h.content.slice(1));
            }}
          >
            {h.content}
          </div>
        );
      })}
    </div>
  );
};
