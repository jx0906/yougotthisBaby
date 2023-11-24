import { useState, useContext } from "react";
import { BabyContext } from "../App";
import { useNavigate } from "react-router-dom";

function DevMilestone({ devMilestone, updateDevMilestone }) {
  const apiKey = import.meta.env.VITE_MY_KEY;
  const { babyContext } = useContext(BabyContext);
  const babyName = babyContext.babyName;
  const babyAge = babyContext.babyAge;

  // const [devMilestone, setDevMilestone] = useState({
  //   checklistQues: null,
  //   recommendedVac: null,
  // });

  // const updateDevMilestone = (newDevChecklist) => {
  //   setDevMilestone(newDevChecklist);
  // };

  milestoneChecklistbyAge.forEach((entry) => {
    const newDevChecklist = {
      devCategory: entry.devCategory,
      checklistQues: entry.checklistQues || null,
      recommendedVac: entry.recommendedVac || null,
    };
  });
  // output for milestoneChecklistbyAge= {
  //     "entry": [
  //       {
  //         "ageRange": "6 - 12 months",
  //         "event": "Childhood Dev Screening",
  //         "age": "6 months",
  //         "checklistQues": "Your child will try to get a toy that he enjoys when it is out of reach by stretching his arms or body. (Works for a toy out of reach)",
  //         "devCategory": "Personal Social"
  //       },

  const handleMilestoneSubmitResponse = async (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    const data = Object.fromEntries(formData);
    console.log(data);

    const inputData = {
      records: [
        {
          fields: {
            babyName: babyName,
            babyEventAge: babyAge,
            visitDocType: "Childhood Dev Screening",
            ...data,
          },
        },
      ],
    };
    addNewActivity();
    navigate("/home");
    return;
  };

  async function addNewActivity() {
    const response = await fetch(
      "https://api.airtable.com/v0/appEcc6SwsoURvmeO/tbli0KeI5LkN332ps",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(inputData),
      }
    );
    const newActivityRecord = await response.json();
    console.log(JSON.stringify(newActivityRecord));
  }

  return (
    <>
      <div style={{ fontSize: "30px", margin: "0", padding: "0em" }}>
        <form
          className="milestoneDevUpdate"
          onSubmit={handleMilestoneSubmitResponse}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Center horizontally
            justifyContent: "center", // Center vertically
          }}
        >
          <label>
            Date:
            <input type="date" name="date" required />
          </label>

          <label>
            Notes:
            <input
              type="text"
              name="notes"
              defaultValue="eg, pee/poop observations, allergy reaction, etc"
            />
          </label>

          <table
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Header Row */}
            <tr key={"header"}>
              {Object.keys(allChecklistQues[0].entry).map((key) => (
                <th key={key}>{key}</th>
              ))}
              <th>observation</th>
            </tr>
            {/* Data Rows - use state.map((item) => ...) to iterate over each item in the state array. Inside the
      mapping function, Object.values(item) is used to get an array of values for each item. It then maps
      over these values to create a <td> (table data) element for each value. This forms the data rows of
      the table. */}
            {allChecklistQues.map((record) => (
              <tr key="">
                {Object.values(record).map((val, index) => (
                  <td key={index}>{val}</td>
                ))}
                <td>
                  <label htmlFor="Childhood Dev Screening">Yes</label>
                  <input
                    type="radio"
                    name="Childhood Dev Screening"
                    value="yes"
                    onChange={(e) => {
                      setStatusInput(e.target.value);
                    }}
                  />
                  <label htmlFor="Childhood Dev Screening">Not yet</label>
                  <input
                    type="radio"
                    name="Childhood Dev Screening"
                    value="not yet"
                    onChange={(e) => {
                      setStatusInput(e.target.value);
                    }}
                  />
                </td>
              </tr>
            ))}
          </table>
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
      </div>
    </>
  );
}

export default DevMilestone;
