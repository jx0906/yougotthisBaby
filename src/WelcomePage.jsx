import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import App, { BabyContext } from "./App.jsx";
import QuoteDay from "./components/QuoteDay.jsx";

function WelcomePage() {
  const [babyName, setBabyName] = useState("");
  const { babyContext, setBabyContext } = useContext(BabyContext);
  // The use of curly brackets above is to destructure the BabyContext obj. This provides a way to extract
  // specific properties from an object and assign them to variables with the same name.
  // In the context of useContext in React, useContext(BabyContext) returns an object with the values
  // provided by the BabyContext provider. If you want to extract multiple properties, you can include them
  // in the curly brackets.
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchBabyLoginData = async () => {
    try {
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
      const fetchedBabyData = await res.json();
      console.log("1: " + fetchedBabyData.records[0]);
      // console.log("2: " + fetchedBabyData.records[0].id);
      // console.log("3: " + fetchedBabyData.records[0].fields);

      // Check if the response is nil or undefined
      if (fetchedBabyData.records[0] === undefined) {
        setError(
          `${babyName} not found. Please review your entry (case-sensitive).`
        );
        return;
      } else {
        const babyData = {
          babySysID: fetchedBabyData.records[0].id,
          ...fetchedBabyData.records[0].fields,
        };
        // used spread syntax above to include all properties of fetchedBabyData.records[0].fields directly in
        // babyData without wrapping them inside another property (eg, babyDetails)
        // o/p = {"babySysID":"recVZw45VqAgSq9ji","babyHeight":59,"babyName":"babyTest1","babyWeight":2.96,"babyDOB":"2023-08-07"}
        // vs const babyData = {
        // babySysID: fetchedBabyData.records[0].id,
        // babyDetails: fetchedBabyData.records[0].fields,
        // }; which yielded {
        // "babySysID": "recbd7BvrVcIeP1mL",
        // "babyDetails": {
        //   "babyHeight": 55,
        //   "babyName": "baby2",
        //   "babyWeight": 3.04,
        //   "babyDOB": "2023-01-01"}

        console.log(JSON.stringify(babyData));
        // output: {"babySysID":"recbd7BvrVcIeP1mL","babyDetails":{"babyHeight":55,"babyName":"baby2","babyWeight":3.04,"babyDOB":"2023-01-01"}}
        // const babyDataS = JSON.stringify(babyData);
        // setBabyDetails(babyDataS);

        setBabyContext(babyData);
        // console.log(`babyDetails=${babyProfile}`); // output [object object], same even if i const babyDataS = JSON.stringify(babyData) and setBabyProfile(babyDataS);
        // console.log(babyDetails); // output {} with properties, no value; same even if i const babyDataS = JSON.stringify(babyData) and setBabyProfile(babyDataS);
        // console.log(JSON.stringify(babyDetails)); // output {}, same even if i const babyDataS = JSON.stringify(babyData) and setBabyProfile(babyDataS);
      }
      navigate("/home", { replace: true });
    } catch (error) {
      // console.error("Error fetching data:", error);
      setError(
        `Baby name: "${babyName}" not found. Please review your entry (case-sensitive).`
      );
      return;
    }
  };

  async function handleLoginSubmit(evt) {
    evt.preventDefault();
    const loginData = await fetchBabyLoginData();
  }

  return (
    <>
      <div>
        <QuoteDay />
        <p style={{ backgroundColor: "black" }}>
          <h6 style={{ color: "white", margin: "0.5cm" }}>
            A tracking app developed for parents by parents
          </h6>
          <h1 style={{ color: "yellow" }}>YOU'VE GOT THIS, BABY!</h1>
        </p>
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
            style={{ fontSize: "20px" }}
          />
          <button
            style={{
              marginTop: 20,
              backgroundColor: "grey",
              color: "white",
              fontSize: "15px",
            }}
          >
            Let's go!
          </button>
          {/* <button type="submit" onClick={() => <SignupForm />}>
      Sign up
    </button> */}
        </form>
        {error ? (
          <Alert
            status="warning"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} size="xs" />
            <AlertTitle mt={4} mb={1} fontSize="md">
              OOPS!
            </AlertTitle>
            {error}
          </Alert>
        ) : null}
      </div>
    </>
  );
}

export default WelcomePage;
