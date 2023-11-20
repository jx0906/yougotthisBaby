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
      {/* <Notification /> */}
      <h1>Welcome Page</h1>
      <div className="Activity Log">
        <h2>Last 5 Activity Logs for {babyName}</h2>
        {<ActivityOverview />}
      </div>
      <h2>Log New Activity</h2>
      <div className="activities">
        <button id="Feed" value="Feed" type="click" onClick={activityOnClick}>
          Feed
        </button>
        <button
          id="Diaper"
          value="Diaper"
          type="click"
          onClick={activityOnClick}
        >
          Diaper
        </button>
        <button id="Sleep" value="Sleep" type="click" onClick={activityOnClick}>
          Sleep
        </button>
        <button id="Play" value="Play" type="click" onClick={activityOnClick}>
          Play
        </button>
        <button
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
