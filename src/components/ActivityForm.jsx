import React, { useState, useContext } from "react";
import { BabyContext, ActivityToLogContext } from "../App";

function ActivityForm() {
  const { ActivityToLogContext, setActivityToLogContext } =
    useContext(ActivityToLogContext);
  const selectedActivity = { activitytoLog };
  const [selActivity, setselActivity] = useState(selectedActivity);

  const userInput = {
    fields: {
      babyName: { babyName },
      dateTime: "2023-08-09T07:49:00.000Z",
      activity: "Feed",
      duration: 600,
      milkType: "Formula Milk",
      milkVol: 100,
    },
  };

  function handleActivityChange(e) {
    setActivitytoLog(e.target.value);
    const newSelectedActivity = { activitytoLog };
    setselActivity(newSelectedActivity);
  }

  return (
    <>
      <form name="activityForm">
        {/* onSubmit={() => <CreateRecord />} */}
        <div name="Activity Overview">
          <label>
            Date and Time:
            <input
              type="datetime-local"
              name="dataTime"
              value={dateTime}
              required
            />
          </label>
          <label for="activity">Activity:</label>
          <select
            id="activity"
            name="activity"
            value={selActivity}
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
            <input type="number" name="duration" value={duration} required />
          </label>
        </div>

        <div
          name="diaper"
          style={({ selActivity } = "Diaper" ? (display = "block") : "none")}
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
          style={({ selActivity } = "Sleep" ? (display = "block") : "none")}
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
          style={({ selActivity } = "Feed" ? (display = "block") : "none")}
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
            <input type="number" name="milkVol" value={milkVol} required />
          </label>
        </div>

        <div
          name="Play"
          style={({ selActivity } = "Play" ? (display = "block") : "none")}
        >
          <label>
            Play type:
            <input type="text" name="playType" value={playType} required />
          </label>
        </div>

        <div
          name="Doctor's"
          style={({ selActivity } = "Doctor's" ? (display = "block") : "none")}
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
            <input type="text" name="docName" value={docName} />
          </label>
          <label>
            Medicine:
            <input type="text" name="medicine" value={medicine} />
          </label>
          <label>
            Diagnosis:
            <input type="text" name="diagnosis" value={diagnosis} />
          </label>
        </div>
      </form>
    </>
  );
}

export default ActivityForm;
