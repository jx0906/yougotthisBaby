import React, { useState, useContext } from "react";
import { BabyContext, ActivityToLogContext } from "../App";

function ActivityForm() {
  const { activityToLogContext, setActivityToLogContext } =
    useContext(ActivityToLogContext);
  // const selectedActivity = ActivitytoLogContext;
  // const [selActivity, setselActivity] = useState(selectedActivity);

  // const userInput = {
  //   fields: {
  //     babyName: { babyName },
  //     dateTime: "2023-08-09T07:49:00.000Z",
  //     activity: "Feed",
  //     duration: 600,
  //     milkType: "Formula Milk",
  //     milkVol: 100,
  //   },
  // };

  function handleActivityChange(e) {
    setActivitytoLogContext(e.target.value);
  }

  return (
    <>
      <form className="activityForm">
        {/* onSubmit={() => <CreateRecord />} */}
        <div
          className="Activity Overview"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>
            Date and Time:
            <input type="datetime-local" name="dataTime" required />
          </label>
          <label for="activity">Activity:</label>
          <select
            id="activity"
            name="activity"
            value={activityToLogContext}
            onChange={handleActivityChange}
          >
            <option value="Feed">Feed</option>
            <option value="Diaper">Diaper</option>
            <option value="Sleep">Sleep</option>
            <option value="Play">Play</option>
            <option value="Doctor's">Doc's</option>
          </select>

          <label>
            Duration
            <input type="number" name="duration" />
          </label>
        </div>
        <div
          name="diaper"
          style={{
            display: activityToLogContext === "Diaper" ? "block" : "none",
          }}
        >
          <label for="diaperType">Diaper Type:</label>
          <select
            id="diaperType"
            name="diaperType"
            onSelect={(e) => {
              const diaperType = e.target.value;
            }}
          >
            <option value="Pee">Pee</option>
            <option value="Poop">Poop</option>
            <option value="Both">Both</option>
          </select>
        </div>
        <div
          name="Sleep"
          style={{
            display: activityToLogContext === "Sleep" ? "block" : "none",
          }}
        >
          <label for="sleepType">Sleep Type:</label>
          <select
            id="sleepType"
            name="sleepType"
            onSelect={(e) => {
              const sleepType = e.target.value;
            }}
          >
            <option value="Nap">Nap</option>
            <option value="Sleep">Night</option>
          </select>
        </div>
        <div
          name="Feed"
          style={{
            display: activityToLogContext === "Feed" ? "block" : "none",
          }}
        >
          <label for="milkType">Milk Type:</label>
          <select
            id="milkType"
            name="milkType"
            onSelect={(e) => {
              const milkType = e.target.value;
            }}
          >
            <option value="Pumped Milk">Pumped Milk</option>
            <option value="Formula">Formula</option>
            <option value="Mix">Mix</option>
          </select>
          <label>
            Milk volume:
            <input type="number" name="milkVol" required />
          </label>
        </div>
        <div
          name="Play"
          style={{
            display: activityToLogContext === "Play" ? "block" : "none",
          }}
        >
          <label>
            Play type:
            <input type="text" name="playType" required />
          </label>
        </div>
        <div
          name="Doctor's"
          style={{
            display: activityToLogContext === "Doctor's" ? "block" : "none",
          }}
        >
          <label for="visitDocType">Visit Doc Type:</label>
          <select
            id="visitDocType"
            name="visitDocType"
            onSelect={(e) => {
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
        <button
          style={{
            marginTop: 20,
            backgroundColor: "grey",
            color: "white",
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default ActivityForm;
