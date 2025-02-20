import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";

function CollapsibleSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border border-gray-200 rounded-lg shadow-md bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 text-lg font-semibold bg-gray-100 hover:bg-gray-200 transition"
      >
        <span>{title}</span>
        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4">{children}</div>
      </motion.div>
    </div>
  );
}

export default CollapsibleSection;
