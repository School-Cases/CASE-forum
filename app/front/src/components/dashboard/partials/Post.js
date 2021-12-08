import { useEffect, useState } from "react";

import { If } from "../../../utils/If";

import { POST } from "../../../utils/http";

import { WriteComment } from "./WriteComment";

export const Post = ({ post, setShowWriteComment, setCommentPost_id }) => {
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
    <>
      <section
        className="flex"
        onClick={(e) => {
          if (!e.target.classList.value.includes("noshow-com")) {
            setShowComments(!showComments);
          }
        }}
      >
        <div>pr.img</div>

        <div className="w100">
          <div className="flex JC-SB">
            <div>
              <span>{post.user.name}</span>
              <span>{post.post.time}</span>
            </div>

            <div className="noshow-com">
              <span className="noshow-com" onClick={() => fetchLikePost()}>
                LIKEIT
              </span>
              <span className="noshow-com">{postLikes.length}</span>
              <span className="noshow-com">likes</span>
            </div>
          </div>

          {/* text */}
          <p>{post.post.text}</p>

          {/* bild */}
          {/* <div className="post-pic"></div> */}

          <hr />

          <div className="flex JC-SB">
            <div className="flex FW-wrap">
              {post.hashtags.map((h) => {
                return (
                  <span
                    // onClick={() => fetchCertainHashtags()}
                    className="noshow-com"
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
                com
              </span>
              <span>{post.comments.length}</span>
              <span>rea</span>
              <span>{postReactions.length}</span>
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
    </>
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
    <section className={`flex`}>
      <div>pr.img</div>

      <div className="w100">
        <div>
          <span>{comment.name}</span>
          <span>{comment.time}</span>
        </div>

        <p>{comment.text}</p>

        <hr />

        <div className="flex JC-E">
          <span>likes</span>
          <span>{commentLikes.length}</span>
          <span>rea</span>
          <span>{commentReactions.length}</span>
        </div>
      </div>
    </section>
  );
};

// export const Post = ({ post }) => {
//   const [showComments, setShowComments] = useState(false);

//   return (
//     <>
//       <section
//         className="flex"
//         onClick={(e) => {
//           console.log(e.target.classList.value.includes("flex"));
//           if (!e.target.classList.value.includes("noshow-com")) {
//             setShowComments(!showComments);
//           }
//         }}
//       >
//         <div>pr.img</div>

//         <div>
//           <div className="flex JC-SB">
//             <div>
//               <span>Blue Dude</span>
//               <span>20.11.2021 11.04</span>
//             </div>

//             <div className="noshow-com">
//               <span className="noshow-com">3</span>
//               <span className="noshow-com">likes</span>
//             </div>
//           </div>

//           {/* text */}
//           <p>
//             Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum
//             harum voluptatibus libero corporis cupiditate, voluptas accusamus
//             aperiam? Nemo tempore laudantium adipisci, consequatur et dolorum
//             neque doloribus sunt pariatur perspiciatis architecto!
//           </p>

//           {/* bild */}
//           <div className="post-pic"></div>

//           <hr />

//           <div className="flex JC-SB">
//             <div className="flex FW-wrap">
//               <span className="noshow-com">#Deltagare</span>
//               <span className="noshow-com">#Hej</span>
//               <span className="noshow-com">#Bajs</span>
//               <span className="noshow-com">#Del</span>
//               <span className="noshow-com">#Hej</span>
//               <span className="noshow-com">#Bajs</span>
//               <span className="noshow-com">#Deltagare</span>
//               <span className="noshow-com">#Hej</span>
//               <span className="noshow-com">#Bajs</span>
//             </div>

//             <div className="flex">
//               <span>com</span>
//               <span>4</span>
//               <span>rea</span>
//               <span>12</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* comment */}
//       <If condition={showComments}>
//         <Comment />
//       </If>
//     </>
//   );
// };

// const Comment = () => {
//   return (
//     <section className={`flex`}>
//       <div>pr.img</div>

//       <div>
//         <div>
//           <span>Red Dude</span>
//           <span>20.11.2021 13.37</span>
//         </div>

//         <p>
//           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum neque
//           doloribus sunt pariatur perspiciatis architecto!
//         </p>

//         <hr />

//         <div className="flex JC-E">
//           <span>likes</span>
//           <span>4</span>
//           <span>rea</span>
//           <span>12</span>
//         </div>
//       </div>
//     </section>
//   );
// };
