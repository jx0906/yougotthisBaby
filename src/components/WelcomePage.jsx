import { useState, useContext } from "react";
import { Button } from "@chakra-ui/button";
import ActivityOverview from "./ActivityOverview";
import { BabyContext } from "../Home";
import { useNavigate } from "react-router";

function WelcomePage() {
  const navigate = useNavigate();
  const [activitytoLog, setActivitytoLog] = useState("");
  const babyProfile = useContext(BabyContext);
  console.log(`babyContext = ${babyProfile}`); // i want to know what is BabyContext

  function activityOnClick(evt) {
    setActivitytoLog(evt.target.value);
    // navigate("/welcome/:activity");
  }

  return (
    <>
      {/* <button type="click" img="insert settings icon" onClick={() => <SettingsPage/>}> */}
      {/* <Notification /> */}
      <div className="activities">
        <h1>Welcome Page</h1>
        {/* <ActivityOverview /> */}
        <button id="feed" value="feed" type="click" onClick={activityOnClick}>
          Feed
        </button>
        <button
          id="diaper"
          value="diaper"
          type="click"
          onClick={activityOnClick}
        >
          Diaper
        </button>
        <button id="Sleep" value="sleep" type="click" onClick={activityOnClick}>
          Sleep
        </button>
        <button id="Play" value="play" type="click" onClick={activityOnClick}>
          Play
        </button>
        <button
          id="Doctor's"
          value="doctor's"
          type="click"
          onClick={activityOnClick}
        >
          Doc's
        </button>
      </div>
      {/* <main>
        <Routes>
          use a colon in path to take in a URL parameter, ie it will take whatever value and parse
          into "activity" - to be defined in ActivityForms
          <Route path="/welcome/:activity" element={<ActivityForms setActivitytoLog={setActivitytoLog}/>
        </Routes>
      </main> */}
    </>
  );
}

export default WelcomePage;
