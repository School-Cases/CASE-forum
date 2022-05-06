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
    <>
      {/* <div
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
      </div> */}
      {mainHashtags.map((h) => {
        return (
          <div
            className={`main-hashtag ${
              postFilter === h.content ? "filter" : ""
            }`}
            onClick={() => {
              // setLoading(true);
              dispatch({ type: "showPosts" });
              setPostsLoading(true);
              if (postFilter) {
                const abortController = new AbortController();
                fetchPosts(abortController.signal);
                return () => abortController.abort();
              } else {
                fetchCertainPosts(h.content.slice(1));
              }

              setPostFilter(postFilter === null ? h.content : null);
            }}
          >
            {h.content}
          </div>
        );
      })}
    </>
  );
};
