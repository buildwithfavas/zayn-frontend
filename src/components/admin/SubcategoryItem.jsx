import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SubcategoryActions from "./SubcategoryActions";

const SubcategoryItem = ({ sub, isOpen, onToggle, onAction }) => {
  return (
    <div className="mb-2">
      <div className="flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-2">
          <button onClick={() => onToggle(sub.id)} className="text-gray-600">
            <KeyboardArrowDownIcon
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
              fontSize="small"
            />
          </button>
          <span className="text-gray-800">{sub.name}</span>
          {sub.isBlocked && (
            <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded">
              Blocked
            </span>
          )}
        </div>
        <SubcategoryActions
          level={2}
          isBlocked={sub.isBlocked}
          onAdd={() => onAction("add", sub.id)}
          onEdit={() => onAction("edit", sub.id)}
          onDelete={() => onAction("delete", sub.id)}
          onBlockToggle={() => onAction("block", sub.id)}
          onOffer={() => onAction("offer", sub.id, sub.offer)}
        />
      </div>

      {/* Sub-subcategories */}
      {isOpen && (
        <div className="mt-1 ml-6">
          {sub.subs.map((ss) => (
            <div key={ss.id} className="flex items-center justify-between px-2 py-1">
              <div className="text-gray-800">
                {ss.name}
                {ss.isBlocked && (
                  <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded">
                    Blocked
                  </span>
                )}
              </div>
              <SubcategoryActions
                level={3}
                isBlocked={ss.isBlocked}
                onEdit={() => onAction("edit", sub.id, ss.id)}
                onDelete={() => onAction("delete", sub.id, ss.id)}
                onBlockToggle={() => onAction("block", sub.id, ss.id)}
                onOffer={() => onAction("offer", sub.id, ss.offer)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubcategoryItem;
