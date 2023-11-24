import React, { useState, useContext } from "react";
import { BabyContext, ActivityToLogContext } from "../App";
import { useNavigate } from "react-router";

function ActivityForm() {
  const { activityToLogContext, setActivityToLogContext } =
    useContext(ActivityToLogContext);
  const [visitDocType, setVisitDocType] = useState("");
  const { babyContext, setBabyContext } = useContext(BabyContext);
  const babyName = babyContext.babyName;
  const apiKey = import.meta.env.VITE_MY_KEY;
  const navigate = useNavigate();

  const handleSubmitNewRecord = (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    const data = Object.fromEntries(formData);
    console.log(data);

    const activityData = {
      records: [
        {
          fields: {
            babyName: babyName,
            ...data,
            duration: parseInt(data.duration) || "0",
            milkVol: parseInt(data.milkVol) || "",
          },
        },
      ],
    };

    console.log(activityData);
    addNewActivity(activityData);
    navigate("/home");

    async function addNewActivity() {
      const response = await fetch(
        "https://api.airtable.com/v0/appEcc6SwsoURvmeO/tbli0KeI5LkN332ps",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
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
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <>
          <div
            className="Activity Overview"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="activity">Activity: </label>
            <select
              name="activity"
              value={activityToLogContext}
              onChange={(e) => {
                setActivityToLogContext(e.target.value);
              }}
            >
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
          </div>

          {activityToLogContext === "Diaper" && (
            <div
              name="Diaper"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label htmlFor="diaperType">Diaper Type: </label>
              <select
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
              <label htmlFor="sleepType">Sleep Type:</label>
              <select
                name="sleepType"
                onChange={(e) => {
                  const sleepType = e.target.value;
                }}
              >
                <option value="Nap">Nap</option>
                <option value="Night">Night</option>
              </select>

              <label>
                Duration (hh:mm):
                <input type="string" name="duration" />
              </label>
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
              <label htmlFor="milkType">Milk Type:</label>
              <select
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

              <label>
                Duration (hh:mm):
                <input type="string" name="duration" />
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
              <label htmlFor="visitDocType">Visit Doc Type:</label>
              <select
                name="visitDocType"
                onChange={(e) => {
                  setVisitDocType(e.target.value);
                }}
              >
                <option value="Illness">Illness</option>
                <option value="Immunisation">Immunisation</option>
                <option value="Childhood Dev Screening">
                  Childhood Dev Screening
                </option>
              </select>

              <label>
                Name of Doc:
                <input type="text" name="docName" />
              </label>

              <label>
                Diagnosis:
                <input type="text" name="diagnosis" />
              </label>

              <label>
                Medicine:
                <input type="text" name="medicine" />
              </label>
            </div>
          )}

          {visitDocType === "Childhood Dev Screening" && (
            <div
              name="Childhood Dev Screening"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label>
                Baby Event Age:
                <input type="text" name="babyEventAge" />
              </label>

              <label>Developmental Category:</label>
              <select
                name="devCategory"
                onChange={(e) => {
                  const devCategory = e.target.value;
                }}
              >
                <option value="Personal Social">Personal Social</option>
                <option value="Fine Motor-Adaptive">Fine Motor-Adaptive</option>
                <option value="Language">Language</option>
                <option value="Gross Motor">Gross Motor</option>
              </select>

              <label>
                Developmental Observations:
                <input type="text" name="devObservations" />
              </label>
            </div>
          )}

          <label>
            Notes (eg, pee/poop observations, allergy reaction, etc):
            <input type="text" name="notes" />
          </label>
        </>
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
