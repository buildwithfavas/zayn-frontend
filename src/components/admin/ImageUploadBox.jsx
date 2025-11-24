import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

/**
 * Reusable Image Upload Box Component
 * @param {File|null} file - Current selected file
 * @param {string} preview - Preview URL
 * @param {function} onFileSelect - Callback when file is selected
 * @param {boolean} disabled - Whether upload is disabled
 * @param {string} error - Error message to display
 */
const ImageUploadBox = ({ file, preview, onFileSelect, disabled = false, error = "" }) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (!disabled && e.dataTransfer.files) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative mt-2 border-2 border-dashed rounded-md p-6 text-center transition-colors ${
          dragOver ? "border-blue-400 bg-blue-50" : error ? "border-red-300" : "border-gray-300"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        {preview ? (
          <div className="flex items-center gap-3">
            <img
              src={preview}
              alt="preview"
              className="w-20 h-20 rounded object-cover bg-gray-100"
            />
            <div className="text-left text-sm text-gray-600 break-all">{file?.name}</div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <CloudUploadIcon className="w-8 h-8" />
            <div className="mt-2 text-sm">
              <span className="text-gray-700">Click to upload</span> or drag and drop
            </div>
            <div className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max 5MB)</div>
          </div>
        )}
        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/gif,image/svg+xml"
          onChange={handleFileInput}
          className="absolute opacity-0 w-full h-full cursor-pointer"
          style={{ inset: 0 }}
          aria-label="Upload image"
          disabled={disabled}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default ImageUploadBox;
