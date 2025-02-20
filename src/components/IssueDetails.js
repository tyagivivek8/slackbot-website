import React from "react";
import CollapsibleSection from "./CollapsibleSection";
import RelatedList from "./RelatedList";
import UserJourney from "./UserJourney"; // New component for User Journey
import { motion } from "framer-motion";

function IssueDetails({ issue }) {
  if (!issue) {
    return (
      <div className="text-center text-gray-500 mt-8">
        Loading issue details...
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">Issue ID: {issue.issueId}</h2>
          <p className="text-gray-600">Assigned to: {issue.devAssigned}</p>
        </div>
      </div>

      {/* Description & Summary */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Issue Description</h3>
        <p className="text-gray-700">{issue.description}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Issue Summary</h3>
        <p className="text-gray-700">{issue.summary}</p>
      </div>

      {/* Insights Section */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Insights</h3>
        <ul className="list-disc pl-5">
          {issue.insights.map((insight, idx) => (
            <li key={idx} className="text-gray-700 mb-1">
              {insight}
            </li>
          ))}
        </ul>
      </div>

      {/* Device Info */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Device Info</h3>
        <p className="text-gray-700">
          {issue.deviceModel} ({issue.deviceId})
        </p>
      </div>

      {/* User Journey */}
      <UserJourney steps={issue.userJourney} />

      {/* Related Sections */}
      <CollapsibleSection title="Related Slack Threads">
        <RelatedList items={issue.relatedSlackThreads} />
      </CollapsibleSection>

      <CollapsibleSection title="Related Issues">
        <RelatedList items={issue.relatedIssues} />
      </CollapsibleSection>

      <CollapsibleSection title="Related Apple Forums">
        <RelatedList items={issue.relatedAppleForums} />
      </CollapsibleSection>

      <CollapsibleSection title="Related StackOverflow Threads">
        <RelatedList items={issue.relatedStackOverflowThreads} />
      </CollapsibleSection>
    </motion.div>
  );
}

export default IssueDetails;
