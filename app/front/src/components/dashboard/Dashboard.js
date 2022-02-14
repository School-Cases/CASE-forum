// remove pic from images when  deleting post/comment

// when and what to update(fetch) when user interacts
// sockets??
// res messages
// pagination

// import { FiRefreshCw } from "react-icons/bs";

// kurser: allmän , bas, prep, gospel , barnsk, web1, web2, esp, text, kera, nya(smart),

// preview post pic
// post more pics than 1
// things slide up
// center post img?
// pic things
// thumb instead (like)
// fix long names fitting

// dark theme

import {
  useState,
  useEffect,
  useCallback,
  useReducer,
  useContext,
  createContext,
} from "react";

import { WritePost } from "./dashViews/WritePost";
import { Search } from "./dashViews/Search";
import { Menu } from "./dashViews/Menu";
import { WriteComment } from "./dashViews/WriteComment";
import { Notifications } from "./dashViews/Notifications";
import { ChosenPost } from "./dashViews/ChosenPost";

import { Header } from "./partials/Header";
import { Post } from "./partials/Post";

import { Loading } from "../animations/Loading";

import { If } from "../../utils/If";
import { get, POST } from "../../utils/http";

import { UserContext } from "../../App";

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
  // const [nextPagePosts, setNextPagePosts] = useState([]);
  const [chosenPost, setChosenPost] = useState(null);

  const [postFilter, setPostFilter] = useState(null);

  const [mainHashtags, setMainHashtags] = useState([]);
  const [favHashtags, setFavHashtags] = useState([]);

  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(false);
  const [loadMorePosts, setLoadMorePosts] = useState(false);

  const fetchCertainPosts = async (hashtag) => {
    setPostsLoading(true);
    // setNextPagePosts([]);
    const abortController = new AbortController();
    let res = await get(
      `/post/get_certain_posts_data/?input=${hashtag}&page=${0}`,
      abortController.signal
    );
    console.log(res[0]);
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
    setPostsLoading(true);
    let res = await get(`/post/get_posts_data/?page=${page}`, signal);
    setPosts(res[0].posts);
    console.log("posts", res[0].posts);
    if (res[1].nextPage) {
      setNextPageExists(true);
    } else {
      setNextPageExists(false);
    }
    setPostsLoading(false);
  };

  const fetchPagePosts = async (hashtag, thePage) => {
    const abortController = new AbortController();
    let res;
    if (postFilter) {
      res = await get(
        `/post/get_certain_posts_data/?input=${hashtag}&page=${thePage}`,
        abortController.signal
      );
    } else {
      res = await get(
        `/post/get_posts_data/?page=${thePage}`,
        abortController.signal
      );
    }
    // this works i think, dates just fucked up
    let mergedPosts = posts.concat(res[0].posts);
    setPosts(mergedPosts);

    // let mergedPosts = nextPagePosts.concat(res[0].posts);
    // setNextPagePosts(mergedPosts);

    // setNextPagePosts(res[0].posts);

    if (res[1].nextPage) {
      setNextPageExists(true);
    } else {
      setNextPageExists(false);
    }
    // setPostsLoading(false);
    setLoadMorePosts(false);
    return () => abortController.abort();
  };

  const fetchMainHashtags = async (signal) => {
    let res = await get(
      `/hashtag/get_user_main_hashtags/?user_id=${user.user_id}`,
      signal
    );
    setMainHashtags(res.main_hashtags);
    setFavHashtags(res.fav_hashtags);
    // setLoading(false);
  };

  const fetchNotifications = async (signal) => {
    let res = await get(
      `/notification/get_user_notifications/?user=${user.user_id}`,
      signal
    );
    setNotifications(res.notifications);
  };

  const fetchMainData = useCallback(async () => {
    const abortController = new AbortController();
    await fetchMainHashtags(abortController.signal);
    await fetchNotifications(abortController.signal);
    await fetchPosts(abortController.signal);
    setLoading(false);
    return () => abortController.abort();
  }, []);

  useEffect(async () => {
    await fetchMainData();
  }, [fetchMainData]);

  if (loading) {
    return <Loading color={"orange"} size={"big"} />;
  }

  return (
    <ShowContext.Provider value={{ showState, dispatch }}>
      <If condition={showState.showPosts}>
        <Header notiAmount={notifications.length} />

        <section className="container">
          <div className="flex JC-SB pad-1 con-top">
            <div className="flex FW-wrap hashtags-filter">
              <If condition={postFilter}>
                <div className="hashtag-box grey">
                  {postFilter}{" "}
                  <span
                    className="hashtag-delete"
                    onClick={() => {
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
            {/* <div
              onClick={() => {
                setLoading(true);
                fetchMainData();
              }}
            >
              <i class="fas fa-redo"></i>
            </div> */}
          </div>
          <div className="posts">
            <If condition={postsLoading}>
              <Loading color={"green"} size={"medium"} />
            </If>
            <If condition={!postsLoading}>
              <div className="gade"></div>
              {posts.map((post, i) => {
                return (
                  <>
                    <hr className="post-hr" />
                    <div
                      className={`pad-1 ${
                        i + 1 === posts.length ? "last" : ""
                      }`}
                      onClick={(e) => {
                        if (e.target.classList.value.includes("ok")) {
                          setChosenPost(post);
                          dispatch({ type: "showPostView" });
                        }
                        console.log(e.target);
                      }}
                      key={i}
                    >
                      <Post
                        posts={posts}
                        setPosts={setPosts}
                        post={post}
                        fetchCertainPosts={fetchCertainPosts}
                        setPostFilter={setPostFilter}
                        setPage={setPage}
                        setChosenPost={setChosenPost}
                      />
                    </div>
                    {/* <If condition={i === posts.length - 1}>
                      <hr />
                    </If> */}
                  </>
                );
              })}

              <If condition={nextPageExists && !loadMorePosts}>
                <div
                  className="pad-1 show-more-btn"
                  onClick={(e) => {
                    setLoadMorePosts(true);
                    setPage(page + 1);
                    fetchPagePosts(
                      postFilter ? postFilter.slice(1) : null,
                      page + 1
                    );
                  }}
                >
                  Visa fler
                </div>
              </If>

              <If condition={loadMorePosts}>
                <Loading color={"green"} size={"small"} />
              </If>
            </If>
          </div>
        </section>
      </If>

      <If condition={showState.showWritePost}>
        <WritePost
          // posts={posts}
          setPosts={setPosts}
          mainHashtags={mainHashtags}
          favHashtags={favHashtags}
        />
      </If>

      <If condition={showState.showSearch}>
        <Search
          mainHashtags={mainHashtags}
          favHashtags={favHashtags}
          fetchCertainPosts={fetchCertainPosts}
          setPostFilter={setPostFilter}
          setPostsLoading={setPostsLoading}
        />
      </If>

      <If condition={showState.showMenu}>
        <Menu setLoggedIn={setLoggedIn} theme={theme} setTheme={setTheme} />
      </If>

      <If condition={showState.showPostView}>
        <ChosenPost
          posts={posts}
          setPosts={setPosts}
          post={chosenPost}
          setChosenPost={setChosenPost}
        />
      </If>

      <If condition={showState.showWriteComment}>
        <WriteComment
          chosenPost={chosenPost}
          setChosenPost={setChosenPost}
          // posts={posts}
          // setPosts={setPosts}
        />
      </If>

      <If condition={showState.showNotifications}>
        <Notifications
          notifications={notifications}
          setNotifications={setNotifications}
          setChosenPost={setChosenPost}
        />
      </If>
    </ShowContext.Provider>
  );
};
