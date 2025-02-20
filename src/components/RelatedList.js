import React from "react";
import { motion } from "framer-motion";

function RelatedList({ items }) {
  if (!items || items.length === 0) {
    return <p className="text-gray-500">No items found.</p>;
  }

  return (
    <motion.ul
      className="space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {items.map((item, idx) => (
        <motion.li
          key={idx}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <a
            href={item}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {item}
          </a>
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default RelatedList;
