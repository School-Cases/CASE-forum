export const Menu = ({ setShowMenu }) => {
  return (
    <>
      <h4>menu</h4>
      <h5 onClick={() => setShowMenu(false)}>
        <span>pil</span>
        <span>cancel</span>
      </h5>
    </>
  );
};
