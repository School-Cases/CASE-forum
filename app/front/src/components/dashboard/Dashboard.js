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

import { get } from "../../utils/http";
import { WriteComment } from "./partials/WriteComment";

export const Dashboard = ({ theme, setTheme }) => {
  // const [showFeed, setShowFeed] = useState(true);
  const [showWritePost, setShowWritePost] = useState(false);
  const [showWriteComment, setShowWriteComment] = useState(false);
  const [commentPost_id, setCommentPost_id] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async (signal) => {
    let res = await get(`/post/get_posts_data`, signal);
    console.log(res);
    setPosts(res);
    setLoading(false);
  };

  useEffect(async () => {
    const abortController = new AbortController();
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
          !showWritePost && !showSearch && !showMenu && !showWriteComment
        }
      >
        <header className="flex JC-SB">
          <div>pr.img</div>
          <div onClick={() => setTheme(!theme)}>stars</div>
        </header>

        <section className="flex JC-C">
          <div onClick={() => setShowMenu(true)}>meny</div>
          <div onClick={() => setShowWritePost(true)}>skriv</div>
          <div onClick={() => setShowSearch(true)}>sök</div>
        </section>

        {posts.map((post) => {
          console.log(post);
          return (
            <Post
              post={post}
              setShowWriteComment={setShowWriteComment}
              setCommentPost_id={setCommentPost_id}
            />
          );
        })}
      </If>

      <If condition={showWritePost}>
        <WritePost setShowWritePost={setShowWritePost} />
      </If>
      <If condition={showSearch}>
        <Search setShowSearch={setShowSearch} />
      </If>
      <If condition={showMenu}>
        <Menu setShowMenu={setShowMenu} />
      </If>

      <If condition={showWriteComment}>
        <WriteComment
          post_id={commentPost_id}
          setShowWriteComment={setShowWriteComment}
        />
      </If>
    </>
  );
};
