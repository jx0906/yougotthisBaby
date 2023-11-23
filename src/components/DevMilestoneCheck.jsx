import { useState, useContext } from "react";
import { BabyContext } from "../App";
import { useNavigate } from "react-router-dom";

function DevMilestoneCheck() {
  const navigate = useNavigate();
  const { babyContext } = useContext(BabyContext);
  const babyName = babyContext.babyName;
  const babyAge = babyContext.babyAge;
  const [checklistQues, setChecklistQues] = useState({});
  const [statusInput, setStatusInput] = useState("not yet");
  const [stocktake, setStocktake] = useState({});

  const fetchMilestoneChecklist = async () => {
    console.log(babyAge);
    try {
      const baseURL =
        "https://api.airtable.com/v0/appEcc6SwsoURvmeO/tblMIpP9oHDxzxUTz";
      const res = await fetch(`${baseURL}?filterByFormula={age}='${babyAge}'`, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer patIefr5XHGrnjTal.ce642a147091cffd80d78258215e6695909498a75c9c7d5c91fbce5f3b3fc91f",
        },
      });
      const fetchedMilestoneChecklistbyAge = await res.json();
      console.log("fetcheddata: " + fetchedMilestoneChecklistbyAge.records[0]);
      //output = fetcheddata: [object Object]

      // Check if the response is nil or undefined
      if (fetchedMilestoneChecklistbyAge.records[0] === undefined) {
        console.log("nothing in the checklist to be notified of");
        return;
      } else {
        const milestoneChecklistbyAge = {
          ...fetchedMilestoneChecklistbyAge.records[0].fields,
        };

        console.log(JSON.stringify(milestoneChecklistbyAge));
        setChecklistQues(milestoneChecklistbyAge);
      }
    } catch (error) {
      // setError(`unable to fetch data`);
      return;
    }
  };

  const handleSubmitMilestoneResponse = async (evt) => {
    evt.preventDefault();
    const selField = evt.target.name;
    const selValue = evt.target.value;

    const formData = new FormData(evt.target);
    const data = Object.fromEntries(formData);
    console.log(data);

    if (selField === "immunisation") {
      const inputData = {
        records: [
          {
            fields: {
              babyName: babyName,
              activity: "Doctor's",
              visitDocType: "Immunisation",
              medicine: checklistQues.recommendedVac,
              ...data,
            },
          },
        ],
      };

      addNewActivity();
      return;
    }

    if (!selField === "immunisation") {
      const inputData = {
        records: [
          {
            fields: {
              babyName: babyName,
              babyEventAge: babyAge,
              visitDocType: "Childhood Dev Screening",
              // ...data,
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

  fetchMilestoneChecklist();

  return (
    <>
      <div style={{ fontSize: "30px", margin: "0", padding: "0em" }}>
        <form
          className="milestoneDevUpdate"
          onSubmit={handleSubmitMilestoneResponse}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Center horizontally
            justifyContent: "center", // Center vertically
          }}
        >
          {/* conditional rendering to vary notification output based on checklist data */}

          if (!milestoneChecklistbyAge.checklistQues === null && !milestoneChecklistbyAge.recommendedVac
          === null)
          {
            <div>
              <p>
                {babyName} is {babyAge} old today! At {babyAge}, you may wish to schedule {babyName} for
                immunisation and/or do a stocktake of the Childhood Developmental Screening
                checklist. Find out more <Link to="/devmilestone">here</Link>!
              </p>


          if (!checklistQues === null && !milestoneChecklistbyAge.recommendedVac
          === null)
          {
            <>
              <label htmlFor="immunisation">
                {babyName} is {babyAge} old today! At {babyAge}, {babyName}{" "}
                should be scheduled for {milestoneChecklistbyAge.recommendedVac}{" "}
                immunisation. Have you scheduled one?
              </label>
              <select
                name="immunisation"
                onChange={(e) => {
                  setStatusInput(e.target.value);
                }}
              >
                <option value="yes">Yes</option>
                <option value="not yet">Not Yet</option>
              </select>
            </>
          }
          (statusInput === "yes" && (
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
          <label>
            Name of Doc:
            <input type="text" name="docName" />
          </label>
          )) 
          
          if (!checklistQues === null &&
          !milestoneChecklistbyAge.checklistQues === null)
          {
            <div>
              <p>
                {babyName} is {babyAge} old today! At {babyAge}, you may wish to
                do a stocktake of the Childhood Developmental Screening
                checklist. Would you like to do it now?
              </p>

              <label htmlFor="Childhood Developmental Screening">Yes</label>
              <input
                type="radio"
                name="Childhood Developmental Screening"
                value="yes"
                onChange={(e) => {
                  setStatusInput(e.target.value);
                }}
              />

              <label htmlFor="Childhood Developmental Screening">Not now</label>
              <input
                type="radio"
                name="Childhood Developmental Screening"
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
