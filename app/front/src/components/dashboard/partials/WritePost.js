import { useState, useEffect, useCallback } from "react";

import { get, POST } from "../../../utils/http";
import { If } from "../../../utils/If";

export const WritePost = ({ setShowWritePost }) => {
  const [user_id, setUser_id] = useState(7);
  const [text, setText] = useState("post lalalal post posst");
  const [time, setTime] = useState("13/6 12.04");

  const [hashtags, setHashtags] = useState([]);

  const [searchHashtagsInput, setSearchHashtagsInput] = useState("");
  const [searchedHashtagsResult, setSearchedHashtagsResult] = useState([]);

  const fetchCreatePost = async () => {
    let res = await POST(`/post/create_post`, {
      user_id: user_id,
      text: text,
      time: time,
    });
    let post_id = res;
    hashtags.forEach(async (hashtag) => {
      let res2 = await POST(`/hashtag/handle_hashtag`, {
        content: hashtag,
        post_id: post_id,
        user_id: user_id,
      });
    });
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
      <h5 onClick={() => setShowWritePost(false)}>
        <span>pil</span>
        <span>cancel</span>
      </h5>

      <div>
        <label htmlFor="">upload img: </label>
        <input type="file" name="" id="" />
      </div>

      <div>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="What are you thinking..?"
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <button onClick={() => fetchCreatePost()}>send</button>
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
    </>
  );
};
