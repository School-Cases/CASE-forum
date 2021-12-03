export const WritePost = ({ setShowWritePost }) => {
  return (
    <>
      <h5 onClick={() => setShowWritePost(false)}>
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
        ></textarea>

        <button>send</button>
      </div>

      <section className="flex">
        <div>#Deltagare</div>
        <div>#Del</div>
        <div>#Skola</div>
        <div>#Personal</div>
      </section>

      <div>Hashtag:</div>

      <section className="flex">
        <div>
          <input type="text" name="" />
        </div>

        <div className="flex FW-wrap">
          <div>#Deltagare</div>
          <div>#Del</div>
          <div>#Skola</div>
          <div>#Personal</div>
        </div>
      </section>
    </>
  );
};
