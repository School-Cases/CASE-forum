import { useCallback, useContext, useEffect, useState } from "react";

import { If } from "../../../utils/If";
import { POST, get } from "../../../utils/http";
import { checkYear } from "../../../utils/checkYear";
import { getDateAndTime } from "../../../utils/getDate&Time";

import { ShowContext } from "../Dashboard";
import { UserContext } from "../../../App";

import { Like } from "../../animations/Like";
import { Loading } from "../../animations/Loading";

import { ReactionsPopup } from "../partials/ReactionsPopup";
import { GoBack } from "../partials/GoBack";
import { ControlledCarousel } from "../partials/ControlledCarousel";

import styled from "styled-components";
const StyledDiv = styled("div")`
  background-image: url(./static/media/${(props) => props.img});
`;

export const ChosenPost = ({ posts, setPosts, post, setChosenPost }) => {
  const { dispatch } = useContext(ShowContext);
  const { user } = useContext(UserContext);

  const [postLikes, setPostLikes] = useState(
    post.reactions.filter((l) => l.type === "0" && l.post_id)
  );
  const [postReactions, setPostReactions] = useState(
    post.reactions.filter((l) => l.type === "1" && l.post_id)
  );

  const [showReactions, setShowReactions] = useState(false);
  const [loading, setLoading] = useState(false);

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
  };
  // }

  const fetchDeletePost = async () => {
    const abortController = new AbortController();
    let res = await get(
      `/post/delete_post/?id=${post.post.post_id}`,
      abortController.signal
    );
    return () => abortController.abort();
  };

  const fetchCertainHashtags = async (hashtag) => {
    const abortController = new AbortController();
    let res = await get(
      `/hashtags/get_certain_hashtags/?hashtag=${hashtag}`,
      abortController.signal
    );
    return () => abortController.abort();
  };

  if (loading) {
    return <Loading color={"white"} size={"big"} />;
  }

  return (
    <section className="main-container">
      <div
        onClick={() => {
          setChosenPost(null);
        }}
      >
        <GoBack show={"showPosts"} />
      </div>
      <div className="pad-1 main-view">
        <section className="flex single-post">
          <div className="author-img-container">
            <StyledDiv img={post.user.image} className="author-img"></StyledDiv>
            <If condition={post.comments.length > 0}>
              <div className="comment-line">
                <div className="line"></div>
                <div className="corner"></div>
              </div>
            </If>
          </div>

          <div className="w100">
            <div className="flex JC-SB post-top">
              <div
                className={`${post.user.name.length > 13 ? "flex FD-C" : ""}`}
              >
                <span className="author-username">{post.user.name}</span>
                <span className="post-timestamp">
                  {checkYear(post.post.time)}
                </span>
              </div>

              <div
                className={`flex noshow-com likes pointer ${
                  postLikes.some((l) => l.user_id === user.user_id)
                    ? "liked"
                    : ""
                }`}
              >
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
                  className={`noshow-com like pointer`}
                  onClick={(e) => {
                    if (
                      !postLikes.some((l) => l.user_id === user.user_id) &&
                      post.post.user_id !== user.user_id
                    ) {
                      setPostLikes((prev) => {
                        return [...prev, { user_id: user.user_id }];
                      });
                      fetchLikePost(0, 0);
                      // e.target.closest(".like").classList.add("like-ani");
                      // setTimeout(() => {
                      //   e.target.closest(".like").classList.remove("like-ani");
                      // }, [2000]);
                    }
                  }}
                >
                  {/* <Like
                    likeable={
                      !postLikes.some((l) => l.user_id === user.user_id) &&
                      post.post.user_id !== user.user_id
                    }
                    liked={postLikes.some((l) => l.user_id === user.user_id)}
                  /> */}
                  <i
                    class={`fas fa-thumbs-up 
                    
                    `}
                  ></i>
                </span>
              </div>
            </div>

            <div className="post-content">
              {/* text */}
              <p className="post-text-content">{post.post.text}</p>

              {/* bild */}

              <If condition={post.images.length > 0}>
                {/* <If condition={post.images.length > 1}> */}
                <ControlledCarousel images={post.images} />
                {/* </If> */}

                {/* <If condition={post.images.length === 1}>
                  <img
                    className="d-block w-100"
                    src={`${"./static/media/" + post.images[0].name}`}
                    alt=""
                  />
                </If> */}
              </If>
            </div>

            <div className="flex JC-SB post-bot">
              <div className="flex FW-wrap">
                {post.hashtags.map((h) => {
                  return (
                    <span
                      onClick={() => fetchCertainHashtags(h.content.slice(1))}
                      className={`noshow-com post-hashtag pointer ${
                        h.searched ? "searched" : ""
                      }`}
                    >
                      {h.content}
                    </span>
                  );
                })}
              </div>

              <div className="flex">
                <span
                  className="noshow-com pointer"
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
                      postUserId={post.post.user_id}
                      reactions={postReactions}
                      setReactions={setPostReactions}
                      fetchLike={fetchLikePost}
                      setShowReactions={setShowReactions}
                    />
                  </If>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* comment */}

        {post.comments.map((c, i) => {
          return (
            <>
              {/* <hr className="post-hr" /> */}
              <Comment
                user={user}
                comment={c}
                index={i}
                length={post.comments.length - 1}
                posts={posts}
                setPosts={setPosts}
              />
            </>
          );
        })}

        <div
          className="comment-input pointer"
          onClick={() => {
            // setCommentPost_id(post.post.post_id);
            // setShowPostView(false);
            // setShowWriteComment(true);
            dispatch({ type: "showWriteComment" });
          }}
        >
          <div className="flex send-post-btn">
            <i class="fas fa-pencil-alt"></i>
          </div>
        </div>
      </div>
      {/* <div
        className="comment-input"
        onClick={() => {
          // setCommentPost_id(post.post.post_id);
          // setShowPostView(false);
          // setShowWriteComment(true);
          dispatch({ type: "showWriteComment" });
        }}
      >
        <div className="send-post-btn">
          <i class="fas fa-pencil-alt"></i>
        </div>
      </div> */}
    </section>
  );
};

const Comment = ({
  user,
  comment,
  index,
  length,
  // postHashtags,
  posts,
  setPosts,
  // post,
}) => {
  const [showReactions, setShowReactions] = useState(false);

  const [commentLikes, setCommentLikes] = useState(
    comment.reactions.filter((l) => l.type === "0" && l.comment_id)
  );
  const [commentReactions, setCommentReactions] = useState(
    comment.reactions.filter((l) => l.type === "1" && l.comment_id)
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

    let corr = posts.map((p) => {
      let corr2 = p.comments.map((c) => {
        if (c.comment_id === comment.comment_id) {
          return { ...c, reactions: [...c.reactions, res[0]] };
        } else {
          return c;
        }
      });
      p.comments = corr2;
      return p;
    });
    // setCommentLikes((prev) => {
    //   return [...prev, res[0]];
    // });
    setPosts(corr);

    let notiRes = await POST(`/notification/create_notification`, {
      time: getDateAndTime(),
      post_id: "null",
      comment_id: comment.comment_id,
      type: 1,
      notiUsers: [comment.user_id],
      origin: comment.post_id,
      post_user: false,
    });
  };

  const fetchDeleteComment = async () => {
    const abortController = new AbortController();
    let res = await get(
      `/comment/delete_comment/?id=${comment.comment_id}`,
      abortController.signal
    );

    // let corr = posts.map((p) => {
    //   let corr2 = p.comments.map((c) => {
    //     if (c.comment_id !== comment.comment_id) {
    //       return c;
    //     }
    //   });
    //   p.comments = corr2;
    //   return p;
    // });
    // setPosts(corr);

    return () => abortController.abort();
  };

  return (
    <section
      className={`flex comment-container ${index === 0 ? "first-c" : ""}`}
    >
      <div className="comment-img-container">
        <StyledDiv
          img={comment.image}
          className="commentator-user-img"
        ></StyledDiv>
        {/* <If condition={index !== length}>
          <div className="comment-line">
            <div className="line"> </div>
          </div>
        </If> */}
      </div>

      <div className="w100">
        <div className="flex JC-SB comment-top">
          <div>
            <span className="commentator-username">{comment.name}</span>
            <span className="comment-timestamp">
              {/* <If condition={index === 0}>17/1 12:22</If>
              <If condition={index !== 0}>{checkYear(comment.time)}</If> */}
              {checkYear(comment.time)}
            </span>
          </div>
        </div>

        <div className="comment-content">
          <p>{comment.text}</p>
          {/* <If condition={comment.comment_image}>
            <StyledDiv
              img={comment.comment_image}
              className="post-pic"
            ></StyledDiv>
          </If> */}
          <If condition={comment.images.length > 0}>
            {/* <If condition={post.images.length > 1}> */}
            <ControlledCarousel images={comment.images} />
            {/* </If> */}

            {/* <If condition={post.images.length === 1}>
                  <img
                    className="d-block w-100"
                    src={`${"./static/media/" + post.images[0].name}`}
                    alt=""
                  />
                </If> */}
          </If>
        </div>

        <div className="flex JC-E comment-bot">
          <If condition={comment.user_id === user.user_id}>
            <div
              onClick={() => {
                fetchDeleteComment();
              }}
            >
              <i class="fas fa-trash-alt"></i>
            </div>
          </If>
          <div className="flex likes">
            <span
              className={`noshow-com like`}
              onClick={(e) => {
                if (
                  !commentLikes.some((l) => l.user_id === user.user_id) &&
                  comment.user_id !== user.user_id
                ) {
                  setCommentLikes((prev) => {
                    return [...prev, { user_id: user.user_id }];
                  });
                  fetchLikeComment(0, 0);
                  // e.target.closest(".like").classList.add("like-ani");
                  // setTimeout(() => {
                  //   e.target.closest(".like").classList.remove("like-ani");
                  // }, [2000]);
                }
              }}
            >
              {/* <Like
                likeable={
                  !commentLikes.some((l) => l.user_id === user.user_id) &&
                  comment.user_id !== user.user_id
                }
                liked={commentLikes.some((l) => l.user_id === user.user_id)}
              /> */}
              <i
                class={`fas fa-thumbs-up ${
                  commentLikes.some((l) => l.user_id === user.user_id)
                    ? "liked"
                    : ""
                }`}
              ></i>
            </span>
            <span className="noshow-com reaction-number">
              {commentLikes.length}
            </span>
          </div>

          <div className="flex">
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
                  postUserId={comment.user_id}
                  setReactions={setCommentReactions}
                  setShowReactions={setShowReactions}
                />
              </If>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
