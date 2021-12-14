import { useState, useEffect, useCallback } from "react";

import { get, POST } from "../../../utils/http";
import { If } from "../../../utils/If";
import { getDateAndTime } from "../../../utils/getDate&Time";

export const WritePost = ({ setShowWritePost, user }) => {
  const [text, setText] = useState("");

  const [hashtags, setHashtags] = useState([]);

  const [searchHashtagsInput, setSearchHashtagsInput] = useState("");
  const [searchedHashtagsResult, setSearchedHashtagsResult] = useState([]);

  const fetchCreatePost = async () => {
    // if (user) {
    let res = await POST(`/post/create_post`, {
      user_id: user.user_id,
      text: text,
      time: getDateAndTime(),
      hashtags: hashtags,
    });
    let post_id = res;
    // hashtags.forEach(async (hashtag) => {
    //   let res2 = await POST(`/hashtag/handle_hashtag`, {
    //     content: hashtag,
    //     post_id: post_id,
    //     user_id: user.user_id,
    //   });
    // });
    // }
  };

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

  return (
    <>
      <section className="menu-container">
        <section className="menu-header">
          <h5 onClick={() => setShowWritePost(false)}>
            <span>
              <i class="fas fa-arrow-left"></i>
            </span>
            <span className="menu-header-text">cancel</span>
          </h5>
        </section>

        <section className="write-post-container">
          <div>
            <textarea
              className="write-post"
              name=""
              id=""
              cols="30"
              rows="8"
              placeholder="What are you thinking..?"
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>

          <div className="flex JC-SB write-post-bot">
            {/* <label htmlFor="">upload img: </label> */}
            <input
              className="file-upload write-post-file"
              type="file"
              name=""
              id=""
            />

            <div></div>
          </div>

          <div className="flex send-container">
            <button className="send-post-btn" onClick={() => fetchCreatePost()}>
              <i class="fas fa-pencil-alt"></i>
            </button>
          </div>

          <section className="flex">
            <div
              onClick={(e) => {
                console.log(hashtags);
                if (!hashtags.includes(e.target.textContent)) {
                  setHashtags((prev) => {
                    return [...prev, e.target.textContent];
                  });
                }
              }}
            >
              #Deltagare
            </div>
            <div
              onClick={(e) => {
                console.log(hashtags);
                if (!hashtags.includes(e.target.textContent)) {
                  setHashtags((prev) => {
                    return [...prev, e.target.textContent];
                  });
                }
              }}
            >
              #Skola
            </div>
          </section>

          <div>Hashtag:</div>

          <section className="flex">
            <div>
              <input
                type="text"
                name=""
                onChange={(e) => setSearchHashtagsInput(e.target.value)}
              />
              <button onClick={() => fetchCertainHashtags()}>sök</button>
              <button>add</button>
            </div>

            <div className="flex FW-wrap">
              {hashtags.map((h, i) => {
                console.log(h);
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setHashtags(hashtags.filter((ha) => ha !== h));
                    }}
                  >
                    {h}
                  </div>
                );
              })}
            </div>
          </section>

          {/* sökta hash träffar */}
          <If condition={searchedHashtagsResult.length !== 0}>
            {searchedHashtagsResult.map((h, i) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    if (!hashtags.includes(h.content)) {
                      setHashtags((prev) => {
                        return [...prev, h.content];
                      });
                    }
                  }}
                >
                  {h.content}
                </div>
              );
            })}
          </If>
        </section>
      </section>
    </>
  );
};
