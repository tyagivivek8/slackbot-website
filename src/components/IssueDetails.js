import React, { useState } from "react";
import CollapsibleSection from "./CollapsibleSection";
import RelatedList from "./RelatedList";
import UserJourney from "./UserJourney";
import WarRoomButton from "./WarRoomButton";
import { motion } from "framer-motion";
import geminiIcon from "../gemini.png"; // Adjust path as needed
import axios from 'axios';
import { useEffect } from "react";
import { FaBug, FaTools, FaVideo, FaMobileAlt, FaImage, FaLink, FaListAlt, FaSlackHash, FaUser, FaFlag, FaRoute, FaExpand, FaRegClone, FaLightbulb, FaPaperPlane } from "react-icons/fa";

const memeUrls = [
  "https://configcat.com/blog/assets/images/2-stand-back-8d3f2f64c38cdbf8c6c33b91105f785a.jpg",
  "https://configcat.com/blog/assets/images/7-live-on-edge-04cbec98cffcf86e93418f8449ce5125.jpg",
  "https://configcat.com/blog/assets/images/9-live-dangerously-da40a91e83aa9d9ad82b48c48083dbbd.jpg",
  "https://configcat.com/blog/assets/images/17-test-in-production-fe501504a8a9ef242ce6b8120b674f8f.jpg"
];


function getRandomMeme() {
  const randomIndex = Math.floor(Math.random() * memeUrls.length);
  return memeUrls[randomIndex];
}

function GeminiChatbot({ issue }) {
    const [userInput, setUserInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
  
    const sendMessage = async (e) => {
      e.preventDefault(); // Prevent form submission from reloading the page.
      if (!userInput.trim()) return;
      
      // Add user's message to the conversation.
      const newChat = { sender: "user", text: userInput };
      setChatHistory((prev) => [...prev, newChat]);
  
      // Capture the current message before clearing input.
      const currentMessage = userInput;
      setUserInput("");
  
      try {
        // Call the Gemini chatbot API.
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/chatbot`, {
          message: currentMessage,
          issue: issue
        });
        const botResponse = response.data.response;
        setChatHistory((prev) => [
          ...prev,
          { sender: "bot", text: botResponse },
        ]);
      } catch (err) {
        console.error("Error fetching chatbot response:", err);
        setChatHistory((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Sorry, there was an error getting a response.",
          },
        ]);
      }
    };
  
    return (
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="h-40 overflow-y-auto border border-gray-300 p-2 bg-white rounded-lg mb-2">
          {chatHistory.length === 0 ? (
            <p className="text-gray-500 italic text-center">
              Ask StressBuster about this issue...
            </p>
          ) : (
            chatHistory.map((msg, index) => (
              <p
                key={index}
                className={`text-sm p-1 ${
                  msg.sender === "user" ? "text-blue-600" : "text-gray-700"
                }`}
              >
                <strong>{msg.sender === "user" ? "You" : "StressBuster"}:</strong>{" "}
                {msg.text}
              </p>
            ))
          )}
        </div>
        <form onSubmit={sendMessage} className="flex items-center">
          <input
            type="text"
            className="flex-1 border p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask Stressbuster..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    );
  }

  const messages = [
    "🕵️‍♂️ Investigating... or just staring at the screen. Hard to tell.",
    "🐛 Debugging the bug that’s debugging me...",
    "🛠️ Assembling the issue details... IKEA-style.",
    "🎩 Pulling issue details out of a hat. Stay tuned!",
    "🤔 Thinking... Thinking... Still thinking...",
    "📡 Sending signals to the issue server... Hope it responds!",
  ];
  
  function IssueLoader() {
    const [message, setMessage] = useState(messages[0]);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setMessage(messages[Math.floor(Math.random() * messages.length)]);
      }, 3000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="text-center text-gray-500 mt-8 text-lg animate-pulse">
        {message}
      </div>
    );
  }
  
function IssueDetails({ issue }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (!issue) {
    return (
      <div className="text-center text-gray-500 mt-8 text-lg animate-pulse">
        <IssueLoader/>
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
        <DetailItem label="ID" value={issue.issue_id} />
        <DetailItem label="Assigned to" value={issue.devAssigned || "Alankrita"} />
        <DetailItem label="Track" value={issue.track || "Pre-Txn"} />
        <DetailItem label="Reported by" value={issue.reportedBy || "Mayank"} />
        <DetailItem label="Created at" value={issue.createdAt || "24-01-2025"} />
      </SectionCard>

      <SectionCard title="Issue Summary " icon={<FaListAlt className="text-green-500" />}> 
        <p className="text-gray-700">{issue.summary || "No summary provided."}</p>
      </SectionCard>

      <SectionCard title="Issue Description " icon={<FaTools className="text-blue-500" />}> 
        <p className="text-gray-700">{issue.issue_description || "No description available."}</p>
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
        <DetailItem label="Device" value={`${issue.eventdata_devicemanufacturer} (${issue.eventdata_devicemodel})`} />
        <DetailItem label="OS" value={`${issue.eventdata_osname} v${issue.eventdata_osversion}`} />
        <DetailItem label="App version" value={`${issue.eventdata_appversion} (${issue.eventdata_versioncode})`} />
        <DetailItem label="Network" value={`${issue.eventdata_currentnetwork}`} />
        <DetailItem label="User ID" value={`${issue.eventdata_userid}`} />
      </SectionCard>

      <SectionCard title="User Journey" icon={<FaRoute className="text-indigo-500" />}> 
        <UserJourney steps={issue.journey?.slice(0, 3)} />
        {issue.journey?.length > 3 && (
          <p className="text-sm text-gray-500">+ {issue.journey.length - 3} more steps...</p>
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
    {issue.relevant_apis?.length > 0 ? (
      issue.relevant_apis.map((api, idx) => <li key={idx}>{api}</li>)
    ) : (
      <p className="italic text-gray-500">No relevant APIs identified yet.</p>
    )}
  </ul>
</SectionCard>


        <SectionCard title="Ask StressBuster 🤖" iconRight={geminiIcon}>
            <GeminiChatbot issue={issue} />
      </SectionCard>

      <SectionCard title="Start War Room 🚀" icon={<FaVideo className="text-blue-500" />}>
        <p className="text-gray-700">Quickly start a meeting to discuss this issue.</p>
        <WarRoomButton />
      </SectionCard>

      <SectionCard title="Related Issues 💬" icon={<FaSlackHash className="text-blue-400" />}> 
        <RelatedList items={issue.relatedSlackThreads} />
      </SectionCard>

      {/* New Section: How can I explain this to my PM */}
      <SectionCard title="How can I explain this to my PM 🤔" icon={<FaLightbulb className="text-yellow-500" />}> 
        <p className="text-gray-700">
          `"${issue.explainPM}"`
        </p>
      </SectionCard>

      {/* New Section: Image Display */}
      <SectionCard title="" icon={<FaImage className="text-blue-500" />}> 
        <div className="flex justify-center">
          <img
            src={getRandomMeme()}
            alt="Issue Representation"
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
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
            <UserJourney steps={issue.journey} />
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
