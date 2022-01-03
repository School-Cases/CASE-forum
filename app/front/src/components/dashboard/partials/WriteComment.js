import { useState, useEffect, useCallback, useContext } from "react";

import { GoBack } from "./GoBack";

import { get, POST } from "../../../utils/http";
import { If } from "../../../utils/If";
import { getDateAndTime } from "../../../utils/getDate&Time";

import { ShowContext } from "../Dashboard";
import { UserContext } from "../../../App";

export const WriteComment = ({ chosenPost }) => {
  const { dispatch } = useContext(ShowContext);
  const { user } = useContext(UserContext);

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  // const fetchCreateComment = async () => {
  //   let hasCommented;
  //   if (chosenPost.comments.some((c) => c.user_id === user.user_id)) {
  //     hasCommented = true;
  //   } else {
  //     hasCommented = false;
  //   }
  //   let res = await POST(`/comment/create_comment`, {
  //     post_id: chosenPost.post.post_id,
  //     user_id: user.user_id,
  //     text: text,
  //     time: getDateAndTime(),
  //     hashtags: chosenPost.hashtags,
  //     hasCommented: hasCommented,
  //   });
  //   console.log(res);
  // };

  const fetchCreateComment = async () => {
    // let hashtagsIds = [];

    // chosenPost.hashtags.forEach((h) => {
    //   hashtagsIds.push(h.hashtag_id);
    // });

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
    console.log(image);

    formData.append("post_id", chosenPost.post.post_id);
    formData.append("user_id", user.user_id);
    formData.append("text", text);
    formData.append("time", getDateAndTime());
    // formData.append("hashtags", chosenPost.hashtags);
    formData.append("hashtags", JSON.stringify(hashtagsIds));
    formData.append("noInteractionUpd", noInteractionUpd);
    formData.append("image", image);

    await fetch(`http://localhost:8080/comment/create_comment`, {
      method: "POST",
      body: formData,
    });

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
    console.log(notiRes);

    // let gege = await POST(`/notification/create_notification`, {
    //   time: getDateAndTime(),
    //   post_id: chosenPost.post.post_id,
    //   comment_id: "null",
    //   type: 0,
    //   notiUsers: [],
    //   post_user: chosenPost.user.name,
    // });
    // console.log(gege);
  };

  return (
    <>
      <GoBack show={"showPostView"} />

      <div>
        <label htmlFor="">upload img: </label>
        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <div>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="What are you thinking..?"
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <button onClick={() => fetchCreateComment()}>send</button>
      </div>
    </>
  );
};
