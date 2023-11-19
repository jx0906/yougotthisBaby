import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./Home.jsx";
import WelcomePage from "./components/WelcomePage";

function App() {
  return (
    <Routes>
      {/* Use the Navigate component to navigate to the WelcomePage */}
      {/* <Route path="/welcome" element={<Navigate to="/welcome" replace />} 
'replace' prop will replace the current entry in the history stack
use the <Navigate /> component inside the <Route /> component to
programmatically navigate to the "/welcome" route when the
handleLoginSubmit function is executed. Additionally, the replace prop
is used to replace the current entry in the history stack, preventing
the user from going back to the login page using the browser's back
button. */}
      <Route path="/" element={<Home />} />
      {/* The nested <Route>s inherit and add to the parent route. So the welcome path is combined with
the parent and becomes /welcome. */}
      <Route path="welcome" element={<WelcomePage />} />
      {/* <Route path="signup" element={<SignUpForm />} />
      <Route path="welcome/:activity" element={<ActivityForms />} /> */}
    </Routes>
  );
}

export default App;
