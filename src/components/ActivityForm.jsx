import React, { useContext } from "react";
import { BabyContext, ActivityToLogContext } from "../App";

function ActivityForm() {
  const { activityToLogContext, setActivityToLogContext } =
    useContext(ActivityToLogContext);
  const { babyContext, setBabyContext } = useContext(BabyContext);
  const babyName = babyContext.babyName;

  console.log("Context:" + ActivityToLogContext); // Context:[object Object]
  console.log("Variable:" + activityToLogContext); // Variable:Sleep
  console.log("Variable:" + babyContext); // Variable:[object Object]
  console.log("Variable:" + babyName); // Variable:[object Object]

  const handleSubmitNewRecord = (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    const data = Object.fromEntries(formData);
    console.log(data); // output = {activity: 'Play', dateTime: '2023-10-31T11:51', duration: '10', playType: 'tummy time'}

    const activityData = {
      records: [
        {
          fields: {
            babyName: babyName,
            ...data,
            // used the spread operator to include all properties from the data object into the fields property of
            // the activityData object. The duration property is handled separately, converting it to an integer as needed.
            duration: parseInt(data.duration) || "0",
          },
        },
      ],
    };

    console.log(activityData);
    addNewActivity(activityData);

    async function addNewActivity() {
      const response = await fetch(
        "https://api.airtable.com/v0/appEcc6SwsoURvmeO/tbli0KeI5LkN332ps",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer patIefr5XHGrnjTal.ce642a147091cffd80d78258215e6695909498a75c9c7d5c91fbce5f3b3fc91f",
          },
          body: JSON.stringify(activityData),
        }
      );
      const newActivityRecord = await response.json();
      console.log(JSON.stringify(newActivityRecord));
    }
  };

  return (
    <>
      <form
        className="activityForm"
        onSubmit={handleSubmitNewRecord}
        style={{
          minHeight: "600px",
          minWidth: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center horizontally
          justifyContent: "center", // Center vertically
        }}
      >
        <div
          className="Activity Overview"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label for="activity">Activity: </label>
          <select
            id="activity"
            name="activity"
            value={activityToLogContext}
            onChange={(e) => {
              setActivityToLogContext(e.target.value);
            }}
          >
            {/* The name attribute is used to identify form controls when submitting a form to the server. It is essential for form elements because it allows you to associate
            a user-friendly name with the data sent to the server, eg For example, when a form is submitted, the data is typically sent as key-value pairs, where the name
            attribute is used as the key. The value attribute, on the other hand, sets the initial value of an input element. For form elements like text inputs, radio buttons,
            checkboxes, etc., the value attribute defines the default or initial value of the input. */}
            <option name="Feed" value="Feed">
              Feed
            </option>
            <option name="Diaper" value="Diaper">
              Diaper
            </option>
            <option name="Sleep" value="Sleep">
              Sleep
            </option>
            <option name="Play" value="Play">
              Play
            </option>
            <option name="Doctor's" value="Doctor's">
              Doctor's
            </option>
          </select>

          <label>
            Date and Time:
            <input type="datetime-local" name="dateTime" required />
          </label>

          <label>
            Duration:
            <input type="number" name="duration" min="0:00" />
          </label>
        </div>

        {/* using conditional rendering instead of ternary operator as we have >2 options */}
        {activityToLogContext === "Diaper" && (
          <div
            name="Diaper"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label for="diaperType">Diaper Type: </label>
            <select
              id="diaperType"
              name="diaperType"
              onChange={(e) => {
                const diaperType = e.target.value;
              }}
            >
              <option value="Pee">Pee</option>
              <option value="Poop">Poop</option>
              <option value="Both">Both</option>
            </select>
          </div>
        )}

        {activityToLogContext === "Sleep" && (
          <div
            name="Sleep"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label for="sleepType">Sleep Type:</label>
            <select
              id="sleepType"
              name="sleepType"
              onChange={(e) => {
                const sleepType = e.target.value;
              }}
            >
              <option value="Nap">Nap</option>
              <option value="Sleep">Night</option>
            </select>
          </div>
        )}

        {activityToLogContext === "Feed" && (
          <div
            name="Feed"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label for="milkType">Milk Type:</label>
            <select
              id="milkType"
              name="milkType"
              onChange={(e) => {
                const milkType = e.target.value;
              }}
            >
              <option value="Pumped Milk">Pumped Milk</option>
              <option value="Formula">Formula</option>
              <option value="Mix">Mix</option>
            </select>

            <label>
              Milk volume:
              <input type="number" name="milkVol" />
            </label>
          </div>
        )}

        {activityToLogContext === "Play" && (
          <div
            name="Play"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label>
              Play type:
              <input type="text" name="playType" />
            </label>
          </div>
        )}

        {activityToLogContext === "Doctor's" && (
          <div
            name="Doctor's"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label for="visitDocType">Visit Doc Type:</label>
            <select
              id="visitDocType"
              name="visitDocType"
              onChange={(e) => {
                const visitDocType = e.target.value;
              }}
            >
              <option value="Check-up">Check-up</option>
              <option value="Illness">Illness</option>
            </select>

            <label>
              Name of Doc:
              <input type="text" name="docName" />
            </label>

            <label>
              Medicine:
              <input type="text" name="medicine" />
            </label>

            <label>
              Diagnosis:
              <input type="text" name="diagnosis" />
            </label>
          </div>
        )}

        <button
          style={{
            marginTop: 20,
            backgroundColor: "grey",
            color: "white",
            fontSize: "15px",
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default ActivityForm;
