import { useContext } from "react";
import { BabyContext, ActivityToLogContext } from "../App";

function CreateRecord({ userInput }) {
  const { babyContext, setBabyContext } = useContext(BabyContext);
  const { activityToLogContext, setActivityToLogContext } =
    useContext(ActivityToLogContext);

  console.log(userInput);

  async function writeActivitytoDB() {
    const response = await fetch(
      "https://api.airtable.com/v0/appEcc6SwsoURvmeO/tbli0KeI5LkN332ps",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer patIefr5XHGrnjTal.ce642a147091cffd80d78258215e6695909498a75c9c7d5c91fbce5f3b3fc91f",
        },
        body: JSON.stringify(userInput),
      }
    );
    const newBabyData = await response.json();
    setBabyContext(newBabyData);
  }

  writeActivitytoDB(userInput);
}

export default CreateRecord;
