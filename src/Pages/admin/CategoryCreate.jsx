import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CategoryCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function onFiles(fs) {
    if (!fs || !fs[0]) return;
    setFile(fs[0]);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!name || !file) {
      toast.error("Please enter category name and choose an image.");
      return;
    }
    navigate("/admin/categories");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add New Category</h1>
      <form onSubmit={onSubmit} className="bg-white rounded-lg shadow border border-gray-200 p-6 max-w-xl">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Fashion"
            />
          </div>

          <div>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); onFiles(e.dataTransfer.files); }}
              className={`relative mt-2 border-2 border-dashed rounded-md p-6 text-center ${dragOver ? "border-blue-400 bg-blue-50" : "border-gray-300"}`}
            >
              {preview ? (
                <div className="flex items-center gap-3">
                  <img src={preview} alt="preview" className="w-20 h-20 rounded object-cover bg-gray-100" />
                  <div className="text-left text-sm text-gray-600 break-all">{file?.name}</div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6H16a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <div className="mt-2 text-sm">
                    <span className="text-gray-700">Click to upload</span> or drag and drop
                  </div>
                  <div className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max recommended 800×400)</div>
                </div>
              )}
              <input
                type="file"
                accept="image/png,image/jpeg,image/gif,image/svg+xml"
                onChange={(e) => onFiles(e.target.files)}
                className="absolute opacity-0 w-full h-full cursor-pointer"
                style={{ inset: 0 }}
                aria-label="Upload image"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6H16a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              PUBLISH AND VIEW
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
