import { useEffect, useState } from "react";

import { If } from "../../../utils/If";

export const Post = () => {
  const [showComments, setShowComments] = useState(false);

  return (
    <>
      <section
        className="flex"
        onClick={(e) => {
          console.log(e.target.classList.value.includes("flex"));
          if (!e.target.classList.value.includes("noshow-com")) {
            setShowComments(!showComments);
          }
        }}
      >
        <div>pr.img</div>

        <div>
          <div className="flex JC-SB">
            <div>
              <span>Blue Dude</span>
              <span>20.11.2021 11.04</span>
            </div>

            <div className="noshow-com">
              <span className="noshow-com">3</span>
              <span className="noshow-com">likes</span>
            </div>
          </div>

          {/* text */}
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum
            harum voluptatibus libero corporis cupiditate, voluptas accusamus
            aperiam? Nemo tempore laudantium adipisci, consequatur et dolorum
            neque doloribus sunt pariatur perspiciatis architecto!
          </p>

          {/* bild */}
          <div className="post-pic"></div>

          <hr />

          <div className="flex JC-SB">
            <div className="flex FW-wrap">
              <span className="noshow-com">#Deltagare</span>
              <span className="noshow-com">#Hej</span>
              <span className="noshow-com">#Bajs</span>
              <span className="noshow-com">#Del</span>
              <span className="noshow-com">#Hej</span>
              <span className="noshow-com">#Bajs</span>
              <span className="noshow-com">#Deltagare</span>
              <span className="noshow-com">#Hej</span>
              <span className="noshow-com">#Bajs</span>
            </div>

            <div className="flex">
              <span>com</span>
              <span>4</span>
              <span>rea</span>
              <span>12</span>
            </div>
          </div>
        </div>
      </section>

      {/* comment */}
      <If condition={showComments}>
        <Comment />
      </If>
    </>
  );
};

const Comment = () => {
  return (
    <section className={`flex`}>
      <div>pr.img</div>

      <div>
        <div>
          <span>Red Dude</span>
          <span>20.11.2021 13.37</span>
        </div>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum neque
          doloribus sunt pariatur perspiciatis architecto!
        </p>

        <hr />

        <div className="flex JC-E">
          <span>likes</span>
          <span>4</span>
          <span>rea</span>
          <span>12</span>
        </div>
      </div>
    </section>
  );
};
