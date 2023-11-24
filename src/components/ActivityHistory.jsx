import { useState, useContext, useEffect } from "react";
import { BabyContext } from "../App";
import { useNavigate } from "react-router-dom";

function ActivityHistory() {
  const navigate = useNavigate();
  const { babyContext } = useContext(BabyContext);
  const babyName = babyContext.babyName;
  //setting aData as array because API will return the data in an array of obj[{}] - see line 32
  const [aData, setAData] = useState([]);
  const apiKey = import.meta.env.VITE_MY_KEY;
  const baseURL =
    "https://api.airtable.com/v0/appEcc6SwsoURvmeO/tbli0KeI5LkN332ps";

  const fetchActivityLog = async () => {
    const res = await fetch(
      `${baseURL}?filterByFormula={babyName}='${babyName}'&maxRecords=5&sort%5B0%5D%5Bfield%5D=dateTime&sort%5B0%5D%5Bdirection%5D=desc`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    // if (!res.ok) {
    //   console.log(
    //     "No activity records have been logged. Choose something below to start."
    //   );
    //   return;
    // } else {
    const fetchedActivityLog = await res.json();
    console.log("fetchedActivityLog = " + JSON.stringify(fetchedActivityLog)); // o/p: {"records": [
    //   {
    //     "id": "recw8F6jPp2e28SZx",
    //     "createdTime": "2023-11-18T14:59:07.000Z",
    //     "fields": {
    //       "babyName": "baby2",
    //       "dateTime": "2023-11-05T14:59:00.000Z",
    //       "milkType": "Pumped Milk",
    //       "milkVol": 150,
    //       "activity": "Feed"
    //     }
    //   },
    //   {
    //     "id": "recaDWb3PB1L72vBv",
    //     "createdTime": "2023-11-18T18:14:14.000Z",
    //     "fields": {
    //       "babyName": "baby2",
    //       "dateTime": "2023-09-11T18:14:00.000Z",
    //       "visitDocType": "Check-up",
    //       "docName": "Carol Chan",
    //       "activity": "Doctor's"
    //     }
    //   },
    //   {
    //     "id": "recWaxGPLztvplLQ6",
    //     "createdTime": "2023-11-20T01:51:26.000Z",
    //     "fields": {
    //       "babyName": "baby2",
    //       "dateTime": "2023-08-02T01:51:00.000Z",
    //       "duration": 600,
    //       "playType": "read a book",
    //       "activity": "Play"
    //     }
    //   }
    // ]

    const allActivityData = fetchedActivityLog.records;
    console.log("allActivityData = " + JSON.stringify(allActivityData)); //output (sample)
    // {
    //   "id": "recw8F6jPp2e28SZx",
    //   "createdTime": "2023-11-18T14:59:07.000Z",
    //   "fields": {
    //     "babyName": "baby2",
    //     "dateTime": "2023-11-05T14:59:00.000Z",
    //     "milkType": "Pumped Milk",
    //     "milkVol": 150,
    //     "activity": "Feed"
    //   }
    // }

    // to select specific key-value from api fetch results
    // The optional chaining (?.) ensures that if entry.fields is undefined, the properties will also be undefined rather than causing an error.
    //  || '' allows you to provide a default value if 'dateTime' is undefined
    const activityData = allActivityData.map((entry) => ({
      id: entry.id,
      fields: {
        // babyName: entry.fields.babyName,
        dateTime: entry.fields.dateTime,
        // duration: entry.fields.duration,
        // duration: entry.fields?.duration || "",
        activity: entry.fields.activity,
      },
    }));

    // Convert the dateTime string to a Date object
    activityData.forEach((entry) => {
      const date = new Date(entry.fields.dateTime);

      // Format the date as a readable string according to the system locale
      entry.fields.dateTime = date.toLocaleString();

      // Format the date as a readable string in GMT+8
      // entry.fields.dateTime = date.toLocaleString("en-US", {
      //   timeZone: "Asia/Singapore", // Adjust for the specific time zone you need
      //   year: "numeric",
      //   month: "numeric",
      //   day: "numeric",
      //   hour: "numeric",
      //   minute: "numeric",
      //   second: "numeric",
    });

    console.log("activityData = " + activityData); //   output (dateTime before normalisation): (3) [{…}, {…}, {…}] = [
    //     {
    //         "id": "recw8F6jPp2e28SZx",
    //         "fields": {
    //             "dateTime": "2023-11-05T14:59:00.000Z",
    //             duration: undefined,
    //             "activity": "Feed"
    //         }
    //     },
    //     {
    //         "id": "recaDWb3PB1L72vBv",
    //         "fields": {
    //             "dateTime": "2023-09-11T18:14:00.000Z",
    //             duration: undefined
    //             "activity": "Doctor's"
    //         }
    //     },
    //     {
    //         "id": "recWaxGPLztvplLQ6",
    //         "fields": {
    //             "dateTime": "2023-08-02T01:51:00.000Z",
    //             "duration": 600,
    //             "activity": "Play"
    //         }
    //     }
    // ]

    console.log("activityData = " + JSON.stringify(activityData));
    setAData(activityData);
  };

  function handleEdit(evt) {
    const id = evt.target.id;
    // use Params II: earlier we had used "id" as a param (ie, prop in URL) in the route path for child component (ie,
    //   activityhistory). so now we use the useNavigate hook to navigate to the grandchild component
    //   with the id so we can call on useParams to retrieve the info.
    navigate(`/${id}/update`);
    // <UpdateActivityRec selActivityId={selActivityId} />;
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchActivityLog();
      // console.log(JSON.stringify(aData));
    };

    fetchData();
  }, []);

  return (
    <>
      {/* want to ensure that the return statement runs only after aData is defined so adding the conditional check before rendering */}
      {aData.length > 0 ? (
        <table
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* from: https://codepen.io/Alexander9111/pen/zYvEbML
  "state" variable below rep an array of objects, where each object represents a row of data in a table. with
  code below, we want to generate an HTML table with headers based on the keys of the first object and rows
  based on the values of each object in the array. The key property is used to uniquely identify each table
  row. (assumption here is that the objects in the state array have consistent structures, and that the first obj
  in the array (state[0]) represents the structure for generating headers. If the array is empty or contains
  objects with different structures, additional checks may be needed.
  use Object.keys(state[0]) to get an array of keys from the first element (assuming the array is not empty).
  then map over these keys to create a <th> (table header) element for each key. This forms the header row of
  the table. 
  */}
          {/* Header Row */}
          <tr key={"header"}>
            {Object.keys(aData[0].fields).map((key) => (
              <th key={key}>{key}</th>
            ))}
            <th></th>
          </tr>
          {/* Data Rows - use state.map((item) => ...) to iterate over each item in the state array. Inside the
        mapping function, Object.values(item) is used to get an array of values for each item. It then maps
        over these values to create a <td> (table data) element for each value. This forms the data rows of
        the table. */}
          {aData.map((record) => (
            <tr key={record.id}>
              {Object.values(record.fields).map((val, index) => (
                <td key={index}>{val}</td>
              ))}
              <td>
                <button id={record.id} type="click" onClick={handleEdit}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </table>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  );
}

export default ActivityHistory;
