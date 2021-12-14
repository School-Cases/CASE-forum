import { useCallback, useEffect, useState } from "react";

import { If } from "../../../utils/If";

import { POST, get } from "../../../utils/http";

export const Search = ({ setShowSearch, setPosts }) => {
  const [searchHashtagsInput, setSearchHashtagsInput] = useState("");
  const [searchedHashtagsResult, setSearchedHashtagsResult] = useState([]);

  const fetchCertainHashtags = async () => {
    const abortController = new AbortController();
    let res = await get(
      `/hashtag/get_certain_hashtags/?input=${searchHashtagsInput}`,
      abortController.signal
    );
    console.log(res);
    setSearchedHashtagsResult(res.hashtags);
    return () => abortController.abort();
  };

  const fetchCertainPosts = async (hashtag) => {
    const abortController = new AbortController();
    let res = await get(
      `/post/get_certain_posts_data/?input=${hashtag}`,
      abortController.signal
    );
    console.log(res);
    setPosts(res);
    setShowSearch(false);
    return () => abortController.abort();
  };

  return (
    <>
      <section className="menu-container">
        <section className="menu-header">
          <h5 onClick={() => setShowSearch(false)}>
            <span>
              <i class="fas fa-arrow-left"></i>
            </span>
            <span className="menu-header-text">tillbaka</span>
          </h5>
        </section>

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
