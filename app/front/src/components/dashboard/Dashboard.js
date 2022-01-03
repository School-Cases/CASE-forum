// remove pic from images when  deleting post/comment

// when and what to update(fetch) when user interacts
// sockets??
// res messages
// pagination

// import { FiRefreshCw } from "react-icons/bs";

import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useReducer,
  useContext,
  createContext,
  useLayoutEffect,
} from "react";

import { Header } from "./partials/Header";
import { Post } from "./partials/Post";
import { WritePost } from "./partials/WritePost";
import { Search } from "./partials/Search";
import { Menu } from "./partials/Menu";
import { WriteComment } from "./partials/WriteComment";
import { Notifications } from "./partials/Notifications";
import { ChosenPost } from "./partials/ChosenPost";

import { Loading } from "../animations/Loading";

import { If } from "../../utils/If";
import { get, POST } from "../../utils/http";

import { UserContext } from "../../App";
import { MainHashtags } from "./partials/MainHashtags";

export const ShowContext = createContext(null);

const reducer = (showState, action) => {
  switch (action.type) {
    case "showPosts":
      return {
        showPosts: true,
        showMenu: false,
        showSearch: false,
        showPostView: false,
        showWritePost: false,
        showWriteComment: false,
      };
    case "showMenu":
      return {
        showPosts: false,
        showMenu: true,
        showSearch: false,
        showPostView: false,
        showWritePost: false,
        showWriteComment: false,
      };
    case "showSearch":
      return {
        showPosts: false,
        showMenu: false,
        showSearch: true,
        showPostView: false,
        showWritePost: false,
        showWriteComment: false,
      };
    case "showPostView":
      return {
        showPosts: false,
        showMenu: false,
        showSearch: false,
        showPostView: true,
        showWritePost: false,
        showWriteComment: false,
      };
    case "showWritePost":
      return {
        showPosts: false,
        showMenu: false,
        showSearch: false,
        showPostView: false,
        showWritePost: true,
        showWriteComment: false,
      };
    case "showWriteComment":
      return {
        showPosts: false,
        showMenu: false,
        showSearch: false,
        showPostView: false,
        showWritePost: false,
        showWriteComment: true,
      };
    case "showNotifications":
      return {
        showPosts: false,
        showMenu: false,
        showSearch: false,
        showPostView: false,
        showWritePost: false,
        showWriteComment: false,
        showNotifications: true,
      };
  }
};

class ClassPost {
  constructor(comments, hashtags, post, reactions, user) {
    this.comments = comments;
    this.hashtags = hashtags;
    this.post = post;
    this.reactions = reactions;
    this.user = user;
  }
}

export const Dashboard = ({ setLoggedIn, theme, setTheme }) => {
  const { user } = useContext(UserContext);
  const [showState, dispatch] = useReducer(reducer, {
    showPosts: true,
    showMenu: false,
    showSearch: false,
    showPostView: false,
    showWritePost: false,
    showWriteComment: false,
    showNotifications: false,
  });

  const [page, setPage] = useState(0);
  const [nextPageExists, setNextPageExists] = useState(false);

  const [posts, setPosts] = useState([]);
  const [nextPagePosts, setNextPagePosts] = useState([]);

  const [chosenPost, setChosenPost] = useState(null);

  const [postFilter, setPostFilter] = useState(null);

  // const [mainHashtags, setMainHashtags] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(false);

  const [update, setUpdate] = useState(false);

  const [load2, setLoad2] = useState(false);

  const fetchCertainPosts = async (hashtag) => {
    const abortController = new AbortController();
    let res = await get(
      `/post/get_certain_posts_data/?input=${hashtag}&page=${page}`,
      abortController.signal
    );
    console.log(res);
    setPosts(res[0].posts);
    if (res[1].nextPage) {
      setNextPageExists(true);
    } else {
      setNextPageExists(false);
    }
    setPostsLoading(false);
    return () => abortController.abort();
  };

  const fetchPosts = async (signal) => {
    let res = await get(`/post/get_posts_data/?page=${page}`, signal);
    setPosts(res[0].posts);
    console.log("posts", res[0].posts);
    // let arr = [];
    // res[0].posts.map((p, i) => {
    //   console.log(p);
    //   let haha = new ClassPost(
    //     p.comments,
    //     p.hashtags,
    //     p.post,
    //     p.reactions,
    //     p.user
    //   );
    //   console.log(haha);
    //   arr.push(haha);
    // });
    // setPosts(arr);
    if (res[1].nextPage) {
      setNextPageExists(true);
    } else {
      setNextPageExists(false);
    }
    setPostsLoading(false);
  };

  const fetchPagePosts = async (thePage) => {
    const abortController = new AbortController();
    let mergedPosts = posts.concat(nextPagePosts);
    setPosts(mergedPosts);
    let res = await get(
      `/post/get_posts_data/?page=${thePage}`,
      abortController.signal
    );

    setNextPagePosts(res[0].posts);

    if (res[1].nextPage) {
      setNextPageExists(true);
    } else {
      setNextPageExists(false);
    }
    // setPostsLoading(false);
    setLoad2(false);
    return () => abortController.abort();
  };

  // const fetchMainHashtags = async (signal) => {
  //   let res = await get(
  //     `/hashtag/get_user_main_hashtags/?user_id=${user.user_id}`,
  //     signal
  //   );
  //   console.log(res);
  //   setMainHashtags(res.main_hashtags);
  //   // setLoading(false);
  // };

  const fetchNotifications = async (signal) => {
    let res = await get(
      `/notification/get_user_notifications/?user=${user.user_id}`,
      signal
    );
    console.log(res.notifications);
    setNotifications(res.notifications);
    // setLoading(false);
  };

  const fetchMainData = useCallback(async () => {
    const abortController = new AbortController();
    // await fetchMainHashtags(abortController.signal);
    await fetchNotifications(abortController.signal);
    await fetchPosts(abortController.signal);
    setLoading(false);
    return () => abortController.abort();
  }, []);

  useEffect(async () => {
    console.log("FETCHED ALL");
    await fetchMainData();
  }, [fetchMainData]);

  // useEffect(() => {
  //   if (!loading && !postsLoading) {
  //     document.querySelector(".last").scrollIntoView();
  //   }
  // }, [postsLoading]);

  const scroll = useCallback(async () => {
    if (!loading && !postsLoading) {
      document.querySelector(".last").scrollIntoView();
    }
  }, [fetchPagePosts]);

  // useEffect(async () => {
  //   console.log("FETCHED ALL");
  //   const abortController = new AbortController();
  //   await fetchMainHashtags(abortController.signal);
  //   await fetchNotifications(abortController.signal);
  //   await fetchPosts(abortController.signal);
  //   return () => abortController.abort();
  // }, [update]);

  if (loading) {
    // return <h3>loading ..</h3>;
    return <Loading color={"white"} />;
  }

  return (
    <ShowContext.Provider value={{ showState, dispatch }}>
      <If condition={showState.showPosts}>
        <Header notiAmount={notifications.length} />

        <section className="container">
          <div className="flex JC-SB pad-1 con-top">
            <div className="flex FW-wrap hashtags-filter">
              {/* <MainHashtags
                postFilter={postFilter}
                setPostFilter={setPostFilter}
                mainHashtags={mainHashtags}
                fetchCertainPosts={fetchCertainPosts}
                fetchPosts={fetchPosts}
                setPostsLoading={setPostsLoading}
              /> */}
              <If condition={postFilter}>
                <div className="hashtag-filter">
                  {postFilter}{" "}
                  <span
                    className="filter-delete"
                    onClick={() => {
                      setPostsLoading(true);
                      const abortController = new AbortController();
                      setPostFilter(null);
                      fetchPosts(abortController.signal);
                      return () => abortController.abort();
                    }}
                  >
                    <i class="fas fa-times"></i>
                  </span>
                </div>
              </If>
            </div>
            <div
              onClick={() => {
                setLoading(true);
                // setUpdate(!update);
                fetchMainData();
              }}
            >
              <i class="fas fa-redo"></i>
            </div>
          </div>
          <div className="posts">
            <If condition={postsLoading}>
              <Loading color={"green"} />
            </If>
            <If condition={!postsLoading}>
              <div className="gade"></div>
              {posts.map((post, i) => {
                return (
                  <>
                    <hr />
                    <div
                      className={`pad-1 ${
                        i + 1 === posts.length ? "last" : ""
                      }`}
                      onClick={(e) => {
                        if (!e.target.classList.value.includes("noshow-com")) {
                          setChosenPost(post);
                          dispatch({ type: "showPostView" });
                        }
                      }}
                      key={i}
                    >
                      <Post
                        posts={posts}
                        setPosts={setPosts}
                        post={post}
                        fetchCertainPosts={fetchCertainPosts}
                        setPostFilter={setPostFilter}
                      />
                    </div>
                    <If condition={i === posts.length - 1}>
                      <hr />
                    </If>
                  </>
                );
              })}

              <If condition={nextPagePosts.length > 0}>
                {nextPagePosts.map((post, i) => {
                  return (
                    <div
                      className={`pad-1 post${i}`}
                      onClick={(e) => {
                        if (!e.target.classList.value.includes("noshow-com")) {
                          setChosenPost(post);
                          dispatch({ type: "showPostView" });
                        }
                      }}
                      key={i}
                    >
                      <Post
                        posts={posts}
                        setPosts={setPosts}
                        post={post}
                        fetchCertainPosts={fetchCertainPosts}
                        setPostFilter={setPostFilter}
                      />
                    </div>
                  );
                })}
              </If>

              <If condition={nextPageExists && !load2}>
                <div
                  className="pad-1"
                  onClick={(e) => {
                    setLoad2(true);
                    setPage(page + 1);
                    fetchPagePosts(page + 1);
                  }}
                >
                  Visa fler
                </div>
              </If>

              {/* <If condition={nextPagePosts.length > 0 && !postsLoading}>
                {nextPagePosts.map((post, i) => {
                  return (
                    <div
                      className={`pad-1 post${i}`}
                      onClick={(e) => {
                        if (!e.target.classList.value.includes("noshow-com")) {
                          setChosenPost(post);
                          dispatch({ type: "showPostView" });
                        }
                      }}
                      key={i}
                    >
                      <Post
                        posts={posts}
                        setPosts={setPosts}
                        post={post}
                        fetchCertainPosts={fetchCertainPosts}
                      />
                    </div>
                  );
                })}
              </If>

              <If condition={nextPageExists}>
                <div
                  className="pad-1"
                  onClick={(e) => {
                    setPostsLoading(true);
                    setPage(page + 1);
                    fetchPagePosts(page + 1);
                  }}
                >
                  Visa fler
                </div>
              </If> */}
            </If>
          </div>
        </section>
      </If>

      <If condition={showState.showWritePost}>
        <WritePost />
      </If>
      <If condition={showState.showSearch}>
        <Search
          // setPosts={setPosts}
          fetchCertainPosts={fetchCertainPosts}
          setPostFilter={setPostFilter}
          setPostsLoading={setPostsLoading}
        />
      </If>
      <If condition={showState.showMenu}>
        <Menu setLoggedIn={setLoggedIn} theme={theme} setTheme={setTheme} />
      </If>
      <If condition={showState.showPostView}>
        <section className="container">
          <div className="posts">
            <ChosenPost
              posts={posts}
              setPosts={setPosts}
              post={chosenPost}
              setChosenPost={setChosenPost}
            />
          </div>
        </section>
      </If>

      <If condition={showState.showWriteComment}>
        <WriteComment chosenPost={chosenPost} />
      </If>

      <If condition={showState.showNotifications}>
        <Notifications
          notifications={notifications}
          setChosenPost={setChosenPost}
        />
      </If>
    </ShowContext.Provider>
  );
};
