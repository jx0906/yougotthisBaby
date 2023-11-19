import { useContext } from "react";
import { BabyContext } from "../Home";

function createRecord({ babyName, babyProfile }) {
  const babyProfile = useContext(BabyContext);

  async function createActivityRecord() {
    evt.preventDefault();
    const baseURL =
      "https://api.airtable.com/v0/appEcc6SwsoURvmeO/tbli0KeI5LkN332ps";

    const response = await fetch(`${baseURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer patIefr5XHGrnjTal.ce642a147091cffd80d78258215e6695909498a75c9c7d5c91fbce5f3b3fc91f",
      },
      body: JSON.stringify(payload),
    });
    const jsonObj = await response.json();
    addHoliday(jsonObj);
  }

  createHoliday(payload);
}
