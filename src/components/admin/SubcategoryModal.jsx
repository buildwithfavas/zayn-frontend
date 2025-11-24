import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

/**
 * Modal for Adding/Editing Subcategories and Sub-subcategories
 * @param {boolean} open - Whether modal is open
 * @param {string} type - "add" or "edit"
 * @param {number} level - 2 for subcategory, 3 for sub-subcategory
 * @param {object} ids - Category/subcategory IDs
 * @param {array} categoryOptions - Available categories for selection
 * @param {string} currentName - Current name (for edit mode)
 * @param {boolean} showCategorySelect - Whether to show category dropdown
 * @param {function} onSave - Callback when saving
 * @param {function} onCancel - Callback when canceling
 */
const SubcategoryModal = ({
  open,
  type,
  level,
  ids,
  categoryOptions = [],
  currentName = "",
  showCategorySelect = false,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    if (open) {
      if (type === "edit") {
        setName(currentName || "");
      } else {
        setName("");
        setCategoryId("");
      }
    }
  }, [open, type, currentName]);

  const handleSave = () => {
    onSave({ name, categoryId });
  };

  const title =
    type === "edit"
      ? level === 2
        ? "Edit Sub Category"
        : "Edit Sub-Sub Category"
      : level === 2
      ? "Add New Sub Category"
      : "Add New Sub-Sub Category";

  return (
    <Modal open={open} onClose={onCancel}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          {title}
        </Typography>

        {showCategorySelect && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="category-select-label">Select Category</InputLabel>
            <Select
              labelId="category-select-label"
              value={categoryId}
              label="Select Category"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categoryOptions.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
          placeholder="Enter name"
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SubcategoryModal;
