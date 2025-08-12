// Keep everything as it is before...

import React, { useEffect, useState } from "react";
import HOC from "../compoent/HOC";
import axios from "axios";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Categories = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const BASE_URL = "http://localhost:4000";

  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [categoryImage, setCategoryImage] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewIcon, setPreviewIcon] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const fetchCategories = async () => {
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/api/category/getall`, {
        withCredentials: true,
      });
      setCategoriesData(res.data.data);
    } catch (error) {
      setError("Failed to load categories." + error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this category?")) {
      try {
        await axios.delete(`${BASE_URL}/api/category/delete/${id}`, {
          withCredentials: true,
        });
        fetchCategories();
      } catch {
        setError("Delete failed.");
      }
    }
  };

  const handleCreateOrUpdateCategory = async () => {
    if (
      !categoryName ||
      !slug ||
      (!editMode && (!categoryIcon || !categoryImage))
    ) {
      setError("All fields are required.");
      return;
    }

    setCreateLoading(true);
    const formData = new FormData();
    formData.append("Categoryname", categoryName);
    formData.append("slug", slug);
    formData.append("isactiv", isActive);

    if (categoryIcon) {
      formData.append("Categoryicone", categoryIcon);
    }
    if (categoryImage) {
      formData.append("Categoryimage", categoryImage);
    }

    try {
      if (editMode) {
        formData.append("_id", editingId); // Include ID in form data
        await axios.post(
          `${BASE_URL}/api/category/update/${editingId}`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post(`${BASE_URL}/api/category/create`, formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setShowModal(false);
      setCategoryName("");
      setSlug("");
      setCategoryIcon(null);
      setCategoryImage(null);
      setPreviewIcon(null);
      setPreviewImage(null);
      setIsActive(true);
      setEditMode(false);
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      setError(editMode ? "Update failed." : "Create failed.");
    } finally {
      setCreateLoading(false);
    }
  };

  const getImageUrl = (path) => {
    if (!path) return "";
    return `${BASE_URL}/uploads/${path
      .replace("public\\", "")
      .replace(/\\/g, "/")}`;
  };

  const filteredCategories =
    selectedStatus === "all"
      ? categoriesData
      : categoriesData.filter((cat) =>
          selectedStatus === "Active" ? cat.isactiv : !cat.isactiv
        );

  const handleUpdate = (id) => {
    const cat = categoriesData.find((c) => c._id === id);
    if (cat) {
      setEditMode(true);
      setEditingId(id);
      setCategoryName(cat.Categoryname);
      setSlug(cat.slug);
      setIsActive(cat.isactiv);
      setCategoryIcon(null);
      setCategoryImage(null);
      setPreviewIcon(getImageUrl(cat.Categoryicone));
      setPreviewImage(getImageUrl(cat.Categoryimage));
      setShowModal(true);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/20 text-red-400 p-4 rounded-lg relative">
          {error}
          <button
            onClick={() => setError(null)}
            className="absolute top-2 right-2"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Category Management
          </h1>
          <p className="text-gray-400">
            Manage and organize content categories.
          </p>
        </div>
        <button
          onClick={() => {
            setEditMode(false);
            setCategoryName("");
            setSlug("");
            setCategoryIcon(null);
            setCategoryImage(null);
            setIsActive(true);
            setShowModal(true);
          }}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded shadow"
        >
          + Add Category
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6"></div>
      <div className="rounded-xl p-6 backdrop-blur-3xl">
        <div className="flex flex-col md:flex-row justify-between">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-cyan-300/10 text-white border border-slate-600 rounded-lg px-4 py-2"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <p className="text-gray-400">
            Showing {filteredCategories.length} of {categoriesData.length}
          </p>
        </div>
      </div>
      <div className="rounded-xl p-6 backdrop-blur-3xl overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-6 py-4 text-gray-300">Category</th>
              <th className="px-6 py-4 text-gray-300">Status</th>
              <th className="px-6 py-4 text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {filteredCategories.map((category) => (
              <tr key={category._id}>
                <td className="px-6 py-4 flex items-center space-x-3">
                  <img
                    src={getImageUrl(category.Categoryicone)}
                    alt="icon"
                    className="w-6 h-6"
                  />
                  <span className="text-white">{category.Categoryname}</span>
                </td>
                <td className="px-6 py-4 text-white">
                  {category.isactiv ? "Active" : "Inactive"}
                </td>
                <td className="px-6 py-4">
                  <button
                    className="text-cyan-400 hover:text-cyan-300"
                    onClick={() => handleUpdate(category._id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDelete(category._id)}
                  >
                    <MdOutlineDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-lg space-y-4 relative">
            <button
              className="absolute top-3 right-4 text-white text-xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h2 className="text-xl text-white font-bold">
              {editMode ? "Update Category" : "Create Category"}
            </h2>

            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
                setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
              }}
              className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600"
            />

            <input
              type="text"
              placeholder="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCategoryIcon(e.target.files[0])}
              className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCategoryImage(e.target.files[0])}
              className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600"
            />

            <select
              value={isActive ? "true" : "false"}
              onChange={(e) => setIsActive(e.target.value === "true")}
              className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            <button
              onClick={handleCreateOrUpdateCategory}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded"
              disabled={createLoading}
            >
              {createLoading
                ? editMode
                  ? "Updating..."
                  : "Creating..."
                : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HOC(Categories);
