import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SubcategoryItem from "./SubcategoryItem";

const CategoryItem = ({ cat, isOpen, onToggle, openSubs, onToggleSub, onAction }) => {
  return (
    <div className="mb-2">
      {/* Category Header */}
      <div
        className="flex items-center bg-gray-100 rounded px-3 py-2 cursor-pointer hover:bg-gray-200 transition-colors"
        onClick={() => onToggle(cat.id)}
      >
        <KeyboardArrowDownIcon
          className={`transition-transform mr-2 text-gray-600 ${isOpen ? "rotate-180" : ""}`}
        />
        <div className="font-medium text-gray-800 grow">{cat.name}</div>
      </div>

      {/* Subcategories */}
      {isOpen && (
        <div className="mt-2 ml-3">
          {cat.subs.map((sub) => (
            <SubcategoryItem
              key={sub.id}
              sub={sub}
              isOpen={openSubs[sub.id]}
              onToggle={onToggleSub}
              onAction={(action, ...args) => onAction(action, cat.id, ...args)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
