import { useContext } from "react";
import { useNavigate } from "react-router";

import { BabyContext, ActivityToLogContext } from "../App";
import ActivityHistory from "./ActivityHistory";
import MilestoneNotification from "./MilestoneNotification";

function HomeOverview() {
  const navigate = useNavigate();
  const { babyContext } = useContext(BabyContext);
  const babyName = babyContext.babyName;
  const { activityToLogContext, setActivityToLogContext } =
    useContext(ActivityToLogContext);

  function activityOnClick(evt) {
    setActivityToLogContext(evt.target.value);

    // console.log("Context:" + ActivityToLogContext);
    // o/p - Context:[object Object] - specific to the way i have provided context in App.jsx, activityToLogContext (the first value) is the actual value stored in the context
    // so i should log this variable to get its value instead of the ActivityToLogContext itself.
    // console.log("Variable:" + activityToLogContext);
    // o/p - Variable:
    // console.log("Deconstructed:" + ActivityToLogContext.activityToLogContext);
    // o/p - Deconstructed: undefined
    // Why? console.log statements immediately after calling setActivityToLogContext won't reflect the updated state (ie, the o/p i got)  because state updates in React are asynchronous.
    // The updated value of activityToLogContext will be available in subsequent renders, not immediately after calling setActivityToLogContext. in this case, after calling
    // setActivityToLogContext and initiating a navigation, the component will unmount, and the updated value won't be logged immediately so I need to check the updated value
    // in the component where ActivityToLogContext is consumed, ie, the component rendered at the /welcome/logactivity route - ActivityForm

    navigate("/home/logactivity");
  }

  return (
    <>
      {/* <button type="click" img="insert settings icon" onClick={() => <SettingsPage/>}> */}
      <h3 style={{ margin: "0", padding: "0.2em" }}>Welcome back!</h3>
      <MilestoneNotification />
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