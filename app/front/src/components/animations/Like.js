import { If } from "../../utils/If";

export const Like = ({ likeable, liked }) => {
  return (
    <div class={`star`}>
      <svg
        class={`star1`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 81.46 95"
      >
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_2-2" data-name="Layer 2">
            <path
              onClick={(e) => {
                if (likeable) {
                  e.target.classList.add("liked");
                }
              }}
              className={`cls-1 noshow-com ${liked ? "liked" : ""}`}
              d="M40.73,4.2h0C32.9,23,20.06,38.22,4.2,47.5h0C20.06,56.78,32.9,72,40.73,90.8h0c7.83-18.8,20.67-34,36.53-43.3h0C61.4,38.22,48.56,23,40.73,4.2Z"
            />
          </g>
        </g>
      </svg>
      <svg
        class="star2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 81.46 95"
      >
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_2-2" data-name="Layer 2">
            <path
              class="cls-1"
              d="M40.73,4.2h0C32.9,23,20.06,38.22,4.2,47.5h0C20.06,56.78,32.9,72,40.73,90.8h0c7.83-18.8,20.67-34,36.53-43.3h0C61.4,38.22,48.56,23,40.73,4.2Z"
            />
          </g>
        </g>
      </svg>
      <svg
        class="star3"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 81.46 95"
      >
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_2-2" data-name="Layer 2">
            <path
              class="cls-1"
              d="M40.73,4.2h0C32.9,23,20.06,38.22,4.2,47.5h0C20.06,56.78,32.9,72,40.73,90.8h0c7.83-18.8,20.67-34,36.53-43.3h0C61.4,38.22,48.56,23,40.73,4.2Z"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

// <div class="star">
//   <svg
//     class="star1"
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 81.46 95"
//   >
//     <g id="Layer_2" data-name="Layer 2">
//       <g id="Layer_2-2" data-name="Layer 2">
//         <path
//           className={`cls-1 ${liked ? "liked" : ""}`}
//           d="M40.73,4.2h0C32.9,23,20.06,38.22,4.2,47.5h0C20.06,56.78,32.9,72,40.73,90.8h0c7.83-18.8,20.67-34,36.53-43.3h0C61.4,38.22,48.56,23,40.73,4.2Z"
//         />
//       </g>
//     </g>
//   </svg>
//   <svg
//     class="star2"
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 81.46 95"
//   >
//     <g id="Layer_2" data-name="Layer 2">
//       <g id="Layer_2-2" data-name="Layer 2">
//         <path
//           class="cls-1"
//           d="M40.73,4.2h0C32.9,23,20.06,38.22,4.2,47.5h0C20.06,56.78,32.9,72,40.73,90.8h0c7.83-18.8,20.67-34,36.53-43.3h0C61.4,38.22,48.56,23,40.73,4.2Z"
//         />
//       </g>
//     </g>
//   </svg>
//   <svg
//     class="star3"
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 81.46 95"
//   >
//     <g id="Layer_2" data-name="Layer 2">
//       <g id="Layer_2-2" data-name="Layer 2">
//         <path
//           class="cls-1"
//           d="M40.73,4.2h0C32.9,23,20.06,38.22,4.2,47.5h0C20.06,56.78,32.9,72,40.73,90.8h0c7.83-18.8,20.67-34,36.53-43.3h0C61.4,38.22,48.56,23,40.73,4.2Z"
//         />
//       </g>
//     </g>
//   </svg>
// </div>
