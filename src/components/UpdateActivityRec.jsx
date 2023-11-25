import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

function UpdateActivityRec() {
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
  }, []);

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
    console.log(data);

    const updateData = {
      fields: {
        ...data,
      },
    };

    async function updateActivityRecord(updateData) {
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

    console.log(updateData);
    updateActivityRecord(updateData);
    navigate("/home");
  };

  const handleSubmitforDel = () => {
    deleteActivityRecord();
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
          maxHeight: "500px",
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            handleSubmitforEdit(evt);
          }}
          style={{
            maxHeight: "380px",
            maxWidth: "800px",
            paddingTop: "30px",
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
            type="submit"
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
        <IconButton
          aria-label="Delete Record"
          variant="outline"
          size="lg"
          boxSize={20}
          onClick={handleSubmitforDel}
          icon={<DeleteIcon />}
        />
      </div>
    </>
  );
}

export default UpdateActivityRec;
