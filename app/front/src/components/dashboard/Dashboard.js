// image DB
// session / token henry-session prolly
// pagination

import { useState, useEffect, useCallback } from "react";
import { Header } from "./partials/Header";
import { Post } from "./partials/Post";
import { WritePost } from "./partials/WritePost";
import { Search } from "./partials/Search";
import { Menu } from "./partials/Menu";
import { If } from "../../utils/If";

import styled from "styled-components";

import { get } from "../../utils/http";
import { WriteComment } from "./partials/WriteComment";

const StyledDiv = styled("div")`
  background-image: url(../../writable/profile_pics/${(props) => props.img});
`;

export const Dashboard = ({ setLoggedIn, theme, setTheme, user }) => {
  console.log(user);
  // const [showFeed, setShowFeed] = useState(true);
  const [showWritePost, setShowWritePost] = useState(false);
  const [showWriteComment, setShowWriteComment] = useState(false);
  const [commentPost_id, setCommentPost_id] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showPostView, setShowPostView] = useState(false);
  const [chosenPost, setChosenPost] = useState(null);

  const [mainHashtags, setMainHashtags] = useState([]);

  const [postFilter, setPostFilter] = useState("ALL");

  const [searchedPosts, setSearchedPosts] = useState([]);
  // const [searchedHashtag, setSearchedHashtag] = useState(null);

  const [posts, setPosts] = useState([]);
  const [certainPosts, setCertainPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCertainPosts = async (hashtag) => {
    const abortController = new AbortController();
    let res = await get(
      `/post/get_certain_posts_data/?input=${hashtag}`,
      abortController.signal
    );
    console.log(res);
    setCertainPosts(res);
    return () => abortController.abort();
  };

  const fetchPosts = async (signal) => {
    let res = await get(`/post/get_posts_data`, signal);
    setPosts(res);
    setLoading(false);
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

  useEffect(async () => {
    const abortController = new AbortController();
    await fetchMainHashtags(abortController.signal);
    await fetchPosts(abortController.signal);
    return () => abortController.abort();
  }, []);

  if (loading) {
    return <h3>loading ..</h3>;
  }

  return (
    <>
      <If
        condition={
          !showWritePost &&
          !showSearch &&
          !showMenu &&
          !showWriteComment &&
          !showPostView
        }
      >
        <header className="flex JC-SB header">
          <StyledDiv img={user.image} className="header-user-img"></StyledDiv>
          <div className="header-stars" onClick={() => setTheme(!theme)}></div>
        </header>

        <section>
          <section className="top-btns flex JC-C">
            <div className="menu-btn flex" onClick={() => setShowMenu(true)}>
              <i class="fas fa-bars"></i>
            </div>
            <div
              className="write-post-btn flex"
              onClick={() => setShowWritePost(true)}
            >
              <i class="fas fa-pencil-alt"></i>
            </div>
            <div
              className="search-btn flex"
              onClick={() => setShowSearch(true)}
            >
              <i class="fas fa-search"></i>
            </div>
          </section>
        </section>

        <section className="container">
          <div className="flex">
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
                    setPostFilter(h.content);
                    fetchCertainPosts(h.content.slice(1));
                  }}
                >
                  {h.content}
                </div>
              );
            })}
          </div>
          <div className="posts">
            <If condition={certainPosts.length < 1}>
              {posts.map((post, i) => {
                console.log(post);
                return (
                  <div
                    onClick={() => {
                      setChosenPost(post);
                      setShowPostView(true);
                    }}
                  >
                    <Post
                      key={i}
                      post={post}
                      chosenPost={chosenPost}
                      showPostView={showPostView}
                      setShowPostView={setShowPostView}
                      setShowWriteComment={setShowWriteComment}
                      setCommentPost_id={setCommentPost_id}
                      user={user}
                    />
                  </div>
                );
              })}
            </If>
            <If condition={certainPosts.length > 1}>
              {certainPosts.map((post, i) => {
                console.log(post);
                return (
                  <div
                    onClick={() => {
                      setChosenPost(post);
                      setShowPostView(true);
                    }}
                  >
                    <Post
                      key={i}
                      post={post}
                      chosenPost={chosenPost}
                      showPostView={showPostView}
                      setShowPostView={setShowPostView}
                      setShowWriteComment={setShowWriteComment}
                      setCommentPost_id={setCommentPost_id}
                      user={user}
                    />
                  </div>
                );
              })}
            </If>
          </div>
        </section>
      </If>

      <If condition={showWritePost}>
        <WritePost setShowWritePost={setShowWritePost} user={user} />
      </If>
      <If condition={showSearch}>
        <Search setShowSearch={setShowSearch} setPosts={setPosts} />
      </If>
      <If condition={showMenu}>
        <Menu user={user} setShowMenu={setShowMenu} setLoggedIn={setLoggedIn} />
      </If>
      <If condition={showPostView}>
        <section className="container">
          <div className="posts">
            <Post
              setShowPostView={setShowPostView}
              post={chosenPost}
              user={user}
            />
          </div>
        </section>
      </If>

      <If condition={showWriteComment}>
        <WriteComment
          user={user}
          post_id={commentPost_id}
          setShowWriteComment={setShowWriteComment}
        />
      </If>
    </>
  );
};
