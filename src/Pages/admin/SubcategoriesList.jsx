import React, { useMemo, useState } from "react";
import { CircularProgress } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import toast from "react-hot-toast";
import {
  useGetCategoriesByLevelQuery,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useCategoryAddMutation,
  useBlockCategoryMutation,
} from "../../store/Api/admin/category";
import {
  DeleteConfirmModal,
  SubcategoryModal,
  SubcategoryActions,
  BlockConfirmModal,
  OfferModal,
  CategoryItem,
} from "../../components/admin";

export default function SubcategoriesList() {
  // Pagination State
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Filter State
  const [filter, setFilter] = useState("all");

  // Fetch categories data
  // Paginate Root Categories
  const {
    data: rootData,
    isLoading: rootLoading,
    refetch: rootRefetch,
  } = useGetCategoriesByLevelQuery({
    level: "first",
    page: page,
    perPage: perPage,
    filter: filter,
  });

  // Fetch ALL subcategories to ensure we can build the tree for displayed root cats
  const {
    data: subData,
    isLoading: subLoading,
    refetch: subRefetch,
  } = useGetCategoriesByLevelQuery({
    level: "second",
    perPage: 1000, // Fetch large number to get all
    filter: filter,
  });

  const {
    data: thirdData,
    isLoading: thirdLoading,
    refetch: thirdRefetch,
  } = useGetCategoriesByLevelQuery({
    level: "third",
    perPage: 1000, // Fetch large number to get all
    filter: filter,
  });

  // Mutations
  const [addCategory] = useCategoryAddMutation();
  const [editCategory] = useEditCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [blockCategory] = useBlockCategoryMutation();

  // State
  const [openCats, setOpenCats] = useState({});
  const [openSubs, setOpenSubs] = useState({});
  const [modal, setModal] = useState({ type: null, payload: null });
  const [blockConfirm, setBlockConfirm] = useState({ open: false, id: null, isBlocked: false });
  const [offerModal, setOfferModal] = useState({ open: false, id: null, currentOffer: "" });

  // Process data to create hierarchical structure
  const data = useMemo(() => {
    if (!rootData?.categories) return [];

    return rootData.categories.map((cat) => {
      const subs = (subData?.categories || [])
        .filter((sub) => sub.parentId === cat._id)
        .map((sub) => ({
          id: sub._id,
          name: sub.name,
          isBlocked: sub.isBlocked, // Include isBlocked
          offer: sub.offer, // Include offer
          subs: (thirdData?.categories || [])
            .filter((third) => third.parentId === sub._id)
            .map((third) => ({
              id: third._id,
              name: third.name,
              isBlocked: third.isBlocked, // Include isBlocked
              offer: third.offer, // Include offer
            })),
        }));

      return {
        id: cat._id,
        name: cat.name,
        isBlocked: cat.isBlocked, // Include isBlocked
        subs,
      };
    });
  }, [rootData, subData, thirdData]);

  const catOptions = useMemo(() => data.map((c) => ({ id: c.id, name: c.name })), [data]);

  const [isAllExpanded, setIsAllExpanded] = useState(true);

  // Expand all by default when data loads, but preserve existing state
  React.useEffect(() => {
    if (data.length > 0) {
      setOpenCats((prev) => {
        const newState = { ...prev };
        data.forEach((cat) => {
          // Only set default if key doesn't exist
          if (newState[cat.id] === undefined) {
            newState[cat.id] = isAllExpanded;
          }
        });
        return newState;
      });

      setOpenSubs((prev) => {
        const newState = { ...prev };
        data.forEach((cat) => {
          cat.subs.forEach((sub) => {
            // Only set default if key doesn't exist
            if (newState[sub.id] === undefined) {
              newState[sub.id] = isAllExpanded;
            }
          });
        });
        return newState;
      });
    }
  }, [data, isAllExpanded]);

  const isLoading = rootLoading || subLoading || thirdLoading;
  const totalCategories = rootData?.totalCategories || 0;
  const totalPages = Math.ceil(totalCategories / perPage);

  // ==================== TOGGLE HANDLERS ====================
  const toggleCat = (id) => {
    setOpenCats((p) => ({ ...p, [id]: !p[id] }));
  };

  const toggleSub = (id) => {
    setOpenSubs((p) => ({ ...p, [id]: !p[id] }));
  };

  // Keep track of latest data for toggleAll to avoid stale closures
  const dataRef = React.useRef(data);
  React.useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const toggleAll = () => {
    const currentData = dataRef.current;
    if (isAllExpanded) {
      // Collapse all - explicitly set to false
      setOpenCats((prev) => {
        const next = { ...prev };
        currentData.forEach((cat) => {
          next[cat.id] = false;
        });
        return next;
      });
      setOpenSubs((prev) => {
        const next = { ...prev };
        currentData.forEach((cat) => {
          cat.subs.forEach((sub) => {
            next[sub.id] = false;
          });
        });
        return next;
      });
    } else {
      // Expand all
      setOpenCats((prev) => {
        const next = { ...prev };
        currentData.forEach((cat) => {
          next[cat.id] = true;
        });
        return next;
      });
      setOpenSubs((prev) => {
        const next = { ...prev };
        currentData.forEach((cat) => {
          cat.subs.forEach((sub) => {
            next[sub.id] = true;
          });
        });
        return next;
      });
    }
    setIsAllExpanded(!isAllExpanded);
  };

  // ==================== CRUD HANDLERS ====================
  const handleAdd = async (level, ids, data) => {
    try {
      const categoryData = {
        name: data.name,
        level: level === 2 ? "second" : "third",
        parentId: level === 2 ? data.categoryId : ids.subId,
        parentCatName: "", // Will be set by backend if needed
      };

      await addCategory(categoryData).unwrap();
      toast.success(`${level === 2 ? "Subcategory" : "Sub-subcategory"} added successfully`);
      setModal({ type: null, payload: null });
      // Refetch to show new data
      subRefetch();
      thirdRefetch();
    } catch (error) {
      console.error("Error adding:", error);
      toast.error(error?.data?.message || "Failed to add");
    }
  };

  const handleEdit = async (level, ids, name) => {
    try {
      const id = level === 2 ? ids.subId : ids.subsubId;
      await editCategory({ id, data: { name } }).unwrap();
      toast.success("Updated successfully");
      setModal({ type: null, payload: null });
    } catch (error) {
      console.error("Error editing:", error);
      toast.error(error?.data?.message || "Failed to update");
    }
  };

  const handleDelete = async (level, ids) => {
    try {
      const id = level === 2 ? ids.subId : ids.subsubId;
      await deleteCategory(id).unwrap();
      toast.success("Deleted successfully");
      setModal({ type: null, payload: null });
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error(error?.data?.message || "Failed to delete");
    }
  };

  const handleBlockToggle = (id, currentlyBlocked) => {
    setBlockConfirm({ open: true, id, isBlocked: currentlyBlocked });
  };

  const handleBlockConfirm = async () => {
    try {
      await blockCategory(blockConfirm.id).unwrap();
      toast.success(blockConfirm.isBlocked ? "Unblocked successfully" : "Blocked successfully");
      setBlockConfirm({ open: false, id: null, isBlocked: false });

      // Manually refetch all levels to ensure UI updates
      rootRefetch();
      subRefetch();
      thirdRefetch();
    } catch (error) {
      console.error("Error toggling block:", error);
      toast.error(error?.data?.message || "Failed to toggle block");
    }
  };

  const handleOfferClick = (id, currentOffer) => {
    setOfferModal({ open: true, id, currentOffer: currentOffer || "" });
  };

  const handleOfferSave = async () => {
    try {
      await editCategory({
        id: offerModal.id,
        data: { offer: offerModal.currentOffer },
      }).unwrap();
      toast.success("Offer saved successfully");
      setOfferModal({ open: false, id: null, currentOffer: "" });
    } catch (error) {
      console.error("Error saving offer:", error);
      toast.error(error?.data?.message || "Failed to save offer");
    }
  };

  // ==================== MODAL HANDLERS ====================
  const handleModalSave = (data) => {
    const { level, ids } = modal.payload;

    if (modal.type === "edit") {
      handleEdit(level, ids, data.name);
    } else if (modal.type === "add") {
      handleAdd(level, ids, data);
    }
  };

  const handleDeleteConfirm = () => {
    const { level, ids } = modal.payload;
    handleDelete(level, ids);
  };

  const getName = (level, ids) => {
    const cat = data.find((c) => c.id === ids.catId);
    if (!cat) return "";

    const sub = cat.subs.find((s) => s.id === ids.subId);
    if (!sub) return "";

    if (level === 2) return sub.name;

    const subsub = sub.subs.find((ss) => ss.id === ids.subsubId);
    return subsub?.name || "";
  };

  const handleAction = (action, catId, subId, subsubId, ...args) => {
    if (action === "add") {
      setModal({
        type: "add",
        payload: { level: 3, ids: { catId, subId } },
      });
    } else if (action === "edit") {
      setModal({
        type: "edit",
        payload: {
          level: subsubId ? 3 : 2,
          ids: { catId, subId, subsubId },
        },
      });
    } else if (action === "delete") {
      setModal({
        type: "delete",
        payload: {
          level: subsubId ? 3 : 2,
          ids: { catId, subId, subsubId },
        },
      });
    } else if (action === "block") {
      // Look up fresh isBlocked value from data
      const cat = data.find((c) => c.id === catId);
      if (!cat) return;

      const sub = cat.subs.find((s) => s.id === subId);
      if (!sub) return;

      let currentIsBlocked = false;
      if (subsubId) {
        const subsub = sub.subs.find((ss) => ss.id === subsubId);
        if (subsub) currentIsBlocked = subsub.isBlocked || false;
      } else {
        currentIsBlocked = sub.isBlocked || false;
      }

      handleBlockToggle(subsubId || subId, currentIsBlocked);
    } else if (action === "offer") {
      const currentOffer = args[0];
      handleOfferClick(subsubId || subId, currentOffer);
    }
  };

  // Pagination Handlers
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setPage(1); // Reset to first page
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Sub Category List</h1>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
          <button
            className="px-3 py-2 rounded-md text-blue-600 border border-blue-600 hover:bg-blue-50 text-sm font-medium"
            onClick={toggleAll}
          >
            {isAllExpanded ? "COLLAPSE ALL" : "EXPAND ALL"}
          </button>
          <button
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 text-sm"
            onClick={() =>
              setModal({ type: "add", payload: { level: 2, ids: {}, fromButton: true } })
            }
          >
            ADD NEW SUB CATEGORY
          </button>
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-3">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <CircularProgress />
            </div>
          ) : (
            <>
              {data.map((cat) => (
                <CategoryItem
                  key={cat.id}
                  cat={cat}
                  isOpen={openCats[cat.id]}
                  onToggle={toggleCat}
                  openSubs={openSubs}
                  onToggleSub={toggleSub}
                  onAction={handleAction}
                />
              ))}

              {/* Pagination Controls */}
              {totalCategories > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-3 border-t border-gray-100 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>Category per page:</span>
                    <select
                      value={perPage}
                      onChange={handlePerPageChange}
                      className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {[10, 20, 30].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-4">
                    <div>
                      Showing {(page - 1) * perPage + 1}-{Math.min(page * perPage, totalCategories)}{" "}
                      of {totalCategories}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className={`px-2.5 py-1 rounded border border-gray-300 text-sm ${
                          page === 1
                            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                            : "text-gray-700 bg-white hover:bg-gray-50"
                        }`}
                      >
                        Previous
                      </button>

                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (page <= 3) {
                          pageNum = i + 1;
                        } else if (page >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = page - 2 + i;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-2.5 py-1 rounded border border-gray-300 text-sm ${
                              page === pageNum
                                ? "text-white bg-blue-500"
                                : "text-gray-700 bg-white hover:bg-gray-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className={`px-2.5 py-1 rounded border border-gray-300 text-sm ${
                          page === totalPages
                            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                            : "text-gray-700 bg-white hover:bg-gray-50"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <SubcategoryModal
        open={modal.type === "add" || modal.type === "edit"}
        type={modal.type}
        level={modal.payload?.level}
        ids={modal.payload?.ids}
        categoryOptions={catOptions}
        currentName={modal.type === "edit" ? getName(modal.payload?.level, modal.payload?.ids) : ""}
        showCategorySelect={modal.type === "add" && modal.payload?.fromButton}
        onSave={handleModalSave}
        onCancel={() => setModal({ type: null, payload: null })}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={modal.type === "delete"}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setModal({ type: null, payload: null })}
      />

      {/* Block/Unblock Confirmation Modal */}
      <BlockConfirmModal
        open={blockConfirm.open}
        isBlocked={blockConfirm.isBlocked}
        onConfirm={handleBlockConfirm}
        onCancel={() => setBlockConfirm({ open: false, id: null, isBlocked: false })}
      />

      {/* Offer Modal */}
      <OfferModal
        open={offerModal.open}
        currentOffer={offerModal.currentOffer}
        onChange={(value) => setOfferModal((prev) => ({ ...prev, currentOffer: value }))}
        onSave={handleOfferSave}
        onCancel={() => setOfferModal({ open: false, id: null, currentOffer: "" })}
      />
    </div>
  );
}
