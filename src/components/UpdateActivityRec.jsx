import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BabyContext } from "../App";
import { useNavigate } from "react-router";

function UpdateActivityRec() {
  const { babyContext } = useContext(BabyContext);
  const babyName = babyContext.babyName;
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_MY_KEY;
  const baseURL =
    "https://api.airtable.com/v0/appEcc6SwsoURvmeO/tbli0KeI5LkN332ps";

  // useParams III: now finally, use useParams hook to access the ID of the selected record from the URL!
  const { id } = useParams();

  useEffect(() => {
    // Fetch data from the API
    const fetchSelActivity = async () => {
      try {
        const res = await fetch(`${baseURL}/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        });

        //return a form based on everything inside
        const fetchedSelActivity = await res.json();
        console.log(fetchedSelActivity);

        //output: {
        //   "id": "recw8F6jPp2e28SZx",
        //   "createdTime": "2023-11-18T14:59:07.000Z",
        //   "fields": {
        //     "date": "2023-11-05",
        //     "duration": "0",
        //     "milkVol": 150,
        //     "dateTime": "2023-11-05T14:59:00.000Z",
        //     "activity": "Feed",
        //     "milkType": "Pumped Milk",
        //     "babyName": "testBaby"
        //   }
        // }
        // const allSelActivityData = fetchedSelActivity.fields;
        // console.log(allSelActivityData);

        if (fetchedSelActivity) {
          setFormData(fetchedSelActivity.fields);
        }
        // Update form data with fetched values
        // setFormData((prevEditForm) => {
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
    };
    fetchSelActivity();
    console.log(formData);
  }, [id]); // Empty dependency array ensures useEffect runs only once on mount

  const handleFormChange = (evt) => {
    // because formData is a state variable so update like this:
    setFormData((prevFormData) => ({
      ...prevFormData,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleSubmitforEdit = (evt) => {
    evt.preventDefault();
    // not referencing formData because it would have been updated by handleFormChange
    const updatedFormData = new FormData(evt.target);
    const data = Object.fromEntries(updatedFormData);

    const updateData = {
      fields: {
        ...data,
      },
    };

    console.log(updateData);
    updateActivityRecord(updateData);
    navigate("/home");
  };

  async function updateActivityRecord() {
    const response = await fetch(`${baseURL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(updateData),
    });
    const updatedActivityRecord = await response.json();
    console.log(JSON.stringify(updatedActivityRecord));
  }

  const handleRecordDel = (evt) => {
    evt.preventDefault();
    // not referencing formData because it would have been updated by handleFormChange
    deleteActivityRecord(updateData);
    navigate("/home");

    async function deleteActivityRecord() {
      const response = await fetch(`${baseURL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const updatedRecords = await response.json();
      console.log(JSON.stringify(updatedRecords));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitforEdit}>
        {Object.keys(formData).map((fieldKey) => (
          <label key={fieldKey}>
            {fieldKey}:
            <input
              type="text"
              name={fieldKey}
              value={formData[fieldKey]}
              onChange={handleFormChange}
            />
          </label>
        ))}

        <button
          style={{
            marginTop: 20,
            backgroundColor: "grey",
            color: "white",
            fontSize: "15px",
          }}
        >
          Edit
        </button>
      </form>

      <div>
        <button
          onClick={handleRecordDel}
          style={{
            marginTop: 20,
            backgroundColor: "grey",
            color: "white",
            fontSize: "15px",
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
}

export default UpdateActivityRec;
