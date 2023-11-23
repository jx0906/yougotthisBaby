import { useState, useContext } from "react";
import { BabyContext } from "../App";
import { useNavigate } from "react-router-dom";

function DevMilestoneCheck({devMilestone, updateDevMilestone}) {
  const { babyContext } = useContext(BabyContext);
  const babyName = babyContext.babyName;
  const babyAge = babyContext.babyAge;

  const handleSubmitResponse = async (evt) => {
    evt.preventDefault()

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
      return;
    }

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
          body: JSON.stringify(inputData),
        }
      );
      const newActivityRecord = await response.json();
      console.log(JSON.stringify(newActivityRecord));
    }
  };


  return (
    <>
      <div style={{ fontSize: "30px", margin: "0", padding: "0em" }}>
        <form
          className="milestoneDevUpdate"
          onSubmit={handleSubmitResponse}
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

          <p>devMilestone.....</p>


              <label htmlFor="Childhood Dev Screening">Yes</label>
              <input
                type="radio"
                name="Childhood Dev Screening"
                value="yes"
                onChange={(e) => {
                  setStatusInput(e.target.value);
                }}
              />

              <label htmlFor="Childhood Developmental Screening">Not now</label>
              <input
                type="radio"
                name="Childhood Dev Screening"
                value="not now"
                onChange={(e) => {
                  setStatusInput(e.target.value);
                }}
              />
            </div>
          }
          (statusInput === "yes" && ( console.log(checklistQues)
          {/*<DevMileStoneCheck checklistQues={checklistQues} />
         navigate("/home/devMilestoneChecklist"); */}
          ))
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
      else
      {
        <p>
          `${babyName} is {babyAge} old today!`
        </p>
      }
    </>
  );
}

export default MileStoneNotification;
