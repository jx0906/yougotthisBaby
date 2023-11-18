import { useState, createContext, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import QuoteDay from "./components/QuoteDay";
import "./App.css";

const BabyContext = createContext("null");

function App() {
  const [babyName, setBabyName] = useState("");
  const [babyProfile, setBabyProfile] = useState({});
  const loginFeedback = "";

  function handleLoginSubmit(evt) {
    evt.preventDefault();
    const baseURL =
      "https://api.airtable.com/v0/appEcc6SwsoURvmeO/tblsO0cMQ3OyEkwSr/";

    // console.log(`${baseURL}?babyName=${babyName}`); https://api.airtable.com/v0/appEcc6SwsoURvmeO/tblsO0cMQ3OyEkwSr/?babyName=test

    const fetchBabyLoginData = async () => {
      const res = await fetch(
        `${baseURL}?babyName=${babyName}&filterByFormula={babyName}='${babyName}'`,
        //https://api.airtable.com/v0/appEcc6SwsoURvmeO/tblsO0cMQ3OyEkwSr?babyName=test&filterByFormula={babyName}='test'
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer patIefr5XHGrnjTal.ced0d2650e64835dc3f518858af97636f2d6498768decfc77447f76b11ca4e06",
          },
        }
      );
      const fetchedBabyData = await res.json();

      if (fetchedBabyData.records[0] === undefined) {
        console.log(
          "No records of baby. Please review your entry (case-sensitive) or sign up below if you are new."
        );
        return;
      } else {
        console.log("1: " + fetchedBabyData.records[0]);
        console.log("2: " + fetchedBabyData.records[0].id);
        console.log("3: " + fetchedBabyData.records[0].fields);

        // const babyData = {
        //   babySysID: fetchedBabyData.records[0].id,
        //   babyName: fetchedBabyData.records[0].fields.babyName,
        //   babyDOB: fetchedBabyData.records[0].fields.babyDOB,
        //   babyWeight: fetchedBabyData.records[0].fields.babyWeight,
        //   babyHeight: fetchedBabyData.records[0].fields.babyHeight,
        // };

        const babyData = {
          babySysID: fetchedBabyData.records[0].id,
          babyDetails: fetchedBabyData.records[0].fields,
        };

        console.log(JSON.stringify(babyData));
        // const babyDataS = JSON.stringify(babyData);
        // setBabyProfile(babyDataS);

        setBabyProfile(babyData);
        // console.log(`babyProfile=${babyProfile}`); // output [object object], same even if i const babyDataS = JSON.stringify(babyData) and setBabyProfile(babyDataS);
        // console.log(babyProfile); // output {} with properties, no value; same even if i const babyDataS = JSON.stringify(babyData) and setBabyProfile(babyDataS);
        // console.log(JSON.stringify(babyProfile)); // output {}, same even if i const babyDataS = JSON.stringify(babyData) and setBabyProfile(babyDataS);
      }
    };
    fetchBabyLoginData();

    <Routes>
      <Route
        path="/welcome"
        element={<ActivityForm babyName={babyName} babyProfile={babyProfile} />}
      />
    </Routes>;
    // <ActivityForm />;
  }

  return (
    <>
      <BabyContext.Provider value={{ babyProfile, setBabyProfile }}>
        {/* to provide context variable with `value`, ie, data we wish the child
        components to consume. */}
        <div>
          <QuoteDay />
          <h1 style={{ backgroundColor: "black", color: "yellow" }}>
            YOU'VE GOT THIS, BABY!
          </h1>
          <form
            style={{ display: "flex", flexDirection: "column" }}
            name="login"
            onSubmit={handleLoginSubmit}
          >
            <input
              name="logininput"
              value={babyName}
              placeholder="Enter your baby's name"
              onChange={(evt) => {
                setBabyName(evt.target.value);
                // console.log(`logging in using ${babyName}`);
              }}
            />
            <button
              style={{
                marginTop: 20,
                backgroundColor: "grey",
                color: "white",
              }}
              type="submit"
            >
              Let's go!
            </button>
            {/* <button type="submit" onClick={() => <SignupForm />}>
              Sign up
            </button> */}
          </form>
          {/* <Routes>
            <Route path="/signup" element={<signUpForm />} />
          </Routes> */}
        </div>
      </BabyContext.Provider>
    </>
  );
}

export default App;
export { BabyContext };
