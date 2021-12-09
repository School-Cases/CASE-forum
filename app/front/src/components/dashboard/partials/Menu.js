export const Menu = ({ setShowMenu }) => {
  return (
    <>
    <section className="menu-container">
      <section className="menu-header">
      <h5 onClick={() => setShowMenu(false)}>
        <span><i class="fas fa-arrow-left"></i></span>
        <span className="menu-header-text">tillbaka</span>
      </h5>
      </section>

      {/* menu items go here */}

      </section>
    </>
  );
};
