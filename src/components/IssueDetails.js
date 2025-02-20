import React, { useState } from "react";
import CollapsibleSection from "./CollapsibleSection";
import RelatedList from "./RelatedList";
import UserJourney from "./UserJourney";
import { motion } from "framer-motion";
import geminiIcon from "../gemini.png"; // Adjust path as needed
import { FaBug, FaTools, FaMobileAlt, FaListAlt, FaSlackHash, FaUser, FaFlag, FaRoute, FaExpand, FaRegClone } from "react-icons/fa";

function IssueDetails({ issue }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (!issue) {
    return (
      <div className="text-center text-gray-500 mt-8 text-lg animate-pulse">
        🕵️‍♂️ Loading issue details...
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Issue Details */}
      <SectionCard title="Issue Details 🃏" icon={<FaRegClone className="text-red-500" />}> 
        <DetailItem label="ID" value={issue.issueId} />
        <DetailItem label="Assigned to" value={issue.devAssigned || "Unassigned"} />
        <DetailItem label="Track" value={issue.track || "Not specified"} />
        <DetailItem label="Reported by" value={issue.reportedBy || "Anonymous"} />
      </SectionCard>

      {/* Issue Summary */}
      <SectionCard title="Issue Summary 📋" icon={<FaListAlt className="text-green-500" />}> 
        <p className="text-gray-700">{issue.summary || "No summary provided."}</p>
      </SectionCard>

      {/* Issue Description */}
      <SectionCard title="Issue Description 🛠️" icon={<FaTools className="text-blue-500" />}> 
        <p className="text-gray-700">{issue.description || "No description available."}</p>
      </SectionCard>

      {/* Insights (Using Gemini Icon on the Right) */}
      <SectionCard title="Insights 💡" iconRight={geminiIcon}>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          {issue.insights?.length > 0 ? (
            issue.insights.map((insight, idx) => <li key={idx}>{insight}</li>)
          ) : (
            <p className="italic text-gray-500">No insights yet. Still investigating...</p>
          )}
        </ul>
      </SectionCard>

      {/* Device Info */}
      <SectionCard title="Device Info " icon={<FaMobileAlt className="text-purple-500" />}> 
        <DetailItem label="Device" value={`${issue.deviceModel} (${issue.deviceId})`} />
      </SectionCard>

      {/* User Journey with Full Screen Button */}
      <SectionCard title="User Journey" icon={<FaRoute className="text-indigo-500" />}> 
        <UserJourney steps={issue.userJourney.slice(0, 3)} />
        {issue.userJourney.length > 3 && (
          <p className="text-sm text-gray-500">+ {issue.userJourney.length - 3} more steps...</p>
        )}
        <button
          onClick={() => setIsFullScreen(true)}
          className="mt-2 flex items-center text-blue-600 hover:underline"
        >
          <FaExpand className="mr-2" /> View Full Journey
        </button>
      </SectionCard>

      {/* Related Links */}
      <SectionCard title="Related Slack Threads 💬" icon={<FaSlackHash className="text-blue-400" />}> 
        <RelatedList items={issue.relatedSlackThreads} />
      </SectionCard>

      {/* Full-Screen Modal */}
      {isFullScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-11/12 max-w-4xl relative">
            <button
              onClick={() => setIsFullScreen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              ✖
            </button>
            <h2 className="text-2xl font-semibold mb-4">Full User Journey</h2>
            <UserJourney steps={issue.userJourney} />
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Reusable Card Component (Handles Both Icons on Left and Right)
function SectionCard({ title, icon, iconRight, children }) {
  return (
    <motion.div
      className="p-5 bg-white/80 backdrop-blur-md rounded-xl shadow-md border border-gray-300 transform hover:scale-[1.02] hover:shadow-xl transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <h3 className="text-lg font-semibold mb-3 flex items-center justify-between text-gray-900">
        <span className="flex items-center gap-2">
          {icon} {title}
        </span>
        {iconRight && <img src={iconRight} alt="Icon" className="w-6 h-6 object-contain" />}
      </h3>
      {children}
    </motion.div>
  );
}

// Reusable Detail Item
function DetailItem({ label, value }) {
  return (
    <p className="text-gray-700 flex justify-between items-center">
      <span className="font-medium text-gray-900">{label}:</span>
      <span className="text-gray-600">{value}</span>
    </p>
  );
}

export default IssueDetails;
