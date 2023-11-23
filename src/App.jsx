import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import WelcomePage from "./WelcomePage.jsx";
import HomeOverview from "./components/HomeOverview.jsx";
import ActivityForm from "./components/ActivityForm";
import NavigationSignpost from "./components/Navigation";
import DevMilestone from "./components/DevMilestone";

// BabyContext expected to hold all the records (from my API or any user action) for the specified baby
const BabyContext = createContext();
const ActivityToLogContext = createContext({
  activityToLogContext: "default",
  setActivityToLogContext: () => {},
});

function App() {
  const [activityToLogContext, setActivityToLogContext] = useState("");
  const [babyContext, setBabyContext] = useState({});
  //using useState to update the babyContext values so child components can call on it

  return (
    <BabyContext.Provider value={{ babyContext, setBabyContext }}>
      {/* for context hooks, specific to the way i have defined it in 19 and 21, activityToLogContext (the first value) is the actual value stored in the context, while
      setActivityToLog is the function that allows me to update the value in the context. This means i need to use activityToLogContext when logging or accessing the
      context value, instead of the ActivityToLogContext itself. 
      Tip - these names don't have to match the names used in the context provider; they just need to match the structure of the object you're providing. */}
      <ActivityToLogContext.Provider
        value={{ activityToLogContext, setActivityToLogContext }}
      >
        <NavigationSignpost />
        <Routes>
          {/* Use the Navigate component to navigate to the WelcomePage
        <Route path="/welcome" element={<Navigate to="/welcome" replace />} 
        'replace' prop will replace the current entry in the history stack
        
        use the <Navigate /> component inside the <Route /> component to programmatically navigate to the
        "/welcome" route when the handleLoginSubmit function is executed. Additionally, the replace prop is
        used to replace the current entry in the history stack, preventing the user from going back to the
        login page using the browser's back button. */}
          <Route path="/" element={<WelcomePage />} />
          {/* The nested <Route>s inherit and add to the parent route. So the welcome path is combined with
the parent to become /welcome. */}
          <Route path="home" element={<HomeOverview />} />
          <Route path="home/logactivity" element={<ActivityForm />} />
          <Route path="home/devmilestone" element={<DevMilestone />} />
          {/* <Route path="signup" element={<SignUpForm />} /> */}
        </Routes>
      </ActivityToLogContext.Provider>
    </BabyContext.Provider>
  );
}

export default App;
export { BabyContext, ActivityToLogContext };
