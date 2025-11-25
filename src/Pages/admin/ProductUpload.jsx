import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useGetCategoriesByLevelQuery } from "../../store/Api/admin/category";

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductUpload() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [catId, setCatId] = useState("");
  const [subId, setSubId] = useState("");
  const [subsubId, setSubsubId] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [isFeatured, setIsFeatured] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [discount, setDiscount] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [dragOver, setDragOver] = useState(false);

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

  function onSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !catId || !price) {
      toast.error("Please complete required fields.");
      return;
    }
    navigate("/admin/products");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add Product</h1>
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write a short description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Category</label>
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
              <label className="block text-sm font-medium text-gray-700">
                Product Sub Category
              </label>
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
              <label className="block text-sm font-medium text-gray-700">
                Product Third Level Category
              </label>
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
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Old Price</label>
              <input
                type="number"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="0.00"
                min="0"
                step="0.01"
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
              <label className="block text-sm font-medium text-gray-700">Product Stock</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Quantity"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Brand</label>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Brand name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Discount</label>
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
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Size</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
              >
                <option value="">Select</option>
                {sizeOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="text-sm font-semibold text-gray-800">Images</div>
          <p className="text-xs text-gray-500 mt-1 mb-3">
            Images should be cropped and resized properly before upload.
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
              <div className="text-xs text-gray-500">PNG, JPG, GIF (up to 6 images)</div>
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

        <div className="pt-2">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            ADD PRODUCT
          </button>
        </div>
      </form>
    </div>
  );
}
