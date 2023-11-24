import { useState, useContext, useEffect } from "react";
import { BabyContext } from "../App";
import { Link } from "react-router-dom";

function MileStoneNotification({ devMilestone, updateDevMilestone }) {
  const { babyContext } = useContext(BabyContext);
  const babyName = babyContext.babyName;
  const babyAge = babyContext.babyAge;
  const [checklist, setChecklist] = useState({});
  const apiKey = import.meta.env.VITE_MY_KEY;
  const baseURL =
    "https://api.airtable.com/v0/appEcc6SwsoURvmeO/tblMIpP9oHDxzxUTz";

  const fetchMilestoneChecklist = async () => {
    try {
      const res = await fetch(`${baseURL}?filterByFormula={age}='${babyAge}'`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const fetchedMilestoneChecklistbyAge = await res.json();

      if (fetchedMilestoneChecklistbyAge.records[0] === undefined) {
        console.log("nothing in the checklist to be notified of");
        setChecklist("null");
        return;
      } else {
        const milestoneChecklistbyAge = {
          entry: fetchedMilestoneChecklistbyAge.records.map(
            (record) => record.fields
          ),
        };

        setChecklist(milestoneChecklistbyAge);
      }
    } catch (error) {
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

      {checklist.checklistQues !== null &&
        checklist.recommendedVac !== null && (
          <div>
            At {babyAge} old, you may wish to schedule {babyName} for
            immunisation and/or do a stocktake of the Childhood Developmental
            Screening (CDS) checklist. Do remember to schedule the immunisation
            soon if you haven't done so and click
            <Link to="/home/devmilestone"> here</Link> to review the CDS
            checklist now!
          </div>
        )}
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
            Developmental Screening (CDS) checklist. Click
            <Link to="/home/devmilestone"> here</Link> to do it now!
          </div>
        )}
    </>
  );
}

export default MileStoneNotification;
