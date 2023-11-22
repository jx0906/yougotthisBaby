import { useContext } from "react";
import { BabyContext } from "../App";

function MileStoneNotification() {
  const { babyContext } = useContext(BabyContext);
  const babyName = babyContext.babyName;
  const babyAge = babyContext.babyAge;

  const fetchHealthBooklet = async () => {
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
      const fetchedHealthBookletbyAge = await res.json();
      console.log("1: " + fetchedBabyData.records[0]);
      // console.log("2: " + fetchedBabyData.records[0].id);
      // console.log("3: " + fetchedBabyData.records[0].fields);

      // Check if the response is nil or undefined
      if (fetchedHealthBookletbyAge === undefined) {
        return;
      } else {
        const HealthBookletQues = {
          babySysID: fetchedBabyData.records[0].id,
          ...fetchedHealthBookletbyAge.records[0].fields,
        };
        // used spread syntax above to include all properties of fetchedBabyData.records[0].fields directly in
        // babyData without wrapping them inside another property (eg, babyDetails)
        // o/p = {"babySysID":"recVZw45VqAgSq9ji","babyHeight":59,"babyName":"babyTest1","babyWeight":2.96,"babyDOB":"2023-08-07"}
        // vs const babyData = {
        // babySysID: fetchedBabyData.records[0].id,
        // babyDetails: fetchedBabyData.records[0].fields,
        // }; which yielded {
        // "babySysID": "recbd7BvrVcIeP1mL",
        // "babyDetails": {
        //   "babyHeight": 55,
        //   "babyName": "baby2",
        //   "babyWeight": 3.04,
        //   "babyDOB": "2023-01-01"}

        console.log(JSON.stringify(babyData));
        // output: {"babySysID":"recbd7BvrVcIeP1mL","babyDetails":{"babyHeight":55,"babyName":"baby2","babyWeight":3.04,"babyDOB":"2023-01-01"}}
        // const babyDataS = JSON.stringify(babyData);
        // setBabyDetails(babyDataS);

        setBabyContext(babyData);
      }
      navigate("/home", { replace: true });
    } catch (error) {
      setError(
        `Baby name: "${babyName}" not found. Please review your entry (case-sensitive).`
      );
      return;
    }
  };

  return (
    <div>
      <p style={{ fontSize: "30px", margin: "0", padding: "0em" }}>
        {babyName} is {babyAge} old today!
      </p>
    </div>
  );
}

export default MileStoneNotification;
