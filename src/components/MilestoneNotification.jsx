import { useState, useContext, useEffect } from "react";
import { BabyContext } from "../App";
import { Link, useNavigate } from "react-router-dom";

function MileStoneNotification() {
  const navigate = useNavigate();
  const { babyContext } = useContext(BabyContext);
  const babyName = babyContext.babyName;
  const babyAge = babyContext.babyAge;
  const [checklist, setChecklist] = useState({});
  const [statusInput, setStatusInput] = useState("not yet");
  const [stocktake, setStocktake] = useState({});

  const fetchMilestoneChecklist = async () => {
    // console.log(babyAge);
    //output = 6 months
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
      console.log(JSON.stringify(fetchedMilestoneChecklistbyAge));
      // output = {
      //   "records": [
      //     {
      //       "id": "rec2bGrEyySFQqtxo",
      //       "createdTime": "2023-11-22T18:21:18.000Z",
      //       "fields": {
      //         "ageRange": "6 - 12 months",
      //         "event": "Childhood Dev Screening",
      //         "age": "6 months",
      //         "checklistQues": "Your child will try to get a toy that he enjoys when it is out of reach by stretching his arms or body. (Works for a toy out of reach)",
      //         "devCategory": "Personal Social"
      //       }
      //     },
      //   ]}

      // Check if the response is undefined
      if (fetchedMilestoneChecklistbyAge.records[0] === undefined) {
        console.log("nothing in the checklist to be notified of");
        return;
      } else {
        const milestoneChecklistbyAge = {
          ...fetchedMilestoneChecklistbyAge.records[0].fields,
        };

        console.log(JSON.stringify(milestoneChecklistbyAge));
        // output = {
        //   "ageRange": "6 - 12 months",
        //   "event": "Childhood Dev Screening",
        //   "age": "6 months",
        //   "checklistQues": "Your child will try to get a toy that he enjoys when it is out of reach by stretching his arms or body. (Works for a toy out of reach)",
        //   "devCategory": "Personal Social"
        // }

        setChecklist(milestoneChecklistbyAge);
      }
    } catch (error) {
      // setError(`unable to fetch data`);
      return;
    }
  };

  useEffect(() => {
    fetchMilestoneChecklist();
  }, []);

  return (
    <>
      <div style={{ fontSize: "30px", margin: "0", padding: "0em" }}>
        {babyName} is {babyAge} old today!
      </div>
      {/* conditional rendering to vary notification output based on checklist data */}
      {(checklist.checklistQues !== null &&
        checklist.recommendedVac !== null) ||
        (checklist == undefined && (
          <div>
            At {babyAge} old, you may wish to schedule {babyName} for
            immunisation and/or do a stocktake of the Childhood Developmental
            Screening checklist. Find out more
            <Link to="/devmilestone"> here</Link>!
          </div>
        ))}
      {checklist.checklistQues === null &&
        checklist.recommendedVac !== null && (
          <div>
            At {babyAge} old, {babyName} should be scheduled for
            {checklist.recommendedVac} immunisation. Do remember to schedule a
            visit soon if you haven't done so!
          </div>
        )}
      {checklist.checklistQues !== null &&
        checklist.recommendedVac === null && (
          <div>
            At {babyAge} old, you may wish to do a stocktake of the Childhood
            Developmental Screening checklist. Click
            <Link to="/devmilestone"> here</Link> to do it now!
          </div>
        )}
    </>
  );
}

export default MileStoneNotification;
