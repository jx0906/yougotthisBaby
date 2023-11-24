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
  const apiKey = import.meta.env.VITE_MY_KEY;
  const [babyName, setBabyName] = useState("");
  const { babyContext, setBabyContext } = useContext(BabyContext);
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
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      const fetchedBabyData = await res.json();
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

        setBabyContext(babyData);
      }
      navigate("/home", { replace: true });
    } catch (error) {
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
        <div style={{ backgroundColor: "black", margin: "0", padding: "0" }}>
          <h5 style={{ color: "white", margin: "0", padding: "0.2em" }}>
            A tracking app developed for parents by parents;
          </h5>
          <h1 style={{ color: "yellow", margin: "0", padding: "0.2em" }}>
            YOU'VE GOT THIS, BABY!
          </h1>
        </div>
        <form
          style={{ display: "flex", flexDirection: "column", padding: "0.5em" }}
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
