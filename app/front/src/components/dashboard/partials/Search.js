import { useCallback, useEffect, useState, useContext } from "react";

import { GoBack } from "./GoBack";
import { MainHashtags } from "./MainHashtags";

import { If } from "../../../utils/If";
import { POST, get } from "../../../utils/http";

import { ShowContext } from "../Dashboard";
import { UserContext } from "../../../App";

import { Loading } from "../../animations/Loading";

export const Search = ({
  fetchCertainPosts,
  setPostFilter,
  setPostsLoading,
}) => {
  const { dispatch } = useContext(ShowContext);
  const { user } = useContext(UserContext);

  const [searchHashtagsInput, setSearchHashtagsInput] = useState("");
  const [searchedHashtagsResult, setSearchedHashtagsResult] = useState([]);

  const [loading, setLoading] = useState(true);

  const [mainHashtags, setMainHashtags] = useState([]);
  const fetchMainHashtags = async (signal) => {
    let res = await get(
      `/hashtag/get_user_main_hashtags/?user_id=${user.user_id}`,
      signal
    );
    console.log(res);
    setMainHashtags(res.main_hashtags);
    setLoading(false);
  };

  const fetchCertainHashtags = async () => {
    const abortController = new AbortController();
    let res = await get(
      `/hashtag/get_certain_hashtags/?input=${searchHashtagsInput}`,
      abortController.signal
    );
    setSearchedHashtagsResult(res.hashtags);
    return () => abortController.abort();
  };

  useEffect(async () => {
    const abortController = new AbortController();
    await fetchMainHashtags(abortController.signal);
    return () => abortController.abort();
  }, []);

  if (loading) {
    // return <h3>loading ..</h3>;
    return <Loading color={"white"} />;
  }

  return (
    <>
      <section className="menu-container">
        <GoBack show={"showPosts"} />

        {/* search interaction goes here */}

        {/* <MainHashtags
          postFilter={postFilter}
          setPostFilter={setPostFilter}
          mainHashtags={mainHashtags}
          fetchCertainPosts={fetchCertainPosts}
          fetchPosts={fetchPosts}
          setPostsLoading={setPostsLoading}
        /> */}

        {mainHashtags.map((h) => {
          return (
            <div
              className={`main-hashtag`}
              onClick={() => {
                // setLoading(true);
                dispatch({ type: "showPosts" });
                setPostsLoading(true);

                fetchCertainPosts(h.content.slice(1));

                setPostFilter(h.content);
              }}
            >
              {h.content}
            </div>
          );
        })}

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
