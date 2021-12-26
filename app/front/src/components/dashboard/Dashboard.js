// remove pic from images when changing profilepic and deleting post/comment

// when and what to update(fetch) when user interacts
// sockets??
// remove sessions
// res messages
// pagination

// notifications?
// ------------> post = 1. like 2. reaction 3. comment
// --> Nya interaktioner på din post "lorem ipsum bla .."

// ------------> comment = 1. like 2. reaction 3. also comment
// --> Andra har också kommenterat på post "lorem ipsum bla .."
// --> Nya interaktioner på din kommentar "lorem ipsum bla .."

// types: 0: Nya interaktioner på din post "lorem ipsum bla .."
// 1: Nya interaktioner på din kommentar "lorem ipsum bla .."
// 2: Andra har också kommenterat på post "lorem ipsum bla .."

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
import { If } from "../../utils/If";

import { UserContext } from "../../App";

import styled from "styled-components";

import { get } from "../../utils/http";
import { WriteComment } from "./partials/WriteComment";
import { Notifications } from "./partials/Notifications";

const StyledDiv = styled("div")`
  background-image: url(./static/media/${(props) => props.img});
`;

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
  const [lastPost, setLastPost] = useState(null);
  const [nextPagePosts, setNextPagePosts] = useState([]);
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
  const [nextPage, setNextPage] = useState(false);

  const [update, setUpdate] = useState(false);

  const [chosenPost, setChosenPost] = useState(null);

  const [mainHashtags, setMainHashtags] = useState([]);

  const [postFilter, setPostFilter] = useState("ALL");

  const [posts, setPosts] = useState([]);
  const [certainPosts, setCertainPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [smallLoading, setSmallLoading] = useState(false);

  const [notifications, setNotifications] = useState([]);

  // const scroll = () => {
  //   if (!loading && !smallLoading) {
  //     document.querySelector(".last").scrollIntoView();
  //   }
  // };

  const fetchCertainPosts = async (hashtag) => {
    const abortController = new AbortController();
    let res = await get(
      `/post/get_certain_posts_data/?input=${hashtag}`,
      abortController.signal
    );
    console.log(res);
    setCertainPosts(res.reverse());
    // setLoading(false);
    return () => abortController.abort();
  };

  const fetchPosts = async (signal) => {
    let res = await get(`/post/get_posts_data/?page=${page}`, signal);
    console.log(res[1].nextPage);
    setPosts(res[0].posts);
    if (res[1].nextPage) {
      setNextPage(true);
    } else {
      setNextPage(false);
    }
    setLoading(false);
  };

  const fetchPagePosts = async (thePage) => {
    const abortController = new AbortController();
    let mergedPosts = posts.concat(nextPagePosts);
    setPosts(mergedPosts);
    let res = await get(
      `/post/get_posts_data/?page=${thePage}`,
      abortController.signal
    );
    console.log(res[1].nextPage);
    // let mergedPosts = posts.concat(res[0].posts);
    // setPosts(res[0].posts);
    // setPosts((prev) => {
    //   return [...prev, res[0].posts];
    // });
    // console.log(mergedPosts);
    // setPosts(mergedPosts);
    setNextPagePosts(res[0].posts);

    console.log(posts);
    if (res[1].nextPage) {
      setNextPage(true);
    } else {
      setNextPage(false);
    }
    // setLoading(false);
    setSmallLoading(false);
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
  }, [fetchMainData]);

  useEffect(() => {
    if (!loading && !smallLoading) {
      document.querySelector(".last").scrollIntoView();
    }
  }, [smallLoading]);

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
        <header className="flex JC-SB header">
          <StyledDiv img={user.image} className="header-user-img"></StyledDiv>
          <div className="header-stars" onClick={() => setTheme(!theme)}></div>
        </header>

        <section>
          <section className="top-btns flex JC-C">
            <div
              className="menu-btn flex"
              onClick={() => {
                dispatch({ type: "showMenu" });
              }}
            >
              <i class="fas fa-bars"></i>
            </div>
            <div
              className="write-post-btn flex"
              onClick={() => {
                dispatch({ type: "showWritePost" });
              }}
            >
              <i class="fas fa-pencil-alt"></i>
            </div>
            <div
              className="search-btn flex"
              onClick={() => {
                dispatch({ type: "showSearch" });
              }}
            >
              <i class="fas fa-search"></i>
            </div>
          </section>
        </section>

        <section className="container">
          <div className="flex">
            {/* <If condition={page !== 0}>
              <div
                onClick={() => {
                  setLoading(true);
                  setPage(page - 1);
                  fetchPagePosts(page - 1);
                }}
              >
                previous page
              </div>
            </If> */}
            {/* <If condition={nextPage}>
              <div
                onClick={() => {
                  // setLoading(true);
                  setSmallLoading(true);
                  setPage(page + 1);
                  fetchPagePosts(page + 1);
                }}
              >
                next page
              </div>
            </If> */}
            <div
              className={postFilter === "ALL" ? "filter" : ""}
              onClick={() => {
                setPostFilter("ALL");
                setCertainPosts([]);
              }}
            >
              ALL
            </div>
            {mainHashtags.map((h) => {
              return (
                <div
                  className={postFilter === h.content ? "filter" : ""}
                  onClick={() => {
                    // setLoading(true);
                    setPostFilter(h.content);
                    fetchCertainPosts(h.content.slice(1));
                  }}
                >
                  {h.content}
                </div>
              );
            })}
          </div>
          <div
            onClick={() => {
              setLoading(true);
              setUpdate(!update);
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
            <If condition={smallLoading}>
              <div>small load</div>
            </If>
            <If condition={certainPosts.length < 1 && !smallLoading}>
              {posts.map((post, i) => {
                console.log(i, posts.length);
                // if (i + 1 === posts.length) {
                //   setLastPost("last");
                // }
                return (
                  <div
                    // className={`post${i}`}
                    className={`${i + 1 === posts.length ? "last" : ""}`}
                    onClick={(e) => {
                      if (!e.target.classList.value.includes("noshow-com")) {
                        setChosenPost(post);
                        dispatch({ type: "showPostView" });
                      }
                    }}
                  >
                    <Post key={i} post={post} chosenPost={chosenPost} />
                  </div>
                );
              })}
              <If condition={smallLoading}>
                <div>small load</div>
              </If>
              <If condition={nextPagePosts.length > 0 && !smallLoading}>
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
                    >
                      <Post key={i} post={post} chosenPost={chosenPost} />
                    </div>
                  );
                })}
              </If>
              <If condition={nextPage}>
                <div
                  onClick={(e) => {
                    console.log(e.target.offsetTop);
                    // let scrollToY = e.target.offsetTop;
                    // setLoading(true);
                    setSmallLoading(true);
                    setPage(page + 1);
                    // setLastPost(`post${posts.length - 1}`);
                    fetchPagePosts(page + 1);
                  }}
                >
                  next page
                </div>
              </If>
            </If>
            <If condition={certainPosts}>
              {certainPosts.map((post, i) => {
                console.log(post);
                return (
                  <div
                    onClick={(e) => {
                      console.log(e.target);
                      if (e.target.classList.value.includes("noshow-com")) {
                        console.log("noshow");
                      }
                      setChosenPost(post);
                      dispatch({ type: "showPostView" });
                    }}
                  >
                    <Post
                      key={i}
                      post={post}
                      chosenPost={chosenPost}
                      user={user}
                    />
                  </div>
                );
              })}
            </If>
          </div>
        </section>
      </If>

      <If condition={showState.showWritePost}>
        <WritePost user={user} />
      </If>
      <If condition={showState.showSearch}>
        <Search
          setPosts={setPosts}
          setCertainPosts={setCertainPosts}
          setPostFilter={setPostFilter}
        />
      </If>
      <If condition={showState.showMenu}>
        <Menu user={user} setLoggedIn={setLoggedIn} />
      </If>
      <If condition={showState.showPostView}>
        <section className="container">
          <div className="posts">
            <Post
              post={chosenPost}
              chosenPost={chosenPost}
              setChosenPost={setChosenPost}
              user={user}
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
