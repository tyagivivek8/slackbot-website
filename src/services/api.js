import axios from 'axios';

export async function fetchIssueDetails(issueId) {
  try {
    // Make a GET request to your backend API.
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/issues/${issueId}`);
    // The backend should return a JSON object that looks like:
    // {
    //   "issue_id": "...",
    //   "eventdata_devicemanufacturer": "...",
    //   ...
    //   "insights": [ ... ],
    //   "explainPM": "...",
    //   "summary": "...",
    //   "journey": [ ... ]
    // }
    return response.data;
  } catch (error) {
    console.error("Error fetching issue details:", error);
    throw error;
  }
}
