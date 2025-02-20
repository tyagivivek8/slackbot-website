import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";

function CollapsibleSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className="mb-4 border border-gray-300 rounded-lg shadow bg-white">
      <button
        onClick={toggleOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") toggleOpen();
        }}
        aria-expanded={isOpen}
        className="w-full flex justify-between items-center px-4 py-3 text-lg font-semibold bg-gray-100 hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <span>{title}</span>
        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>

      <motion.div
        initial={false}
        animate={{ maxHeight: isOpen ? "500px" : "0px", opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="p-4">{children}</div>
      </motion.div>
    </div>
  );
}

export default CollapsibleSection;
