import { useCallback, useContext, useEffect, useState } from "react";

import { If } from "../../../utils/If";

import { POST, get } from "../../../utils/http";
import { checkYear } from "../../../utils/checkYear";

import { WriteComment } from "./WriteComment";

import { ShowContext } from "../Dashboard";
import { UserContext } from "../../../App";

import styled from "styled-components";
import { ReactionsPopup } from "./ReactionsPopup";
import { GoBack } from "./GoBack";
import { getDateAndTime } from "../../../utils/getDate&Time";
const StyledDiv = styled("div")`
  background-image: url(./static/media/${(props) => props.img});
`;

export const Post = ({ post, chosenPost, setChosenPost }) => {
  console.log(post.post.user_id);
  const { dispatch } = useContext(ShowContext);
  const { user } = useContext(UserContext);

  let postLikes = post.reactions.filter((l) => l.type === "0" && l.post_id);
  let postReactions = post.reactions.filter((l) => l.type === "1" && l.post_id);

  const [showReactions, setShowReactions] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchLikePost = async (type, reaction) => {
    console.log(reaction);
    let res = await POST(`/reaction/create_reaction`, {
      post_id: post.post.post_id,
      user_id: user.user_id,
      type: type,
      comment_id: "null",
      reaction: reaction,
      hashtags: post.hashtags,
    });
    console.log(res);

    // if (post.post.user_id !== user.user_id) {
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
  // }

  const fetchDeletePost = async () => {
    const abortController = new AbortController();
    let res = await get(
      `/post/delete_post/?id=${post.post.post_id}`,
      abortController.signal
    );
    console.log(res);
    return () => abortController.abort();
  };

  const fetchCertainHashtags = async (hashtag) => {
    const abortController = new AbortController();
    let res = await get(
      `/hashtags/get_certain_hashtags/?hashtag=${hashtag}`,
      abortController.signal
    );
    console.log(res);
    return () => abortController.abort();
  };

  if (loading) {
    return <h3>loading ..</h3>;
  }

  return (
    <>
      <If condition={chosenPost}>
        <div
          onClick={() => {
            setChosenPost(null);
            // dispatch({ type: "showPosts" });
          }}
        >
          <GoBack show={"showPosts"} />
        </div>
      </If>
      <section
        className="flex single-post"
        onClick={(e) => {
          // if (!e.target.classList.value.includes("noshow-com")) {
          //   setShowComments(!showComments);
          // }
        }}
      >
        <div className="author-img-container">
          <StyledDiv img={post.user.image} className="author-img"></StyledDiv>
          <If condition={chosenPost && post.comments.length > 0}>
            <div className="comment-line">
              <div className="line"></div>
              <div className="corner"></div>
            </div>
          </If>
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
              <If
                condition={
                  !postLikes.some((l) => l.user_id === user.user_id) &&
                  post.post.user_id !== user.user_id
                }
              >
                <span
                  className="noshow-com"
                  onClick={() => {
                    fetchLikePost(0, 0);
                  }}
                >
                  LIKEIT
                </span>
              </If>

              <span className="noshow-com likes-number">
                {postLikes.length}
              </span>
              <span className="noshow-com likes-svg"></span>
            </div>
          </div>

          <div className="post-content">
            {/* text */}
            <p className="post-text-content">{post.post.text}</p>

            {/* bild */}
            {/* <div className="post-pic"></div> */}
            <If condition={post.post.image}>
              <StyledDiv img={post.post.image} className="post-pic"></StyledDiv>
            </If>
          </div>

          <div className="flex JC-SB post-bot">
            <div className="flex FW-wrap">
              {post.hashtags.map((h) => {
                return (
                  <span
                    onClick={() => fetchCertainHashtags(h.content.slice(1))}
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
              <If condition={!chosenPost}>
                <span className="noshow-com">
                  <i class="fas fa-comment"></i>
                </span>
                <span className="comment-number">{post.comments.length}</span>
              </If>
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

      {/* comment */}
      {/* <If condition={showComments}> */}
      <If condition={chosenPost}>
        {post.comments.map((c, i) => {
          console.log(c);
          return (
            <Comment
              user={user}
              comment={c}
              index={i}
              length={post.comments.length - 1}
              postHashtags={post.hashtags}
            />
          );
        })}
      </If>

      <If condition={chosenPost}>
        <div
          onClick={() => {
            // setCommentPost_id(post.post.post_id);
            // setShowPostView(false);
            // setShowWriteComment(true);
            dispatch({ type: "showWriteComment" });
          }}
        >
          comment
        </div>
      </If>
    </>
  );
};

const Comment = ({ user, comment, index, length, postHashtags }) => {
  // console.log(comment);
  // console.log(index);
  // console.log(length);

  const [showReactions, setShowReactions] = useState(false);

  let commentLikes = comment.reactions.filter(
    (l) => l.type === "0" && l.comment_id
  );
  let commentReactions = comment.reactions.filter(
    (l) => l.type === "1" && l.comment_id
  );

  const fetchLikeComment = async (type, reaction) => {
    let res = await POST(`/reaction/create_reaction`, {
      post_id: "null",
      user_id: user.user_id,
      type: type,
      reaction: reaction,
      comment_id: comment.comment_id,
      hashtags: [],
    });
    console.log(res);

    let notiRes = await POST(`/notification/create_notification`, {
      time: getDateAndTime(),
      post_id: "null",
      comment_id: comment.comment_id,
      type: 1,
      notiUsers: [comment.user_id],
      origin: comment.post_id,
      post_user: false,
    });

    console.log(notiRes);
  };

  const fetchDeleteComment = async () => {
    const abortController = new AbortController();
    let res = await get(
      `/comment/delete_comment/?id=${comment.comment_id}`,
      abortController.signal
    );
    console.log(res);
    return () => abortController.abort();
  };

  return (
    <section className={`flex comment-container`}>
      <div className="comment-img-container">
        <StyledDiv
          img={comment.image}
          className="commentator-user-img"
        ></StyledDiv>
        <If condition={index !== length}>
          <div className="comment-line">
            <div className="line"> </div>
          </div>
        </If>
      </div>

      <div className="w100">
        <div className="flex JC-SB comment-top">
          <div>
            <span className="commentator-username">{comment.name}</span>
            <span className="comment-timestamp">{checkYear(comment.time)}</span>
          </div>

          <div className="flex noshow-com likes">
            <If condition={comment.user_id === user.user_id}>
              <div
                onClick={() => {
                  fetchDeleteComment();
                }}
              >
                delete
              </div>
            </If>
            <If
              condition={
                !commentLikes.some((l) => l.user_id === user.user_id) &&
                comment.user_id !== user.user_id
              }
            >
              <span
                className="noshow-com"
                onClick={() => {
                  fetchLikeComment(0, 0);
                }}
              >
                LIKEIT
              </span>
            </If>

            <span className="noshow-com likes-number">
              {commentLikes.length}
            </span>
            <span className="noshow-com likes-svg"></span>
          </div>
        </div>

        <div className="comment-content">
          <p>{comment.text}</p>
          <If condition={comment.comment_image}>
            <StyledDiv
              img={comment.comment_image}
              className="post-pic"
            ></StyledDiv>
          </If>
        </div>

        <div className="flex JC-E comment-bot">
          <span
            onClick={() => {
              if (comment.user_id !== user.user_id)
                setShowReactions(!showReactions);
            }}
          >
            <i class="fas fa-smile"></i>
          </span>
          <span className="reaction-number">
            {commentReactions.length}
            <If condition={showReactions}>
              <ReactionsPopup
                reactions={commentReactions}
                fetchLike={fetchLikeComment}
              />
              {/* <div className="flex reactions">
                <span
                  className="flex noshow-com"
                  onClick={() => {
                    if (
                      !commentReactions.some((r) => r.user_id === user.user_id)
                    ) {
                      fetchLikeComment(1, 0);
                    }
                  }}
                >
                  <span className="noshow-com">:D</span>
                  <span className="noshow-com">
                    {commentReactions.filter((r) => r.reaction === "0").length}
                  </span>
                </span>
                <span
                  className="flex noshow-com"
                  onClick={() => {
                    if (
                      !commentReactions.some((r) => r.user_id === user.user_id)
                    ) {
                      fetchLikeComment(1, 1);
                    }
                  }}
                >
                  <span className="noshow-com">:*</span>
                  <span className="noshow-com">
                    {commentReactions.filter((r) => r.reaction === "1").length}
                  </span>
                </span>
                <span
                  className="flex noshow-com"
                  onClick={() => {
                    if (
                      !commentReactions.some((r) => r.user_id === user.user_id)
                    ) {
                      fetchLikeComment(1, 2);
                    }
                  }}
                >
                  <span className="noshow-com">:)</span>
                  <span className="noshow-com">
                    {commentReactions.filter((r) => r.reaction === "2").length}
                  </span>
                </span>
              </div> */}
            </If>
          </span>
        </div>
      </div>
    </section>
  );
};
