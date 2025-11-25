import React from "react";
import { Add, Edit, Delete, Block, LockOpen, LocalOffer } from "@mui/icons-material";

/**
 * Action buttons for subcategories
 * @param {number} level - 2 for subcategory, 3 for sub-subcategory
 * @param {boolean} isBlocked - Whether item is blocked
 * @param {function} onAdd - Callback for add button (only for level 2)
 * @param {function} onEdit - Callback for edit button
 * @param {function} onDelete - Callback for delete button
 * @param {function} onBlockToggle - Callback for block/unblock button
 * @param {function} onOffer - Callback for offer button
 */
const SubcategoryActions = ({
  level,
  isBlocked,
  onAdd,
  onEdit,
  onDelete,
  onBlockToggle,
  onOffer,
}) => {
  return (
    <div className="flex items-center gap-2 text-gray-600">
      {/* Add button - only for subcategories (level 2) */}
      {level !== 3 && (
        <button
          title="Add"
          onClick={onAdd}
          className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
        >
          <Add fontSize="small" />
        </button>
      )}

      {/* Edit button */}
      <button
        title="Edit"
        onClick={onEdit}
        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
      >
        <Edit fontSize="small" />
      </button>

      {/* Offer button */}
      <button
        title="Add / Edit Offer"
        onClick={onOffer}
        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
      >
        <LocalOffer fontSize="small" />
      </button>

      {/* Block / Unblock button */}
      <button
        title={isBlocked ? "Unblock" : "Block"}
        onClick={onBlockToggle}
        className={`p-1 rounded transition-colors ${
          isBlocked ? "text-green-600 hover:bg-green-50" : "text-red-600 hover:bg-red-50"
        }`}
      >
        {isBlocked ? <LockOpen fontSize="small" /> : <Block fontSize="small" />}
      </button>

      {/* Delete button */}
      <button
        title="Delete"
        onClick={onDelete}
        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
      >
        <Delete fontSize="small" />
      </button>
    </div>
  );
};

export default SubcategoryActions;
