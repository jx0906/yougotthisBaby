import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BabyContext } from "../App";

function EditActivity() {
  const apiKey = import.meta.env.VITE_MY_KEY;
  const { babyContext } = useContext(BabyContext);
  const babyName = babyContext.babyName;
  const [formData, setFormData] = useState({
    activity: "",
    date: "",
    dateTime: "",
    activity: "",
    duration: "",
    diaperType: "",
    sleepType: "",
    playType: "",
    milkType: "",
    milkVol: "",
    visitDocType: "",
    docName: "",
    diagnosis: "",
    medicine: "",
    notes: "",
    babyEventAge: "",
    devCategory: "",
    devObservations: "",
  });

  // useParams III: now finally, use useParams hook to access the ID of the selected record from the URL!
  const { id } = useParams();

  const baseURL =
    "https://api.airtable.com/v0/appEcc6SwsoURvmeO/tbli0KeI5LkN332ps";

  useEffect(() => {
    // Fetch data from the API
    const fetchSelActivity = async () => {
      const res = await fetch(`${baseURL}?id='${id}'`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });

      //return a form based on everything inside
      const fetchedSelActivity = await res.json();
    };
    try {
      const allSelActivityData = fetchedSelActivity.records;

      // Convert the dateTime string to a Date object
      const date = new Date(allSelActivityData.fields.dateTime);
      // Format the date as a readable string according to the system locale
      allSelActivityData.fields.dateTime = date.toLocaleString();

      setFormData(allSelActivityData);
      console.log(FormData);

      // Update form data with fetched values
      // setEditForm((prevEditForm) => {
      //   const updatedEditForm = { ...prevEditForm };

      // for (const key in fetchedSelActivity.records[0].fields) {
      //   if (fetchedSelActivity.records[0].fields.hasOwnProperty(key)) {
      //     updatedEditForm[key] = fetchedSelActivity.records[0].fields[key];
      //   }
      // }

      // static updating:
      // setEditForm({
      //     fieldName1: apiData.fieldName1,
      //     fieldName2: apiData.fieldName2,
      //     // ... update other fields
      //   });
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    fetchSelActivity();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  const handleChange = (e) => {
    // Update form data when user changes input
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitforEdit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmitforEdit}>
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
          Notes:
          <input
            type="text"
            name="notes"
            defaultValue="eg, pee/poop observations, allergy reaction, etc"
          />
        </label>
      </>

      {/* {Object.keys(editForm).map((fieldKey) => (
          <label key={fieldKey}>
            {fieldKey}:
            <input
              type="text"
              name={fieldKey}
              value={editForm[fieldKey]}
              onChange={handleChange}
            />
          </label>
        ))} */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default EditActivity;
