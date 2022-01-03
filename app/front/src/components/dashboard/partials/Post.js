import { useCallback, useContext, useState } from "react";

import { ReactionsPopup } from "./ReactionsPopup";

import { If } from "../../../utils/If";
import { POST, get } from "../../../utils/http";
import { checkYear } from "../../../utils/checkYear";
import { getDateAndTime } from "../../../utils/getDate&Time";

import { ShowContext } from "../Dashboard";
import { UserContext } from "../../../App";

import styled from "styled-components";
import { Like } from "../../animations/Like";
const StyledDiv = styled("div")`
  background-image: url(./static/media/${(props) => props.img});
`;

export const Post = ({
  posts,
  setPosts,
  fetchCertainPosts,
  post,
  setPostFilter,
}) => {
  const { dispatch } = useContext(ShowContext);
  const { user } = useContext(UserContext);

  const [showReactions, setShowReactions] = useState(false);
  const [loading, setLoading] = useState(false);

  const [likeAni, setLikeAni] = useState(false);

  const [postLikes, setPostLikes] = useState(
    post.reactions.filter((l) => l.type === "0" && l.post_id)
  );

  // let postLikes = post.reactions.filter((l) => l.type === "0" && l.post_id);
  let postReactions = post.reactions.filter((l) => l.type === "1" && l.post_id);

  const fetchLikePost = async (type, reaction) => {
    let res = await POST(`/reaction/create_reaction`, {
      post_id: post.post.post_id,
      user_id: user.user_id,
      type: type,
      comment_id: "null",
      reaction: reaction,
      hashtags: post.hashtags,
    });

    let corr = posts.map((p) => {
      if (p.post.post_id === post.post.post_id) {
        return { ...p, reactions: [...p.reactions, res[0]] };
      } else {
        return p;
      }
    });
    setPosts(corr);

    let notiRes = await POST(`/notification/create_notification`, {
      time: getDateAndTime(),
      post_id: post.post.post_id,
      comment_id: "null",
      type: 0,
      notiUsers: [post.post.user_id],
      origin: post.post.post_id,
      post_user: post.post.user_id,
    });
    console.log(notiRes);
  };

  const fetchDeletePost = async () => {
    const abortController = new AbortController();
    let res = await get(
      `/post/delete_post/?id=${post.post.post_id}`,
      abortController.signal
    );
    console.log(res);
    return () => abortController.abort();
  };

  // const theLikeAni = useCallback(() => {
  //   setLikeAni(true);
  //   setTimeout(() => {
  //     setLikeAni(false);
  //   }, [1000]);
  // }, [likeAni]);
  console.log(postLikes);

  if (loading) {
    return <h3>loading ..</h3>;
  }

  return (
    <>
      <section className="flex single-post">
        <div className="author-img-container">
          <StyledDiv img={post.user.image} className="author-img"></StyledDiv>
        </div>

        <div className="w100">
          <div className="flex JC-SB post-top">
            <div>
              <span className="author-username">{post.user.name}</span>
              <span className="post-timestamp">
                {checkYear(post.post.time)}
              </span>
            </div>

            <div className="flex noshow-com likes">
              <If condition={post.post.user_id === user.user_id}>
                <div
                  onClick={() => {
                    fetchDeletePost();
                  }}
                >
                  delete
                </div>
              </If>
              <span className="noshow-com likes-number">
                {postLikes.length}
              </span>
              <span
                className={`noshow-com like`}
                onClick={(e) => {
                  console.log(e.target);
                  if (
                    !postLikes.some((l) => l.user_id === user.user_id) &&
                    post.post.user_id !== user.user_id
                  ) {
                    setPostLikes((prev) => {
                      return [...prev, { user_id: user.user_id }];
                    });
                    fetchLikePost(0, 0);
                    e.target.closest(".like").classList.add("like-ani");
                    setTimeout(() => {
                      e.target.closest(".like").classList.remove("like-ani");
                    }, [2000]);
                  }
                }}
              >
                <Like
                  likeable={
                    !postLikes.some((l) => l.user_id === user.user_id) &&
                    post.post.user_id !== user.user_id
                  }
                  liked={postLikes.some((l) => l.user_id === user.user_id)}
                />
              </span>
            </div>
          </div>

          <div className="post-content">
            {/* text */}
            <p className="post-text-content">{post.post.text}</p>

            {/* bild */}
            <If condition={post.post.image}>
              <StyledDiv img={post.post.image} className="post-pic"></StyledDiv>
            </If>
          </div>

          <div className="flex JC-SB post-bot">
            <div className="flex FW-wrap">
              {post.hashtags.map((h) => {
                return (
                  <span
                    onClick={() => {
                      setPostFilter(h.content);
                      fetchCertainPosts(h.content.slice(1));
                    }}
                    className={`noshow-com post-hashtag ${
                      h.searched ? "searched" : ""
                    }`}
                  >
                    {h.content}
                  </span>
                );
              })}
            </div>

            <div className="flex">
              <span className="noshow-com">
                <i class="fas fa-comment"></i>
              </span>
              <span className="comment-number">{post.comments.length}</span>
              <span
                className="noshow-com"
                onClick={() => {
                  if (post.post.user_id !== user.user_id)
                    setShowReactions(!showReactions);
                }}
              >
                <i className="fas fa-smile noshow-com"></i>
              </span>
              <span className="reaction-number">
                {postReactions.length}
                <If condition={showReactions}>
                  <ReactionsPopup
                    reactions={postReactions}
                    fetchLike={fetchLikePost}
                  />
                </If>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
