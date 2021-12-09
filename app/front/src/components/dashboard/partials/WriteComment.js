import { useState, useEffect, useCallback } from "react";

import { get, POST } from "../../../utils/http";
import { If } from "../../../utils/If";
import { getDateAndTime } from "../../../utils/getDate&Time";

export const WriteComment = ({ setShowWriteComment, post_id }) => {
  console.log(post_id);
  //   const [post_id, setPost_id] = useState(71);
  const [user_id, setUser_id] = useState(7);
  const [text, setText] = useState("post lalalal post posst");
  const [time, setTime] = useState("13/6 12.04");

  const fetchCreateComment = async () => {
    let res = await POST(`/comment/create_comment`, {
      post_id: post_id,
      user_id: user_id,
      text: text,
      time: getDateAndTime(),
    });
    console.log(res);
  };

  return (
    <>
      <h5 onClick={() => setShowWriteComment(false)}>
        <span>pil</span>
        <span>cancel</span>
      </h5>

      <div>
        <label htmlFor="">upload img: </label>
        <input type="file" name="" id="" />
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
