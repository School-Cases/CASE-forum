import { useEffect, useState } from "react";

import { If } from "../../../utils/If";

import { POST } from "../../../utils/http";

import { WriteComment } from "./WriteComment";

export const Post = ({ post, setShowWriteComment, setCommentPost_id }) => {
  console.log(post);
  let postLikes = post.reactions.filter((l) => l.type === "0" && l.post_id);
  let postReactions = post.reactions.filter((l) => l.type === "1" && l.post_id);

  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchLikePost = async () => {
    let res = await POST(`/reaction/create_reaction`, {
      post_id: post.post.post_id,
      user_id: 9,
      type: 0,
      reaction: 0,
      comment_id: "null",
    });
    console.log(res);
  };

  // const fetchCertainHashtags = async (signal) => {
  //   const abortController = new AbortController();
  //   let res = await get(
  //     `/hashtags/get_certain_hashtags/?input=${}`,
  //     abortController.signal
  //   );
  //   console.log(res);
  //   return () => abortController.abort();
  // };

  if (loading) {
    return <h3>loading ..</h3>;
  }

  return (
    <section className="container">
      <div className="posts">
      <section
        className="flex single-post"
        onClick={(e) => {
          if (!e.target.classList.value.includes("noshow-com")) {
            setShowComments(!showComments);
          }
        }}
      >
        <div className="author-img-container">
          <div className="author-img"></div>
          <div className="comment-line">
          <div className="line"></div>
          <div className="corner"></div>
          </div>
        </div>

        <div className="w100">
          <div className="flex JC-SB post-top">
            <div>
              <span className="author-username">{post.user.name}</span>
              <span className="post-timestamp">{post.post.time}</span>
            </div>

            <div className="noshow-com likes">
              <span className="noshow-com" onClick={() => fetchLikePost()}>
                LIKEIT
              </span>
              <span className="noshow-com likes-number">{postLikes.length}</span>
              <span className="noshow-com likes-svg"></span>
            </div>
          </div>

          <div className="post-content">
          {/* text */}
          <p className="post-text-content">{post.post.text}</p>

          {/* bild */}
          {/* <div className="post-pic"></div> */}
          </div>

          <div className="flex JC-SB post-bot">
            <div className="flex FW-wrap">
              {post.hashtags.map((h) => {
                return (
                  <span
                    // onClick={() => fetchCertainHashtags()}
                    className="noshow-com post-hashtag"
                  >
                    {h.content}
                  </span>
                );
              })}
            </div>

            <div className="flex">
              <span
                className="noshow-com"
                onClick={() => {
                  setCommentPost_id(post.post.post_id);
                  setShowWriteComment(true);
                }}
              >
                <i class="fas fa-comment"></i>
              </span>
              <span  className="comment-number">{post.comments.length}</span>
              <span><i class="fas fa-smile"></i></span>
              <span className="reaction-number">{postReactions.length}</span>
            </div>
          </div>
        </div>

       
      </section>

      {/* comment */}
      <If condition={showComments}>
        {post.comments.map((c) => {
          return <Comment comment={c} />;
        })}
      </If>
      </div>
    </section>
  );
};

const Comment = ({ comment }) => {
  console.log(comment);

  let commentLikes = comment.reactions.filter(
    (l) => l.type === "0" && l.comment_id
  );
  let commentReactions = comment.reactions.filter(
    (l) => l.type === "1" && l.comment_id
  );

  return (
    <section className={`flex comment-container`}>
      <div className="comment-img-container">
      <div className="commentator-user-img"></div>
      </div>

      <div className="w100">
        <div className="comment-top">
          <span className="commentator-username">{comment.name}</span>
          <span className="comment-timestamp">{comment.time}</span>
        </div>

        <p className="comment-content">{comment.text}</p>

        <div className="flex JC-E comment-bot">
          <span><i class="fas fa-comment"></i></span>
          <span className="comment-number">{commentLikes.length}</span>
          <span><i class="fas fa-smile"></i></span>
          <span className="reaction-number">{commentReactions.length}</span>
        </div>
      </div>
    </section>
  );
};