export const Login = ({ setMainState }) => {
  return (
    <>
      <h2>Välkommen</h2>

      <div>
        <label htmlFor="email">email</label>
        <input type="email" name="" placeholder="email" />
      </div>

      <div>
        <label htmlFor="password">password</label>
        <input type="password" name="" placeholder="password" />
      </div>

      <button>logga in</button>

      <div>
        Ny användare?{" "}
        <span onClick={() => setMainState("signup")}>skapa konto</span>
      </div>
    </>
  );
};
