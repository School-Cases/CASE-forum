import { useState, useEffect, useCallback, useContext } from "react";

import { GoBack } from "../partials/GoBack";

import { api_address } from "../../../utils/http";

import { get, POST } from "../../../utils/http";
import { If } from "../../../utils/If";
import { getDateAndTime } from "../../../utils/getDate&Time";

import { Loading } from "../../animations/Loading";

import { ShowContext } from "../Dashboard";
import { UserContext } from "../../../App";

export const WriteComment = ({
  chosenPost,
  setChosenPost,
  // posts,
  // setPosts,
}) => {
  const { dispatch } = useContext(ShowContext);
  const { user } = useContext(UserContext);

  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([]);

  const fetchCreateComment = async () => {
    setLoading(true);
    if (text === "") {
      return;
    }

    let hashtagsIds = chosenPost.hashtags.map((h) => {
      return h.hashtag_id;
    });

    let noInteractionUpd;
    if (
      chosenPost.comments.some((c) => c.user_id === user.user_id) ||
      chosenPost.post.user_id === user.user_id
    ) {
      noInteractionUpd = 1;
    } else {
      noInteractionUpd = 0;
    }

    let formData = new FormData();
    formData.append("post_id", chosenPost.post.post_id);
    formData.append("user_id", user.user_id);
    formData.append("text", text);
    formData.append("time", getDateAndTime());
    // formData.append("hashtags", chosenPost.hashtags);
    formData.append("hashtags", JSON.stringify(hashtagsIds));
    formData.append("noInteractionUpd", noInteractionUpd);
    // formData.append("image", image);

    if (images.length > 0) {
      images.forEach((i) => {
        formData.append("images[]", i);
      });
    }

    // formData.append("images[]", images);

    let resComment;
    await fetch(`${api_address}/comment/create_comment`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => (resComment = data));
    console.log(resComment);

    let arr = [];
    if (
      chosenPost.comments.length < 1 &&
      user.user_id !== chosenPost.user.user_id
    ) {
      arr.push(chosenPost.user.user_id);
    } else {
      chosenPost.comments.map((c) => {
        if (
          c.user_id !== user.user_id &&
          !arr.includes(c.user_id)
          // && user.user_id !== chosenPost.user.user_id
          // &&
          // c.user_id !== chosenPost.user.user_id
        ) {
          arr.push(c.user_id);
        }
      });
    }
    let notiArr = arr.filter((n) => n !== user.user_id);

    let notiRes = await POST(`/notification/create_notification`, {
      time: getDateAndTime(),
      post_id: chosenPost.post.post_id,
      comment_id: "null",
      type: 2,
      notiUsers: notiArr,
      post_user: chosenPost.user.user_id,
      origin: chosenPost.post.post_id,
    });

    if (!resComment.fail) {
      let ny = chosenPost;
      ny.comments.push(resComment);
      setChosenPost(ny);
      // setPosts(haha);
      dispatch({ type: "showPostView" });
      // setLoading(false);
    }
  };

  if (loading) {
    return <Loading color={"white"} size={"big"} />;
  }

  // return (
  //   <section className="main-container">
  //     <GoBack show={"showPostView"} />
  //     <div className="pad-1 main-view">
  //       <section className="write-post-container">
  //         <div>
  //           <div>
  //             <textarea
  //               className="write-post"
  //               name=""
  //               id=""
  //               cols="30"
  //               rows={"8"}
  //               placeholder="What are you thinking..?"
  //               onChange={(e) => setText(e.target.value)}
  //             ></textarea>
  //           </div>
  //           <input
  //             className="file-upload write-post-file"
  //             type="file"
  //             name="image"
  //             // onChange={(e) => setImage(e.target.files[0])}
  //             onChange={(e) =>
  //               setImages((prev) => {
  //                 return [...prev, e.target.files[0]];
  //               })
  //             }
  //           />
  //         </div>

  //         <div className="flex send-container">
  //           <button
  //             className="send-post-btn"
  //             onClick={() => fetchCreateComment()}
  //           >
  //             <i class="fas fa-pencil-alt"></i>
  //           </button>
  //         </div>
  //       </section>
  //     </div>
  //   </section>
  // );
  return (
    <section className="main-container">
      <GoBack show={"showPostView"} />

      <div className="pad-1 main-view">
        <section className="write-post-container">
          <div className="textarea-wrap">
            <textarea
              className="write-post"
              name=""
              id=""
              cols="30"
              rows={"8"}
              placeholder="What are you thinking..?"
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button
              className="send-post-btn"
              onClick={() => fetchCreateComment()}
            >
              <i class="fas fa-pencil-alt"></i>
            </button>
          </div>
          <div className="flex FW-wrap write-post-imgs">
            {images.map((img, i) => {
              let splitImg = img.name.split(".");
              return (
                <div className="single-img" key={i}>
                  {(splitImg[0].length > 5
                    ? splitImg[0].slice(0, 5) + ".."
                    : splitImg[0]) +
                    "." +
                    splitImg[1]}
                  <span
                    className="img-delete"
                    onClick={() => {
                      setImages(images.filter((im) => im !== img));
                    }}
                  >
                    <i class="fas fa-times"></i>
                  </span>
                </div>
              );
            })}
          </div>
          <input
            className="file-upload write-post-file"
            type="file"
            // name="images"
            // multiple
            onChange={(e) => {
              console.log(e.target.files[0]);
              // setImage(e.target.files[0]);
              setImages((prev) => {
                return [...prev, e.target.files[0]];
              });
              console.log(images);
            }}
          />

          <div className="flex send-container"></div>
        </section>
      </div>
    </section>
  );
};
