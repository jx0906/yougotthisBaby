import { useState, createContext, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import QuoteDay from "./components/QuoteDay";
import "./App.css";

const UserContext = createContext("null");

function App() {
  const [userName, setUserName] = useState("");
  const [userProfile, setUserProfile] = useState({});

  function handleLoginSubmit(evt) {
    evt.preventDefault();
    const baseURL =
      "https://api.airtable.com/v0/appEcc6SwsoURvmeO/tblsO0cMQ3OyEkwSr/";

    // console.log(`${baseURL}?userName=${userName}`); https://api.airtable.com/v0/appEcc6SwsoURvmeO/tblsO0cMQ3OyEkwSr/?userName=test

    const fetchUserLoginData = async () => {
      const res = await fetch(
        `${baseURL}?userName=${userName}&filterByFormula={userName}='${userName}'`,
        //https://api.airtable.com/v0/appEcc6SwsoURvmeO/tblsO0cMQ3OyEkwSr?userName=test&filterByFormula={userName}='test'
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer patIefr5XHGrnjTal.ced0d2650e64835dc3f518858af97636f2d6498768decfc77447f76b11ca4e06",
          },
        }
      );
      const fetchedUserData = await res.json();

      if (fetchedUserData.records[0] === undefined) {
        console.log(
          "No records of user. Please review your entry (caps-sensitive) or sign up below if you are new."
        );
        return;
      } else {
        console.log("1: " + fetchedUserData.records[0]);
        console.log("2: " + fetchedUserData.records[0].id);
        console.log("3: " + fetchedUserData.records[0].fields);

        // const userData = {
        //   userSysID: fetchedUserData.records[0].id,
        //   userName: fetchedUserData.records[0].fields.userName,
        //   babyName: fetchedUserData.records[0].fields.babyName,
        //   babyDOB: fetchedUserData.records[0].fields.babyDOB,
        //   babyWeight: fetchedUserData.records[0].fields.babyWeight,
        //   babyHeight: fetchedUserData.records[0].fields.babyHeight,
        // };

        const userData = {
          userSysID: fetchedUserData.records[0].id,
          userDetails: fetchedUserData.records[0].fields,
        };

        console.log(JSON.stringify(userData));
        // const userDataS = JSON.stringify(userData);
        // setUserProfile(userDataS);

        setUserProfile(userData);
        // console.log(`userProfile=${userProfile}`); // output [object object], same even if i const userDataS = JSON.stringify(userData) and setUserProfile(userDataS);
        // console.log(userProfile); // output {} with properties, no value; same even if i const userDataS = JSON.stringify(userData) and setUserProfile(userDataS);
        // console.log(JSON.stringify(userProfile)); // output {}, same even if i const userDataS = JSON.stringify(userData) and setUserProfile(userDataS);
      }
    };
    fetchUserLoginData();
  }

  return (
    <>
      <UserContext.Provider value={{ userName, setUserName }}>
        {/* to provide context variable with `value`, ie, data we wish the child
        components to consume. */}
        <div>
          <QuoteDay />
          <h1>YOU'VE GOT THIS, BABY!</h1>
          <form
            style={{ display: "flex", flexDirection: "column" }}
            name="login"
            onSubmit={handleLoginSubmit}
          >
            <input
              name="logininput"
              value={userName}
              placeholder="Enter your username"
              onChange={(evt) => {
                setUserName(evt.target.value);
                // console.log(`logging in using ${userName}`);
              }}
            />
            <button type="submit">Login</button>
            <button type="submit" onClick={handleSignupSubmit}>
              Sign up
            </button>
          </form>
          {/* <Routes>
            <Route path="/signup" element={<signUpForm />} />
          </Routes> */}
        </div>
      </UserContext.Provider>
    </>
  );
}

function handleSignupSubmit(evt) {
  evt.preventDefault();
  const userSignUp = {
    userName: true,
    babyName: "",
    babyDOB: 0,
    babyWeight: "",
    babyHeight: "",
  };

  // async function createUserAcc(userSignUp) {
  var Airtable = require("airtable");
  var base = new Airtable({
    apiKey:
      "patIefr5XHGrnjTal.ced0d2650e64835dc3f518858af97636f2d6498768decfc77447f76b11ca4e06",
  }).base("appEcc6SwsoURvmeO");

  base("signupTable").create({}, function (err, record) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(record.getId());
  });
}

//   const response = await fetch("/api/holidays", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   });
//   const jsonData = await response.json();
//   addHoliday(jsonData);
// }
// createHoliday(payload);

export default App;
export { UserContext };
