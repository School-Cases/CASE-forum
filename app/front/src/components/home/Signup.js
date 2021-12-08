export const Signup = ({ setMainState }) => {
  return (
    <>

<section className="flex login-top">
        <div className="glimra-logo"></div>
      </section>

      <section className="flex login-container">
        <section className="flex JC-SB heading">
          <span className="back-arrow login-welcome" onClick={() => setMainState("login")}>
            <i class="fas fa-arrow-left"></i>
            </span>
            <span className="login-welcome"> 
            Skapa konto
        </span>
        <span></span>
        </section>

        <div>
          <label className="login-text" htmlFor="email">mejl: </label>
          <input className="login-input" type="email" name="" placeholder="mejl" />
        </div>

        <div>
          <label className="login-text" htmlFor="name">namn: </label>
          <input className="login-input" type="name" name="" placeholder="namn" />
        </div>

        <div>
          <label className="login-text" htmlFor="password">lösenord: </label>
          <input className="login-input" type="password" name="" placeholder="lösenord" />
        </div>

        <div>
          <label className="login-text" htmlFor="">Deltagare</label> <input type="checkbox" name="" />
          <label className="login-text PD-LL" htmlFor="">Personal</label> <input type="checkbox" name="" />
        </div>

        <div className="user-img-upload">
        <section className="flex">
          <label className="login-text" htmlFor="">Profilbild: </label>
          <div className="img-icon"><i class="PD-LR far fa-image"></i></div>
          <input className="file-upload" type="file" src="" alt=""  />
          {/* <label for="files">Select file</label> */}
          </section>
        </div>

        <button className="login-btn">Skapa</button>
        {/* <div className="login-tree"></div> */}
      </section>
    </>
  );
};
