import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useGetCategoriesByLevelQuery,
  useBlockCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
} from "../../store/Api/admin/category";
import {
  CategoryListTable,
  BlockConfirmModal,
  DeleteConfirmModal,
  EditCategoryModal,
  OfferModal,
} from "../../components/admin";

export default function CategoriesList() {
  const { data, isLoading, refetch } = useGetCategoriesByLevelQuery({ level: "first" });
  const [blockCategory] = useBlockCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [editCategory] = useEditCategoryMutation();

  // Modal States
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });
  const [blockConfirm, setBlockConfirm] = useState({ open: false, id: null, isBlocked: false });
  const [offerModal, setOfferModal] = useState({ open: false, id: null, currentOffer: "" });
  const [editModal, setEditModal] = useState({ open: false });

  // Edit Form State
  const [editForm, setEditForm] = useState({
    id: null,
    name: "",
    image: "",
    file: null,
    preview: "",
  });

  const fileRef = useRef(null);

  // Admin should see ALL categories (including blocked ones)
  // Users will not see blocked categories (that filtering happens on the user-facing pages)
  const categories = data?.categories || [];

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (editForm.preview) URL.revokeObjectURL(editForm.preview);
    };
  }, [editForm.preview]);

  // ==================== DELETE HANDLERS ====================
  const handleDeleteClick = (id) => {
    setDeleteConfirm({ open: true, id });
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteCategory(deleteConfirm.id).unwrap();
      toast.success("Category deleted successfully");
      setDeleteConfirm({ open: false, id: null });
      refetch();
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ open: false, id: null });
  };

  // ==================== BLOCK/UNBLOCK HANDLERS ====================
  const handleBlockToggleClick = (id, currentlyBlocked) => {
    setBlockConfirm({ open: true, id, isBlocked: currentlyBlocked });
  };

  const handleBlockConfirm = async () => {
    try {
      await blockCategory(blockConfirm.id).unwrap();
      toast.success(blockConfirm.isBlocked ? "Category unblocked" : "Category blocked");
      setBlockConfirm({ open: false, id: null, isBlocked: false });
      refetch();
    } catch (error) {
      toast.error("Failed to toggle block");
    }
  };

  const handleBlockCancel = () => {
    setBlockConfirm({ open: false, id: null, isBlocked: false });
  };

  // ==================== OFFER HANDLERS ====================
  const handleOfferClick = (id, currentOffer) => {
    setOfferModal({ open: true, id, currentOffer: currentOffer || "" });
  };

  const handleOfferChange = (value) => {
    setOfferModal((prev) => ({ ...prev, currentOffer: value }));
  };

  const handleOfferSave = async () => {
    try {
      await editCategory({
        id: offerModal.id,
        data: { offer: offerModal.currentOffer },
      }).unwrap();
      toast.success("Offer saved");
      setOfferModal({ open: false, id: null, currentOffer: "" });
      refetch();
    } catch (error) {
      toast.error("Failed to save offer");
    }
  };

  const handleOfferCancel = () => {
    setOfferModal({ open: false, id: null, currentOffer: "" });
  };

  // ==================== EDIT HANDLERS ====================
  const handleEditClick = (category) => {
    setEditForm({
      id: category._id,
      name: category.name,
      image: category.image,
      file: null,
      preview: "",
    });
    setEditModal({ open: true });
  };

  const handleEditNameChange = (value) => {
    setEditForm((prev) => ({ ...prev, name: value }));
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setEditForm((prev) => ({
      ...prev,
      file: file,
      preview: url,
    }));
  };

  const handleEditSave = async () => {
    try {
      // In a real app, you'd upload the file first to get a URL
      // For now, we'll just send the name and existing image if no new file
      const updateData = {
        name: editForm.name,
        image: editForm.preview || editForm.image,
      };

      await editCategory({ id: editForm.id, data: updateData }).unwrap();
      toast.success("Category updated successfully");
      setEditModal({ open: false });
      refetch();
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  const handleEditCancel = () => {
    setEditModal({ open: false });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Category List</h1>
        <Link
          to="/admin/categories/new"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 text-sm"
        >
          ADD CATEGORY
        </Link>
      </div>

      {/* Category Table */}
      <CategoryListTable
        categories={categories}
        isLoading={isLoading}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        onBlockToggle={handleBlockToggleClick}
        onOffer={handleOfferClick}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={deleteConfirm.open}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      {/* Block/Unblock Confirmation Modal */}
      <BlockConfirmModal
        open={blockConfirm.open}
        isBlocked={blockConfirm.isBlocked}
        onConfirm={handleBlockConfirm}
        onCancel={handleBlockCancel}
      />

      {/* Offer Modal */}
      <OfferModal
        open={offerModal.open}
        currentOffer={offerModal.currentOffer}
        onChange={handleOfferChange}
        onSave={handleOfferSave}
        onCancel={handleOfferCancel}
      />

      {/* Edit Category Modal */}
      <EditCategoryModal
        open={editModal.open}
        formData={editForm}
        onNameChange={handleEditNameChange}
        onImageChange={handleEditImageChange}
        onSave={handleEditSave}
        onCancel={handleEditCancel}
        fileInputRef={fileRef}
      />
    </div>
  );
}
