import { useState, createContext, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import QuoteDay from "./components/QuoteDay";
import "./App.css";

const UserContext = createContext("null");

function App() {
  const [userName, setUserName] = useState("");

  return (
    <>
      <UserContext.Provider value={userName}>
        {/* to provide context variable with `value`, ie, data we wish the child
        components to consume. */}
        <div>
          <QuoteDay />
          <h1>YOU'VE GOT THIS, BABY!</h1>
          {/* <Form name={loginPage}> */}
          {/* <input value={userName}>Username</input>
          <button>Login</button> */}
          {/* </Form>
          <Routes>
            <Route path="/signup" element={<signUpForm />} />
          </Routes>
          <button type="submit">Sign up</button> */}

          {/* <Link to="https://vitejs.dev">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </Link> */}
        </div>
      </UserContext.Provider>
      ;
    </>
  );
}

export default App;
