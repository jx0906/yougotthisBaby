import { useState } from "react";
import { Button } from "@chakra-ui/button";
import Notification from "./notification";

function ActivityForm({ babyName, babyProfile }) {
  const handleSignupSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    console.log(formData);
    const data = Object.fromEntries(formData);

    async function createActivityRecord() {
      evt.preventDefault();
      const baseURL =
        "https://api.airtable.com/v0/appEcc6SwsoURvmeO/tbli0KeI5LkN332ps";

      const response = await fetch("http://localhost:3000/api/holidays", {
        method: "POST", // 'PUT', 'GET', 'DELETE'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const jsonObj = await response.json();
      addHoliday(jsonObj);
    }

    createHoliday(payload);
  };

  return (
    <>
      {/* <button type="click" img="insert settings icon" onClick={() => <SettingsPage/>}> */}
      <Notification />
      <div className="activities">
        {/* <ActivityLog/> */}
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
      </div>
    </>
  );
}

export default NewForm;
