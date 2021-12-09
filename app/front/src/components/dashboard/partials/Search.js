export const Search = ({ setShowSearch }) => {
  return (
    <>
    <section className="menu-container">
      <section className="menu-header">
      <h5 onClick={() => setShowSearch(false)}>
        <span><i class="fas fa-arrow-left"></i></span>
        <span className="menu-header-text">tillbaka</span>
      </h5>
      </section>

      {/* search interaction goes here */}

      </section>
    </>
  );
};
