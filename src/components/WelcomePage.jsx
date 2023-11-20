import { useState, useContext } from "react";
import { Button } from "@chakra-ui/button";
import ActivityOverview from "./ActivityOverview";
import { BabyContext } from "../App";
import { useNavigate } from "react-router";

function WelcomePage() {
  const navigate = useNavigate();
  const { babyContext } = useContext(BabyContext);
  const babyName = babyContext.babyName;
  // console.log(babyName);

  function activityOnClick(evt) {
    setActivitytoLog(evt.target.value);
    navigate("/welcome/logactivity");
  }

  return (
    <>
      {/* <button type="click" img="insert settings icon" onClick={() => <SettingsPage/>}> */}
      <h1>Welcome!</h1>
      {/* <Notification /> */}
      <div
        className="Activity Log"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ backgroundColor: "black", color: "yellow" }}>
          Last 5 Activity Logs for {babyName}
        </h2>
        {<ActivityOverview />}
      </div>
      <h2 style={{ backgroundColor: "black", color: "yellow" }}>
        Log New Activity
      </h2>
      <div className="activities">
        <button
          style={{ borderColor: "black" }}
          id="Feed"
          value="Feed"
          type="click"
          onClick={activityOnClick}
        >
          Feed
        </button>
        <button
          style={{ borderColor: "black", marginLeft: "20px" }}
          id="Diaper"
          value="Diaper"
          type="click"
          onClick={activityOnClick}
        >
          Diaper
        </button>
        <button
          style={{ borderColor: "black", marginLeft: "20px" }}
          id="Sleep"
          value="Sleep"
          type="click"
          onClick={activityOnClick}
        >
          Sleep
        </button>
        <button
          style={{ borderColor: "black", marginLeft: "20px" }}
          id="Play"
          value="Play"
          type="click"
          onClick={activityOnClick}
        >
          Play
        </button>
        <button
          style={{ borderColor: "black", marginLeft: "20px" }}
          id="Doctor's"
          value="Doctor's"
          type="click"
          onClick={activityOnClick}
        >
          Doctor's
        </button>
      </div>
    </>
  );
}

export default WelcomePage;
