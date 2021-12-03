export const Search = ({ setShowSearch }) => {
  return (
    <>
      <h4>search</h4>
      <h5 onClick={() => setShowSearch(false)}>
        <span>pil</span>
        <span>cancel</span>
      </h5>
    </>
  );
};
