import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useGetCategoriesByLevelQuery } from "../../store/Api/admin/category";
import ProductVariants from "../../components/admin/ProductVariants";

export default function AddProduct() {
  const navigate = useNavigate();

  // --- Common Details ---
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [catId, setCatId] = useState("");
  const [subId, setSubId] = useState("");
  const [subsubId, setSubsubId] = useState("");
  const [brand, setBrand] = useState("");
  const [isFeatured, setIsFeatured] = useState("");
  const [hasVariant, setHasVariant] = useState(false);

  // --- Simple Product Details (if hasVariant === false) ---
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [stock, setStock] = useState("");
  const [discount, setDiscount] = useState("");

  // Common Images
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  // --- Variants ---
  const [variants, setVariants] = useState([
    {
      id: Date.now(),
      attributeValue: "",
      price: "",
      oldPrice: "",
      stock: "",
      discount: "",
    },
  ]);

  // Fetch categories dynamically
  const { data: rootData } = useGetCategoriesByLevelQuery({ level: "first" });
  const { data: subData } = useGetCategoriesByLevelQuery({ level: "second" });
  const { data: thirdData } = useGetCategoriesByLevelQuery({ level: "third" });

  const categoryOptions = useMemo(() => rootData?.categories || [], [rootData]);

  const subOptions = useMemo(() => {
    if (!catId || !subData?.categories) return [];
    return subData.categories.filter((s) => s.parentId === catId);
  }, [catId, subData]);

  const subsubOptions = useMemo(() => {
    if (!subId || !thirdData?.categories) return [];
    return thirdData.categories.filter((ss) => ss.parentId === subId);
  }, [subId, thirdData]);

  // Determine attribute label and options based on category
  const { attributeLabel, variantOptions } = useMemo(() => {
    if (!catId) {
      return {
        attributeLabel: "Size / Attribute",
        variantOptions: ["Standard"],
      };
    }

    const cat = categoryOptions.find((c) => c._id === catId);
    const catName = cat?.name?.toLowerCase() || "";

    if (catName.includes("fashion") || catName.includes("clothing")) {
      return {
        attributeLabel: "Size (Clothing)",
        variantOptions: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
      };
    }
    if (catName.includes("footwear") || catName.includes("shoe")) {
      return {
        attributeLabel: "Size (Footwear)",
        variantOptions: [
          "UK 3",
          "UK 4",
          "UK 5",
          "UK 6",
          "UK 7",
          "UK 8",
          "UK 9",
          "UK 10",
          "UK 11",
          "UK 12",
        ],
      };
    }
    if (catName.includes("cosmetic") || catName.includes("beauty")) {
      return {
        attributeLabel: "Volume",
        variantOptions: ["10ml", "30ml", "50ml", "100ml", "200ml", "500ml", "1L"],
      };
    }

    // Default fallback
    return {
      attributeLabel: "Attribute",
      variantOptions: ["Option 1", "Option 2", "Option 3"],
    };
  }, [catId, categoryOptions]);

  // --- Image Handlers ---
  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  function onFileInput(fs) {
    if (!fs || !fs.length) return;
    const arr = Array.from(fs).slice(0, 6);
    setFiles((prev) => [...prev, ...arr].slice(0, 6));
  }

  function removeImage(i) {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
  }

  // --- Variant Handlers ---
  function addVariant() {
    setVariants((prev) => [
      ...prev,
      {
        id: Date.now(),
        attributeValue: "",
        price: "",
        oldPrice: "",
        stock: "",
        discount: "",
      },
    ]);
  }

  function removeVariant(id) {
    if (variants.length === 1) {
      toast.error("At least one variant is required.");
      return;
    }
    setVariants((prev) => prev.filter((v) => v.id !== id));
  }

  function updateVariant(id, field, value) {
    setVariants((prev) => prev.map((v) => (v.id === id ? { ...v, [field]: value } : v)));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !catId) {
      toast.error("Please complete required common fields.");
      return;
    }

    // Validate Images (Min 3)
    if (files.length < 3) {
      toast.error("Please upload at least 3 images.");
      return;
    }

    // Validate based on hasVariant
    if (hasVariant) {
      for (const v of variants) {
        if (!v.attributeValue) {
          toast.error("Please select an attribute for all variants.");
          return;
        }
        if (!v.price || !v.stock) {
          toast.error("Please complete price and stock for all variants.");
          return;
        }
      }
    } else {
      // Simple product validation
      if (!price || !stock) {
        toast.error("Please complete price and stock for the product.");
        return;
      }
    }

    const payload = {
      name,
      description,
      catId,
      subId,
      subsubId,
      brand,
      isFeatured,
      hasVariant,
      files,
      ...(hasVariant ? { variants } : { price, oldPrice, stock, discount }),
    };

    console.log("Submitting Product:", payload);
    toast.success("Product created (Mock)!");
    navigate("/admin/products");
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Add Product {hasVariant ? "(Multi-Variant)" : "(Simple)"}
        </h1>
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        {/* --- Section 1: Common Details --- */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Common Details</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write a short description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={catId}
                onChange={(e) => {
                  setCatId(e.target.value);
                  setSubId("");
                  setSubsubId("");
                }}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
              >
                <option value="">Select</option>
                {categoryOptions.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sub Category</label>
              <select
                value={subId}
                onChange={(e) => {
                  setSubId(e.target.value);
                  setSubsubId("");
                }}
                disabled={!catId}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white disabled:bg-gray-50"
              >
                <option value="">Select</option>
                {subOptions.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Third Level</label>
              <select
                value={subsubId}
                onChange={(e) => setSubsubId(e.target.value)}
                disabled={!subId}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white disabled:bg-gray-50"
              >
                <option value="">Select</option>
                {subsubOptions.map((ss) => (
                  <option key={ss._id} value={ss._id}>
                    {ss.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Brand</label>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Brand name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Is Featured?</label>
              <select
                value={isFeatured}
                onChange={(e) => setIsFeatured(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Has Variants?</label>
              <select
                value={hasVariant ? "yes" : "no"}
                onChange={(e) => setHasVariant(e.target.value === "yes")}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>

          {/* Common Images Upload */}
          <div>
            <div className="text-sm font-semibold text-gray-800 mb-2">Product Images</div>
            <p className="text-xs text-gray-500 mb-3">
              Upload images common to this product (Minimum 3 required).
            </p>
            {previews.length > 0 && (
              <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {previews.map((src, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={src}
                      alt="preview"
                      className="w-full h-32 object-cover rounded border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 p-1 rounded bg-black/60 text-white opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 8.586l4.95-4.95 1.414 1.415L11.414 10l4.95 4.95-1.414 1.414L10 11.414l-4.95 4.95-1.414-1.414L8.586 10 3.636 5.05l1.414-1.414L10 8.586z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                onFileInput(e.dataTransfer.files);
              }}
              className={`relative border-2 border-dashed rounded-md p-6 text-center ${
                dragOver ? "border-blue-400 bg-blue-50" : "border-gray-300"
              }`}
            >
              <div className="flex flex-col items-center text-gray-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6H16a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <div className="mt-2 text-sm">
                  <span className="text-gray-700">Click to upload</span> or drag and drop
                </div>
                <div className="text-xs text-gray-500">PNG, JPG, GIF (Min 3 images)</div>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => onFileInput(e.target.files)}
                className="absolute opacity-0 w-full h-full cursor-pointer"
                style={{ inset: 0 }}
              />
            </div>
          </div>
        </div>

        {/* --- Section 2: Variants OR Simple Product Fields --- */}
        {hasVariant ? (
          <ProductVariants
            variants={variants}
            addVariant={addVariant}
            removeVariant={removeVariant}
            updateVariant={updateVariant}
            attributeLabel={attributeLabel}
            variantOptions={variantOptions}
          />
        ) : (
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Pricing & Stock</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="0.00"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Old Price</label>
                <input
                  type="number"
                  value={oldPrice}
                  onChange={(e) => setOldPrice(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="0.00"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Stock</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Qty"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Discount %</label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="%"
                  min="0"
                  max="90"
                />
              </div>
            </div>
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 text-lg font-medium shadow-sm"
          >
            SAVE PRODUCT
          </button>
        </div>
      </form>
    </div>
  );
}
