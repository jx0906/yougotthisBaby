import React, { useState, createContext } from "react";
import { useNavigate } from "react-router";

// import "./App.css";
import App from "./App.jsx";
import QuoteDay from "./components/QuoteDay";
import WelcomePage from "./components/WelcomePage";

const BabyContext = createContext("null");

function Home() {
  const [babyName, setBabyName] = useState("");
  const [babyDetails, setBabyDetails] = useState({});
  const navigate = useNavigate();

  async function handleLoginSubmit(evt) {
    evt.preventDefault();
    await fetchBabyLoginData();
    navigate("/welcome", { replace: true });
  }

  const fetchBabyLoginData = async () => {
    const baseURL =
      "https://api.airtable.com/v0/appEcc6SwsoURvmeO/tblsO0cMQ3OyEkwSr";
    const res = await fetch(
      `${baseURL}?filterByFormula={babyName}='${babyName}'`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer patIefr5XHGrnjTal.ce642a147091cffd80d78258215e6695909498a75c9c7d5c91fbce5f3b3fc91f",
        },
      }
    );
    if (!res.ok) {
      console.log(
        "No records of baby. Please review your entry (case-sensitive) or sign up below if you are new."
      );
      return;
    } else {
      const fetchedBabyData = await res.json();

      // console.log("1: " + fetchedBabyData.records[0]);
      // console.log("2: " + fetchedBabyData.records[0].id);
      // console.log("3: " + fetchedBabyData.records[0].fields);

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
      // setBabyDetails(babyDataS);

      setBabyDetails(babyData);
      // console.log(`babyDetails=${babyProfile}`); // output [object object], same even if i const babyDataS = JSON.stringify(babyData) and setBabyProfile(babyDataS);
      // console.log(babyDetails); // output {} with properties, no value; same even if i const babyDataS = JSON.stringify(babyData) and setBabyProfile(babyDataS);
      // console.log(JSON.stringify(babyDetails)); // output {}, same even if i const babyDataS = JSON.stringify(babyData) and setBabyProfile(babyDataS);
    }
  };

  return (
    <>
      <BabyContext.Provider value={{ babyDetails }}>
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
              name="loginDetails"
              value={babyName}
              placeholder="Enter your baby's name"
              onChange={(evt) => {
                setBabyName(evt.target.value);
              }}
            />
            <button
              style={{
                marginTop: 20,
                backgroundColor: "grey",
                color: "white",
              }}
            >
              Let's go!
            </button>
            {/* <button type="submit" onClick={() => <SignupForm />}>
      Sign up
    </button> */}
          </form>
        </div>
      </BabyContext.Provider>
    </>
  );
}

export default Home;
export { BabyContext };
