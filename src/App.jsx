import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./Home.jsx";
import WelcomePage from "./components/WelcomePage";
import ActivityForm from "./components/ActivityForm";

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
        <Routes>
          {/* Use the Navigate component to navigate to the WelcomePage
        <Route path="/welcome" element={<Navigate to="/welcome" replace />} 
        'replace' prop will replace the current entry in the history stack
        
        use the <Navigate /> component inside the <Route /> component to programmatically navigate to the
        "/welcome" route when the handleLoginSubmit function is executed. Additionally, the replace prop is
        used to replace the current entry in the history stack, preventing the user from going back to the
        login page using the browser's back button. */}
          <Route path="/" element={<Home />} />
          {/* The nested <Route>s inherit and add to the parent route. So the welcome path is combined with
the parent to become /welcome. */}
          <Route path="welcome" element={<WelcomePage />} />
          <Route path="welcome/logactivity" element={<ActivityForm />} />
          {/* <Route path="signup" element={<SignUpForm />} /> */}
        </Routes>
      </ActivityToLogContext.Provider>
    </BabyContext.Provider>
  );
}

export default App;
export { BabyContext, ActivityToLogContext };
