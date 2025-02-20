import React, { useState } from "react";
import CollapsibleSection from "./CollapsibleSection";
import RelatedList from "./RelatedList";
import UserJourney from "./UserJourney";
import { motion } from "framer-motion";
import geminiIcon from "../gemini.png"; // Adjust path as needed
import { FaBug, FaTools, FaMobileAlt, FaListAlt, FaSlackHash, FaUser, FaFlag, FaRoute, FaExpand, FaRegClone, FaLightbulb, FaPaperPlane } from "react-icons/fa";

function GeminiChatbot() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const hardcodedPrompt = "You are an AI assistant that is solving the Prod issue. Respond to the developer query appropriately for this particular prod issue.\n\n";
    const fullMessage = hardcodedPrompt + userInput;

    const newChat = { sender: "user", text: userInput };
    setChatHistory((prev) => [...prev, newChat]);

    setUserInput("");

    try {
      const response = await fetch("https://api.google.com/gemini/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer AIzaSyAKdCfk7-gqpLZjlXnOcCN0gFq2r2uzlas`, // Warning: Do not expose API keys in the frontend!
        },
        body: JSON.stringify({ message: fullMessage }),
      });

      const data = await response.json();
      console.log(data);
      setChatHistory((prev) => [...prev, { sender: "gemini", text: data.reply }]);
    } catch (error) {
      setChatHistory((prev) => [...prev, { sender: "gemini", text: "Error fetching response." }]);
    }
  };


  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="h-40 overflow-y-auto border border-gray-300 p-2 bg-white rounded-lg mb-2">
        {chatHistory.length === 0 ? (
          <p className="text-gray-500 italic text-center">Ask Gemini about this issue...</p>
        ) : (
          chatHistory.map((msg, index) => (
            <p key={index} className={`text-sm p-1 ${msg.sender === "user" ? "text-blue-600" : "text-gray-700"}`}>
              <strong>{msg.sender === "user" ? "You" : "Gemini"}:</strong> {msg.text}
            </p>
          ))
        )}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          className="flex-1 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask Gemini..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button
          className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          onClick={sendMessage}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

/*
SectionCard title="Ask Gemini 🤖" iconRight={geminiIcon}>
        <GeminiChatbot />
      </SectionCard>
*/
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
      <SectionCard title="Issue Details " icon={<FaRegClone className="text-red-500" />}> 
        <DetailItem label="ID" value={issue.issueId} />
        <DetailItem label="Assigned to" value={issue.devAssigned || "Unassigned"} />
        <DetailItem label="Track" value={issue.track || "Not specified"} />
        <DetailItem label="Reported by" value={issue.reportedBy || "Anonymous"} />
      </SectionCard>

      <SectionCard title="Issue Summary " icon={<FaListAlt className="text-green-500" />}> 
        <p className="text-gray-700">{issue.summary || "No summary provided."}</p>
      </SectionCard>

      <SectionCard title="Issue Description " icon={<FaTools className="text-blue-500" />}> 
        <p className="text-gray-700">{issue.description || "No description available."}</p>
      </SectionCard>

      <SectionCard title="Insights 💡" iconRight={geminiIcon}>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          {issue.insights?.length > 0 ? (
            issue.insights.map((insight, idx) => <li key={idx}>{insight}</li>)
          ) : (
            <p className="italic text-gray-500">No insights yet. Still investigating...</p>
          )}
        </ul>
      </SectionCard>

      <SectionCard title="Device Info " icon={<FaMobileAlt className="text-purple-500" />}> 
        <DetailItem label="Device" value={`${issue.deviceModel} (${issue.deviceId})`} />
      </SectionCard>

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

      <SectionCard title="Potentially Relevant APIs" icon={<FaTools className="text-orange-500" />}> 
  <ul className="list-disc pl-5 text-gray-700 space-y-2">
    {issue.relevantAPIs?.length > 0 ? (
      issue.relevantAPIs.map((api, idx) => <li key={idx}>{api}</li>)
    ) : (
      <p className="italic text-gray-500">No relevant APIs identified yet.</p>
    )}
  </ul>
</SectionCard>


      <SectionCard title="Ask Gemini 🤖" iconRight={geminiIcon}>
        <GeminiChatbot />
      </SectionCard>

      <SectionCard title="Related Slack Threads 💬" icon={<FaSlackHash className="text-blue-400" />}> 
        <RelatedList items={issue.relatedSlackThreads} />
      </SectionCard>

      {/* New Section: How can I explain this to my PM */}
      <SectionCard title="How can I explain this to my PM 🤔" icon={<FaLightbulb className="text-yellow-500" />}> 
        <p className="text-gray-700">
          To explain this issue clearly to your PM:
        </p>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li><strong>Problem Summary:</strong> Describe the issue in one sentence.</li>
          <li><strong>Impact:</strong> Explain how it affects users, teams, or metrics.</li>
          <li><strong>Root Cause:</strong> If known, mention what is causing the issue.</li>
          <li><strong>Workaround:</strong> Suggest temporary solutions if applicable.</li>
          <li><strong>Next Steps:</strong> Outline what needs to be done and estimated timelines.</li>
        </ul>
      </SectionCard>

      {/* New Section: Helpful Links */}
<SectionCard title="Helpful Links 🔗" icon={<FaLink className="text-blue-500" />}>
  <p className="text-gray-700">
    Useful resources to understand and resolve the issue:
  </p>
  <ul className="list-disc pl-5 text-gray-700 space-y-2">
    <li><a href="https://developer.apple.com/documentation/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Apple Developer Documentation</a></li>
    <li><a href="https://swift.org/documentation/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Swift Official Documentation</a></li>
    <li><a href="https://stackoverflow.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Stack Overflow</a></li>
    <li><a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">GitHub Repositories</a></li>
  </ul>
</SectionCard>

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

function DetailItem({ label, value }) {
  return (
    <p className="text-gray-700 flex justify-between items-center">
      <span className="font-medium text-gray-900">{label}:</span>
      <span className="text-gray-600">{value}</span>
    </p>
  );
}

export default IssueDetails;
