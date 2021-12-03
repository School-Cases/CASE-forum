export const Signup = ({ setMainState }) => {
  return (
    <>
      <h2>
        <span onClick={() => setMainState("login")}>back</span> Skapa konto
      </h2>

      <div>
        <label htmlFor="email">email: </label>
        <input type="email" name="" placeholder="email" />
      </div>

      <div>
        <label htmlFor="password">password: </label>
        <input type="password" name="" placeholder="password" />
      </div>

      <div>
        <label htmlFor="">Deltagare</label> <input type="checkbox" name="" />
        <label htmlFor="">Personal</label> <input type="checkbox" name="" />
      </div>

      <div>
        <label htmlFor="">Profilbild: </label>
        <input type="file" src="" alt="" />
      </div>

      <button>Skapa</button>
    </>
  );
};
