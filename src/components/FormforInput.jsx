import React, { useState, useContext, useEffect } from "react";
import { ActivityToLogContext } from "../App";

function FormforInput({ formData, setFormData }) {
  const { activityToLogContext, setActivityToLogContext } =
    useContext(ActivityToLogContext);

  useEffect(() => {
    // Fetch data from the API and set the initial form data
    // For demonstration purposes, I'm using dummy data
    const fetchData = async () => {
      try {
        // Replace the following line with your actual API fetch
        // const response = await fetch("your_api_endpoint");
        // const data = await response.json();

        // Dummy data for demonstration
        const data = {
          activity: "Feed",
          dateTime: "2023-11-07T12:00",
          duration: "2",
          diaperType: "Both",
          sleepType: "Night",
          milkType: "Formula",
          milkVol: "150",
          playType: "Outdoor",
          visitDocType: "Immunisation",
          docName: "Dr. Smith",
          diagnosis: "Common cold",
          medicine: "Paracetamol",
          notes: "No allergies",
        };

        setFormData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Run this effect only once when the component mounts

  return (
    <>
      <div
        className="Activity Overview"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* The for attribute in HTML is used to associate a <label> element with a form control, indicating which form element the label is labeling.
          However, in JSX, for is a reserved keyword, and it can't be used as an attribute name because it might conflict with the JavaScript for loop. 
          so we use htmlFor instead in JSX. */}
        <label htmlFor="activity">Activity: </label>
        <select
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
          <input
            type="string"
            name="duration"
            min="0:00"
            defaultValue="enter in hh:mm"
          />
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
              const visitDocType = e.target.value;
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
      {formData.visitDocType === "Childhood Dev Screening" && (
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
        Notes:
        <input
          type="text"
          name="notes"
          defaultValue="eg, pee/poop observations, allergy reaction, etc"
        />
      </label>
    </>
  );
}

export default FormforInput;
