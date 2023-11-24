import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import WelcomePage from "./WelcomePage.jsx";
import HomeOverview from "./components/HomeOverview.jsx";
import ActivityForm from "./components/ActivityForm";
import Navigation from "./components/Navigation";
import DevMilestone from "./components/DevMilestone.jsx";
import UpdateActivityRec from "./components/UpdateActivityRec.jsx";
import ActivityHistory from "./components/ActivityHistory.jsx";

// BabyContext expected to hold all the records (from my API or any user action) for the specified baby
const BabyContext = createContext();
const ActivityToLogContext = createContext({
  activityToLogContext: "default",
  setActivityToLogContext: () => {},
});

function App() {
  //using useState to update the babyContext values so child components can call on it
  const [activityToLogContext, setActivityToLogContext] = useState("");
  const [babyContext, setBabyContext] = useState({});

  //prop lifting with function to update the state values which I will pass to child components
  const [devMilestone, setDevMilestone] = useState({
    devCategory: null,
    checklistQues: null,
    recommendedVac: null,
  });
  const updateDevMilestone = (newDevChecklist) => {
    setDevMilestone(newDevChecklist);
  };

  return (
    <BabyContext.Provider value={{ babyContext, setBabyContext }}>
      <ActivityToLogContext.Provider
        value={{ activityToLogContext, setActivityToLogContext }}
      >
        <Navigation />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="home"
            element={
              <HomeOverview
                devMilestone={devMilestone}
                updateDevMilestone={updateDevMilestone}
              />
            }
          />
          <Route path="home/logactivity" element={<ActivityForm />} />
          <Route path=":id" element={<ActivityHistory />} />
          <Route path=":id/update" element={<UpdateActivityRec />} />
          <Route
            path="home/devmilestone"
            element={
              <DevMilestone
                devMilestone={devMilestone}
                updateDevMilestone={updateDevMilestone}
              />
            }
          />
        </Routes>
      </ActivityToLogContext.Provider>
    </BabyContext.Provider>
  );
}

export default App;
export { BabyContext, ActivityToLogContext };
