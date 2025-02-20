import React, { useEffect, useState } from "react";
import IssueDetails from "./components/IssueDetails";
import { fetchIssueDetails } from "./services/api";

function App() {
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    fetchIssueDetails("ISSUE-1234").then(setIssue);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <IssueDetails issue={issue} />
    </div>
  );
}

export default App;
