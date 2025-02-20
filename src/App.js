import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IssuePage from "./components/IssuePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/issue/:issueId" element={<IssuePage />} />
        <Route
          path="/"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <h1>Welcome to the Issue Tracker App</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
