import { useState, useEffect, useCallback } from "react";
import { Header } from "./partials/Header";
import { Post } from "./partials/Post";
import { WritePost } from "./partials/WritePost";
import { Search } from "./partials/Search";
import { Menu } from "./partials/Menu";
import { If } from "../../utils/If";

import { get } from "../../utils/http";

export const Dashboard = ({ theme, setTheme }) => {
  // const [showFeed, setShowFeed] = useState(true);
  const [showWritePost, setShowWritePost] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [adata, setaData] = useState("hej");
  // const [loading, setLoading] = useState(true);

  // const fetchData = async (signal) => {
  //   let res = await get(`/home/test`, signal);
  //   // setaData(res.data);
  //   setaData("hejhejhjeh");
  //   console.log(res);
  //   setLoading(false);
  // };

  // useEffect(async () => {
  //   // const abortController = new AbortController();
  //   // await fetchData(abortController.signal);
  //   // return () => abortController.abort();
  //   // await fetch("http://localhost:8080/home/test")
  //   //   .then((res) => res.json())
  //   //   .then((data) => console.log(data));

  //   await fetch(`http://localhost:8080/home/test`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((messages) => {
  //       console.log(messages);
  //     });
  // }, []);

  // if (loading) {
  //   return <h3>loading ..</h3>;
  // }

  return (
    <>
      <If condition={!showWritePost && !showSearch && !showMenu}>
        <header className="flex JC-SB header">
          <div className="header-user-img"></div>
          <div className="header-stars" onClick={() => setTheme(!theme)}></div>
        </header>

        <section className="top-btns flex JC-C">
          <div className="menu-btn flex" onClick={() => setShowMenu(true)}>
            <i class="fas fa-bars"></i>
          </div>
          <div className="write-post-btn flex" onClick={() => setShowWritePost(true)}>
          <i class="fas fa-pencil-alt"></i>
          </div>
          <div className="search-btn flex" onClick={() => setShowSearch(true)}>
          <i class="fas fa-search"></i>
          </div>
        </section>

        <Post />
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
    </>
  );
};
