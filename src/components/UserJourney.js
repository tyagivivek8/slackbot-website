import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

function UserJourney({ steps }) {
  const [showModal, setShowModal] = useState(false);

  // Disable scrolling on the main page when the modal is open.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };

    if (showModal) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  // Limit visible steps in the main view
  const previewCount = 5;
  const displayedSteps = steps?.slice(0, previewCount);
  const remainingCount = steps?.length - previewCount;
  const hasMore = remainingCount > 0;

  // Render the flow of steps
  const renderFlow = useCallback(
    (stepsToRender, includeMoreIndicator = false) => (
      <div className="flex flex-col items-center">
        {stepsToRender.map((step, idx) => (
          <div key={idx} className="mb-4 w-full flex flex-col items-center">
            <div className="bg-gray-100 p-3 rounded-md shadow-sm text-gray-700 text-center w-full">
              <div className="font-semibold">{step.name}</div>
              <div className="text-xs text-gray-500">{step.timestamp}</div>
            </div>
            {idx !== stepsToRender.length - 1 && (
              <div className="flex justify-center mt-2">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            )}
          </div>
        ))}
        {includeMoreIndicator && (
          <div className="mt-2 flex flex-col items-center">
            <div className="flex justify-center">
              <svg
                className="w-6 h-6 text-blue-500 animate-bounce"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="mt-2 text-blue-500 hover:underline font-medium"
            >
              Show {remainingCount} more step{remainingCount > 1 ? "s" : ""}
            </button>
          </div>
        )}
      </div>
    ),
    [remainingCount]
  );

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">User Journey</h3>
      {renderFlow(displayedSteps, hasMore)}

      {/* Modal for full journey */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden={!showModal}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-full overflow-y-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  Full User Journey ({steps.length} steps)
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>
              {renderFlow(steps)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserJourney;
