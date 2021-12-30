// remove pic from images when  deleting post/comment

// when and what to update(fetch) when user interacts
// sockets??
// res messages
// pagination

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

  const [postFilter, setPostFilter] = useState("ALL");

  const [mainHashtags, setMainHashtags] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(false);

  const [update, setUpdate] = useState(false);

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
    setPostsLoading(false);
    return () => abortController.abort();
  };

  const fetchMainHashtags = async (signal) => {
    let res = await get(
      `/hashtag/get_user_main_hashtags/?user_id=${user.user_id}`,
      signal
    );
    console.log(res);
    setMainHashtags(res.main_hashtags);
    // setLoading(false);
  };

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
    await fetchMainHashtags(abortController.signal);
    await fetchNotifications(abortController.signal);
    await fetchPosts(abortController.signal);
    return () => abortController.abort();
  }, []);

  useEffect(async () => {
    console.log("FETCHED ALL");
    await fetchMainData();
    setLoading(false);
  }, [fetchMainData]);

  useEffect(() => {
    if (!loading && !postsLoading) {
      document.querySelector(".last").scrollIntoView();
    }
  }, [postsLoading]);

  // useEffect(async () => {
  //   console.log("FETCHED ALL");
  //   const abortController = new AbortController();
  //   await fetchMainHashtags(abortController.signal);
  //   await fetchNotifications(abortController.signal);
  //   await fetchPosts(abortController.signal);
  //   return () => abortController.abort();
  // }, [update]);

  if (loading) {
    return <h3>loading ..</h3>;
  }

  return (
    <ShowContext.Provider value={{ showState, dispatch }}>
      <If condition={showState.showPosts}>
        <Header />

        <section className="container">
          <MainHashtags
            postFilter={postFilter}
            setPostFilter={setPostFilter}
            mainHashtags={mainHashtags}
            fetchCertainPosts={fetchCertainPosts}
            fetchPosts={fetchPosts}
            setPostsLoading={setPostsLoading}
          />
          <div
            onClick={() => {
              setLoading(true);
              // setUpdate(!update);
              fetchMainData();
            }}
          >
            update
          </div>
          <div
            onClick={() => {
              dispatch({ type: "showNotifications" });
            }}
          >
            noti {notifications.length}
          </div>

          <div className="posts">
            <If condition={postsLoading}>
              <div>small load</div>
            </If>
            <If condition={!postsLoading}>
              {posts.map((post, i) => {
                return (
                  <div
                    className={`${i + 1 === posts.length ? "last" : ""}`}
                    onClick={(e) => {
                      if (!e.target.classList.value.includes("noshow-com")) {
                        setChosenPost(post);
                        dispatch({ type: "showPostView" });
                      }
                    }}
                    key={i}
                  >
                    <Post post={post} fetchCertainPosts={fetchCertainPosts} />
                  </div>
                );
              })}

              <If condition={nextPagePosts.length > 0 && !postsLoading}>
                {nextPagePosts.map((post, i) => {
                  return (
                    <div
                      className={`post${i}`}
                      onClick={(e) => {
                        if (!e.target.classList.value.includes("noshow-com")) {
                          setChosenPost(post);
                          dispatch({ type: "showPostView" });
                        }
                      }}
                      key={i}
                    >
                      <Post post={post} fetchCertainPosts={fetchCertainPosts} />
                    </div>
                  );
                })}
              </If>
              <If condition={nextPageExists}>
                <div
                  onClick={(e) => {
                    setPostsLoading(true);
                    setPage(page + 1);
                    fetchPagePosts(page + 1);
                  }}
                >
                  next page
                </div>
              </If>
            </If>
          </div>
        </section>
      </If>

      <If condition={showState.showWritePost}>
        <WritePost />
      </If>
      <If condition={showState.showSearch}>
        <Search
          setPosts={setPosts}
          fetchCertainPosts={fetchCertainPosts}
          setPostFilter={setPostFilter}
        />
      </If>
      <If condition={showState.showMenu}>
        <Menu setLoggedIn={setLoggedIn} theme={theme} setTheme={setTheme} />
      </If>
      <If condition={showState.showPostView}>
        <section className="container">
          <div className="posts">
            <ChosenPost post={chosenPost} setChosenPost={setChosenPost} />
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
