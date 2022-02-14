export const Loading = ({ color, size }) => {
  return (
    <div class={`load-wrap ${size}`}>
      <div class="load-9">
        <div class="spinner">
          <div class="bubble-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81.46 95">
              {/* <defs></defs> */}
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_2-2" data-name="Layer 2">
                  <path
                    className={`cls-4 ${color}`}
                    d="M40.73,4.2h0C32.9,23,20.06,38.22,4.2,47.5h0C20.06,56.78,32.9,72,40.73,90.8h0c7.83-18.8,20.67-34,36.53-43.3h0C61.4,38.22,48.56,23,40.73,4.2Z"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div class="bubble-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81.46 95">
              {/* <defs></defs> */}
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_2-2" data-name="Layer 2">
                  <path
                    className={`cls-4 ${color}`}
                    d="M40.73,4.2h0C32.9,23,20.06,38.22,4.2,47.5h0C20.06,56.78,32.9,72,40.73,90.8h0c7.83-18.8,20.67-34,36.53-43.3h0C61.4,38.22,48.56,23,40.73,4.2Z"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
