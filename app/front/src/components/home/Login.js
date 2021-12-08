export const Login = ({ setMainState }) => {
  return (
    <>
      <section className="flex login-top">
        <div className="glimra-logo"></div>
      </section>

      <section className="flex login-container">
      <h2 className="login-welcome">Välkommen!</h2>

      <div>
        <label className="login-text" htmlFor="email">mejl:</label>
        <input className="login-input" type="email" name="" placeholder="mejl" />
      </div>

      <div>
        <label className="login-text" htmlFor="password">lösenord:</label>
        <input className="login-input" type="password" name="" placeholder="lösenord" />
      </div>

      <button className="login-btn">logga in</button>

      <div className="login-create-user">
        Ny användare?{" "}
        <span className="create-user-link" onClick={() => setMainState("signup")}>skapa konto</span>
      </div>
      <div className="login-tree"></div>
      </section>
    </>
  );
};
