import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, CircularProgress, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import toast from "react-hot-toast";
import { useCategoryAddMutation } from "../../store/Api/admin/category";
import { ImageUploadBox } from "../../components/admin";

// Validation Schema
const categorySchema = yup.object().shape({
  name: yup
    .string()
    .required("Category name is required")
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must not exceed 50 characters")
    .trim(),
});

export default function CategoryCreate() {
  const navigate = useNavigate();
  const [addCategory, { isLoading }] = useCategoryAddMutation();

  // File State
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [fileError, setFileError] = useState("");

  // React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  // Cleanup preview URL on unmount or file change
  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // ==================== FILE HANDLERS ====================
  const validateFile = (selectedFile) => {
    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/svg+xml"];
    if (!validTypes.includes(selectedFile.type)) {
      setFileError("Please upload a valid image file (PNG, JPG, GIF, or SVG)");
      return false;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (selectedFile.size > maxSize) {
      setFileError("File size should not exceed 5MB");
      return false;
    }

    setFileError("");
    return true;
  };

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;

    if (validateFile(selectedFile)) {
      setFile(selectedFile);
    }
  };

  // ==================== FORM HANDLERS ====================
  const onSubmit = async (data) => {
    // Validate file
    if (!file) {
      setFileError("Please choose an image");
      return;
    }

    try {
      // TODO: Implement proper image upload to cloud storage (Cloudinary/AWS S3)
      // For now, using a placeholder image service
      // When you implement cloud upload, replace this with the actual uploaded image URL

      const categoryData = {
        name: data.name.trim(),
        image: `https://picsum.photos/seed/${Date.now()}/400/300`, // Random placeholder image
        level: "first",
      };

      await addCategory(categoryData).unwrap();

      toast.success("Category created successfully!");
      navigate("/admin/categories");
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error(error?.data?.message || "Failed to create category");
    }
  };

  const handleCancel = () => {
    navigate("/admin/categories");
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add New Category</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow border border-gray-200 p-6 max-w-xl"
      >
        <div className="space-y-4">
          {/* Category Name Input */}
          <div>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Category Name"
                  placeholder="e.g. Fashion"
                  fullWidth
                  size="small"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  disabled={isLoading}
                />
              )}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Image <span className="text-red-500">*</span>
            </label>
            <ImageUploadBox
              file={file}
              preview={preview}
              onFileSelect={handleFileSelect}
              disabled={isLoading}
              error={fileError}
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex gap-3">
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              startIcon={
                isLoading ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />
              }
            >
              {isLoading ? "Creating..." : "PUBLISH AND VIEW"}
            </Button>

            <Button type="button" variant="outlined" onClick={handleCancel} disabled={isLoading}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
