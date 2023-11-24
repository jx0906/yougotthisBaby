import { useState, useContext, useEffect } from "react";
import { BabyContext } from "../App";
import { useNavigate } from "react-router-dom";

function ActivityHistory() {
  const navigate = useNavigate();
  const { babyContext } = useContext(BabyContext);
  const babyName = babyContext.babyName;
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

    const fetchedActivityLog = await res.json();
    const allActivityData = fetchedActivityLog.records;

    const activityData = allActivityData.map((entry) => ({
      id: entry.id,
      fields: {
        dateTime: entry.fields.dateTime,
        activity: entry.fields.activity,
      },
    }));

    activityData.forEach((entry) => {
      const date = new Date(entry.fields.dateTime);
      entry.fields.dateTime = date.toLocaleString();
    });

    setAData(activityData);
  };

  function handleEdit(evt) {
    const id = evt.target.id;
    navigate(`/${id}/update`);
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchActivityLog();
    };

    fetchData();
  }, []);

  return (
    <>
      {/* want to ensure that the return statement runs only after aData is defined so adding the conditional
      check before rendering */}
      {aData.length > 0 ? (
        <table
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <tr key={"header"}>
            {Object.keys(aData[0].fields).map((key) => (
              <th key={key}>{key}</th>
            ))}
            <th></th>
          </tr>
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
