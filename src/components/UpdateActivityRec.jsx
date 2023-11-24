import React, { useState, useContext, useEffect } from "react";
import { BabyContext } from "../App";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

function UpdateActivityRec() {
  const { babyContext } = useContext(BabyContext);
  const babyName = babyContext.babyName;
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_MY_KEY;
  const baseURL =
    "https://api.airtable.com/v0/appEcc6SwsoURvmeO/tbli0KeI5LkN332ps";

  const { id } = useParams();

  useEffect(() => {
    const fetchSelActivity = async () => {
      try {
        const res = await fetch(`${baseURL}/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        });

        const fetchedSelActivity = await res.json();
        console.log(fetchedSelActivity);

        if (fetchedSelActivity) {
          setFormData(fetchedSelActivity.fields);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchSelActivity();
    console.log(formData);
  }, [id]);

  const handleFormChange = (evt) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleSubmitforEdit = (evt) => {
    evt.preventDefault();
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
      <div
        style={{
          minHeight: "700px",
          minWidth: "1000px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <form
          onSubmit={handleSubmitforEdit}
          style={{
            minHeight: "300px",
            minWidth: "700px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
              marginBottom: 20,
              backgroundColor: "grey",
              color: "white",
              fontSize: "15px",
            }}
          >
            Edit
          </button>
        </form>
        <button
          type="click"
          onClick={handleRecordDel}
          style={{
            backgroundColor: "grey",
            padding-top: "20px",
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
