import { useEffect, useState } from "react";

import { If } from "../../../utils/If";

export const Post = () => {
  const [showComments, setShowComments] = useState(false);

  return (
    <section className="container">
      <div className="posts">
      <section
        className="flex single-post"
        onClick={(e) => {
          console.log(e.target.classList.value.includes("flex"));
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

        <div>
          <div className="flex JC-SB post-top">
            <div>
              <span className="author-username">Pink Girl</span>
              <span className="post-timestamp">4 jan 11:04</span>
            </div>

            <div className="flex noshow-com likes">
              <div className="noshow-com likes-number">3</div>
              {/* <div className="noshow-com likes-title">likes</div> */}
              <div className="likes-svg"></div>
            </div>
          </div>

          <div className="post-content">
          {/* text */}
          <p className="post-text-content">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>

          {/* bild */}
          <div className="post-pic"></div>
          </div>

          <div className="flex JC-SB post-bot">
            <div className="flex FW-wrap">
              <span className="noshow-com post-hashtag">#Deltagare</span>
              <span className="noshow-com post-hashtag">#Hej</span>
              <span className="noshow-com post-hashtag">#Bajs</span>
              <span className="noshow-com post-hashtag">#Del</span>
            </div>

            <div className="flex">
              <span><i class="fas fa-comment"></i></span>
              <span className="comment-number">4</span>
              <span><i class="fas fa-smile"></i></span>
              <span className="reaction-number">12</span>
            </div>
          </div>
        </div>

       
      </section>

 {/* comment */}
 <If condition={showComments}>
        <Comment />
      </If>
      </div>
    </section>
  );
};

const Comment = () => {
  return (
    <section className={`flex comment-container`}>
      <div className="comment-img-container">
      <div className="commentator-user-img"></div>
      </div>

      <div>
        <div className="comment-top">
          <span className="commentator-username">Red Dude</span>
          <span className="comment-timestamp">4 jan 13:37</span>
        </div>

        <p className="comment-content">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum neque
          doloribus sunt pariatur perspiciatis architecto!
        </p>

        <div className="flex JC-E comment-bot">
          <span><i class="fas fa-comment"></i></span>
          <span className="comment-number">4</span>
          <span><i class="fas fa-smile"></i></span>
          <span className="reaction-number">12</span>
        </div>
      </div>
    </section>
  );
};
