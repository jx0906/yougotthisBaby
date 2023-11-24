import { useContext } from "react";
import { useNavigate } from "react-router";

import { BabyContext, ActivityToLogContext } from "../App";
import ActivityHistory from "./ActivityHistory";
import MilestoneNotification from "./MilestoneNotification";

function HomeOverview({ devMilestone, updateDevMilestone }) {
  const navigate = useNavigate();
  const { babyContext } = useContext(BabyContext);
  const babyName = babyContext.babyName;
  const { activityToLogContext, setActivityToLogContext } =
    useContext(ActivityToLogContext);

  function activityOnClick(evt) {
    setActivityToLogContext(evt.target.value);
    navigate("/home/logactivity");
  }

  return (
    <>
      <h3 style={{ margin: "0", padding: "0.2em" }}>Welcome back!</h3>
      <MilestoneNotification
        devMilestone={devMilestone}
        updateDevMilestone={updateDevMilestone}
      />
      <div
        className="Activity Log"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ backgroundColor: "black", color: "yellow" }}>
          Last 5 Activity Logs
        </h2>
        {<ActivityHistory />}
      </div>
      <h2 style={{ backgroundColor: "black", color: "yellow" }}>
        Log New Activity
      </h2>
      <div className="activities">
        <button
          style={{ borderColor: "black" }}
          name="Feed"
          value="Feed"
          type="click"
          onClick={activityOnClick}
        >
          Feed
        </button>
        <button
          style={{ borderColor: "black", marginLeft: "20px" }}
          name="Diaper"
          value="Diaper"
          type="click"
          onClick={activityOnClick}
        >
          Diaper
        </button>
        <button
          style={{ borderColor: "black", marginLeft: "20px" }}
          name="Sleep"
          value="Sleep"
          type="click"
          onClick={activityOnClick}
        >
          Sleep
        </button>
        <button
          style={{ borderColor: "black", marginLeft: "20px" }}
          name="Play"
          value="Play"
          type="click"
          onClick={activityOnClick}
        >
          Play
        </button>
        <button
          style={{ borderColor: "black", marginLeft: "20px" }}
          name="Doctor's"
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

export default HomeOverview;
