import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IssueDetails from "./IssueDetails";
import { fetchIssueDetails } from "../services/api";

function IssuePage() {
  const { issueId } = useParams(); // Read issueId from URL
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    fetchIssueDetails(issueId).then(setIssue);
  }, [issueId]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <IssueDetails issue={issue} />
    </div>
  );
}

export default IssuePage;
