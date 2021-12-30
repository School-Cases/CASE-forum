import { useCallback, useEffect, useState, useContext } from "react";

import { If } from "../../../utils/If";
import { GoBack } from "./GoBack";
import { POST, get } from "../../../utils/http";

import { ShowContext } from "../Dashboard";

export const Search = ({ fetchCertainPosts, setPostFilter }) => {
  const { dispatch } = useContext(ShowContext);

  const [searchHashtagsInput, setSearchHashtagsInput] = useState("");
  const [searchedHashtagsResult, setSearchedHashtagsResult] = useState([]);

  const fetchCertainHashtags = async () => {
    const abortController = new AbortController();
    let res = await get(
      `/hashtag/get_certain_hashtags/?input=${searchHashtagsInput}`,
      abortController.signal
    );
    setSearchedHashtagsResult(res.hashtags);
    return () => abortController.abort();
  };

  return (
    <>
      <section className="menu-container">
        <GoBack show={"showPosts"} />

        {/* search interaction goes here */}

        <input
          type="text"
          name=""
          onChange={(e) => setSearchHashtagsInput(e.target.value)}
        />
        <button onClick={() => fetchCertainHashtags()}>sök</button>

        <If condition={searchedHashtagsResult.length !== 0}>
          {searchedHashtagsResult.map((h, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  dispatch({ type: "showPosts" });
                  setPostFilter(h.content);
                  fetchCertainPosts(h.content.slice(1));
                }}
              >
                {h.content}
              </div>
            );
          })}
        </If>
      </section>
    </>
  );
};
