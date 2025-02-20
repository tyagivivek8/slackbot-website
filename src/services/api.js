export async function fetchIssueDetails(issueId) {
    // Example API call: GET /api/issues/:issueId
    // Returning mocked data with 15 user journey entries as objects.
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          issueId: "ISSUE-1234",
          description: "The app crashes upon opening the main screen.",
          summary:
            "When the user opens the main screen, the app crashes after 2 seconds. Possibly related to a missing config file. Need to investigate logs in more detail.",
          devAssigned: "Jane Doe",
          insights: [
            "Insight 1: Initial investigation shows a null pointer exception.",
            "Insight 2: Possible memory leak detected.",
            "Insight 3: Configuration file missing from bundle.",
            "Insight 4: Crash reproducible on iOS 14 and above.",
            "Insight 5: Rollback to previous version resolved issue temporarily."
          ],
          userJourney: [
            { name: "User opens the app", timestamp: "2025-02-19 09:00:00" },
            { name: "User logs in with valid credentials", timestamp: "2025-02-19 09:00:30" },
            { name: "User lands on the dashboard", timestamp: "2025-02-19 09:01:00" },
            { name: "User navigates to notifications", timestamp: "2025-02-19 09:01:30" },
            { name: "User checks messages", timestamp: "2025-02-19 09:02:00" },
            { name: "User reads an article", timestamp: "2025-02-19 09:02:30" },
            { name: "User clicks on a promotion banner", timestamp: "2025-02-19 09:03:00" },
            { name: "User is redirected to the product page", timestamp: "2025-02-19 09:03:30" },
            { name: "User adds a product to the cart", timestamp: "2025-02-19 09:04:00" },
            { name: "User continues browsing", timestamp: "2025-02-19 09:04:30" },
            { name: "User views recommended items", timestamp: "2025-02-19 09:05:00" },
            { name: "User proceeds to checkout", timestamp: "2025-02-19 09:05:30" },
            { name: "User enters payment details", timestamp: "2025-02-19 09:06:00" },
            { name: "User confirms the order", timestamp: "2025-02-19 09:06:30" },
            { name: "Order confirmation is displayed", timestamp: "2025-02-19 09:07:00" }
          ],
          deviceModel: "iPhone 12",
          deviceId: "XYZ-1234",
          relatedSlackThreads: [
            "https://slack.com/app_redirect?channel=exampleChannel1",
            "https://slack.com/app_redirect?channel=exampleChannel2"
          ],
          relatedIssues: ["ISSUE-5678", "ISSUE-91011"],
          relatedAppleForums: [
            "https://discussions.apple.com/thread/1234567",
            "https://discussions.apple.com/thread/89101112"
          ],
          relatedStackOverflowThreads: [
            "https://stackoverflow.com/questions/1234567",
            "https://stackoverflow.com/questions/89101112"
          ]
        });
      }, 500); // Simulate network delay
    });
  }
  