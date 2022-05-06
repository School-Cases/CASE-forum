import { useState, useContext } from "react";

import { GoBack } from "../partials/GoBack";
// import { MainHashtags } from "./MainHashtags";

import { If } from "../../../utils/If";
import { POST, get } from "../../../utils/http";

import { ShowContext } from "../Dashboard";
import { UserContext } from "../../../App";

import { Loading } from "../../animations/Loading";

export const Search = ({
  fetchCertainPosts,
  setPostFilter,
  setPostsLoading,
  mainHashtags,
  favHashtags,
}) => {
  const { dispatch } = useContext(ShowContext);
  const { user } = useContext(UserContext);

  const [searchHashtagsInput, setSearchHashtagsInput] = useState("");
  const [searchedHashtagsResult, setSearchedHashtagsResult] = useState([]);

  const [loading, setLoading] = useState(false);

  const [hashLoading, setHashLoading] = useState(false);

  const [resMessage, setResMessage] = useState(null);

  // const [mainHashtags, setMainHashtags] = useState([]);
  // const [favHashtags, setFavHashtags] = useState([]);
  // const fetchMainHashtags = async (signal) => {
  //   let res = await get(
  //     `/hashtag/get_user_main_hashtags/?user_id=${user.user_id}`,
  //     signal
  //   );
  //   setMainHashtags(res.main_hashtags);
  //   setFavHashtags(res.fav_hashtags);
  //   setLoading(false);
  // };

  const fetchCertainHashtags = async () => {
    const abortController = new AbortController();
    setHashLoading(true);
    let res = await get(
      `/hashtag/get_certain_hashtags/?input=${searchHashtagsInput}`,
      abortController.signal
    );
    if (res.hashtags.length < 1) {
      setResMessage("Inga matchande hashtags hittade");
    } else {
      setResMessage(null);
    }
    setSearchedHashtagsResult(res.hashtags);
    setHashLoading(false);
    return () => abortController.abort();
  };

  // useEffect(async () => {
  //   const abortController = new AbortController();
  //   await fetchMainHashtags(abortController.signal);
  //   return () => abortController.abort();
  // }, []);

  if (loading) {
    return <Loading color={"white"} size={"big"} />;
  }

  return (
    <section className="main-container">
      <GoBack show={"showPosts"} />

      {/* search interaction goes here */}

      <div className="pad-1 main-view">
        <section className="flex FD-C add-hash-wrap">
          <div>
            <div>Mains:</div>
            <section className="flex hashtags-filter">
              {mainHashtags.map((h) => {
                return (
                  <div
                    className="hashtag-box orange"
                    onClick={(e) => {
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
            </section>
          </div>

          <If condition={favHashtags.length > 0}>
            <div>
              <div>Dina favvos:</div>
              <div className="flex FW-wrap hashtags-filter">
                {favHashtags.map((h) => {
                  return (
                    <div
                      className="hashtag-box orange"
                      onClick={(e) => {
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
              </div>
            </div>
          </If>

          <div>
            <div>Sök:</div>
            <section className="flex">
              <div className="flex hashtag-input-content">
                <input
                  type="text"
                  name=""
                  onChange={(e) => setSearchHashtagsInput(e.target.value)}
                />
                <span
                  className="flex btn"
                  onClick={() => fetchCertainHashtags()}
                >
                  <i class="fas fa-search"></i>
                </span>
              </div>
            </section>

            {/* sökta hash träffar */}
            <If condition={resMessage}>
              <h6>{resMessage}</h6>
            </If>
            <If condition={hashLoading}>
              <Loading color={"orange"} size={"small"} />
            </If>
            <If condition={!hashLoading}>
              <If condition={searchedHashtagsResult.length !== 0}>
                <div className="flex FW-wrap hashtags-filter">
                  {searchedHashtagsResult.map((h, i) => {
                    return (
                      <div
                        className="hashtag-box orange"
                        key={i}
                        onClick={() => {
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
                </div>
              </If>
            </If>
          </div>
        </section>
      </div>
    </section>
  );
};
