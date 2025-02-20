import { useState } from "react";
export default function WarRoomButton() {
  const [meetLink, setMeetLink] = useState("");
  const startWarRoom = async () => {
    // Generate a new Google Meet link
    const meetUrl = "https://meet.google.com/new";
    setMeetLink(meetUrl);
    window.open(meetUrl, "_blank"); // Open in a new tab
  };
  return (
    <div className="mt-3 flex flex-col">
      <button
        onClick={startWarRoom}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Start War Room
      </button>
      {meetLink && (
        <p className="mt-3 text-gray-700">
          Meeting Link:{" "}
          <a href={meetLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            {meetLink}
          </a>
        </p>
      )}
    </div>
  );
}









