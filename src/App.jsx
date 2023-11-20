import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./Home.jsx";
import WelcomePage from "./components/WelcomePage";
import ActivityForm from "./components/ActivityForm";

const BabyContext = createContext();
const ActivityToLogContext = createContext();

function App() {
  const [activityToLogContext, setActivityToLogContext] = useState("");
  const [babyContext, setBabyContext] = useState({});
  //using useState to update the babyContext values so child components can call on it

  return (
    <BabyContext.Provider value={{ babyContext, setBabyContext }}>
      <ActivityToLogContext.Provider
        value={{ activityToLogContext, setActivityToLogContext }}
      >
        {/* to provide context variable with `value`, ie, data we wish the child
components to consume. */}
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
the parent and becomes /welcome. */}
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
