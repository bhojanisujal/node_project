import React, { useEffect, useState } from "react";
import HOC from "../compoent/HOC";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import sound from "../sound/sample_soft_alert02_kofi_by_miraclei-360125.mp3";
import { PiExclamationMarkBold } from "react-icons/pi";

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const BASE_URL = "http://localhost:4000";

  // Modal control and form fields
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [productData, setProductData] = useState({
    productName: "",
    slug: "",
    sku: "",
    stock: 100,
    type: "weight",
    isfeatured: false,
    isActive: false,
    category: "",
    productVideo: [],
  });
  const [variantInputs, setVariantInputs] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [certifications, setCertifications] = useState({
    fssai: false,
    iso: false,
    gmp: false,
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/product/get`);
      setProductsData(res.data.data);
    } catch (err) {
      setError("Failed to load products. " + err.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/category/getall`);
      setCategories(res.data.data);
    } catch (err) {
      setError("Failed to load categories. " + err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await axios.delete(`${BASE_URL}/api/product/delete/${id}`);
        fetchProducts();
      } catch {
        setError("Delete failed.");
      }
    }
  };

  const handleUpdate = (id) => {
    const product = productsData.find((p) => p._id === id);
    if (product) {
      setEditMode(true);
      setEditingProduct(product);
      setProductData({
        productName: product.productName || "",
        slug: product.slug || "",
        sku: product.sku || "",
        stock: product.stock || 100,
        type: product.type || "weight",
        isfeatured: product.isfeatured || false,
        isActive: product.isActive || false,
        category: product.category?._id || product.category || "",
        productVideo: product.productVideo || [],
      });
      setBenefits(product.benefits || [{ icon: "", description: "" }]);
      setVariantInputs(
        product.variants || [
          {
            label: "",
            sku: "",
            originalPrice: 0,
            discountPrice: 0,
            discountPercent: 0,
            stockAvailability: 0,
            isActive: true,
            productImage: [],
            attribute: { label: "", quantity: 0 },
          },
        ]
      );
      setCertifications(product.certifications || { fssai: false, iso: false, gmp: false });
      setShowModal(true);
    }
  };

  const onChange = (field, value) => {
    setProductData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCertChange = (key) => {
    const updated = { ...certifications, [key]: !certifications[key] };
    setCertifications(updated);
    onChange("certifications", updated);
  };

  const handleCreateOrUpdateProduct = async () => {
    setCreateLoading(true);
    try {
      const formData = new FormData();

      // Main product fields
      formData.append("productName", productData.productName || "");
      formData.append("slug", productData.slug || "");
      formData.append("sku", productData.sku || "");
      formData.append("stock", productData.stock || 0);
      formData.append("type", productData.type || "weight");
      formData.append("isfeatured", productData.isfeatured || false);
      formData.append("isActive", productData.isActive || false);
      formData.append("category", productData.category || "");

      // Benefits
      const cleanBenefits = benefits.map((benefit, index) => ({
        icon: benefit.icon instanceof File ? `benefit_icon_${index}` : benefit.icon || "",
        description: benefit.description || "",
      }));
      cleanBenefits.forEach((benefit, index) => {
        if (benefits[index].icon instanceof File) {
          formData.append(`benefit_icon_${index}`, benefits[index].icon);
        }
      });
      formData.append("benefits", JSON.stringify(cleanBenefits));

      // Certifications
      formData.append("certifications", JSON.stringify(certifications));

      // Product video
      if (productData.productVideo && productData.productVideo.length) {
        productData.productVideo.forEach((file) => {
          formData.append("productVideo", file);
        });
      }

      // Variants
      const cleanVariants = variantInputs.map((variant, index) => ({
        label: variant.label || "",
        sku: variant.sku || "",
        originalPrice: variant.originalPrice || 0,
        discountPrice: variant.discountPrice || 0,
        discountPercent: variant.discountPercent || 0,
        stockAvailability: variant.stockAvailability || 0,
        isActive: variant.isActive || false,
        productImage: variant.productImage
          .filter((img) => typeof img === "string")
          .concat(variant.productImage.filter((img) => img instanceof File).map((_, i) => `variant_image_${index}_${i}`)),
        attribute: {
          label: variant.attribute?.label || "",
          quantity: variant.attribute?.quantity || 0,
        },
      }));

      cleanVariants.forEach((variant, index) => {
        if (variantInputs[index].productImage) {
          variantInputs[index].productImage.forEach((file, i) => {
            if (file instanceof File) {
              formData.append(`variant_image_${index}_${i}`, file);
            }
          });
        }
      });
      formData.append("variants", JSON.stringify(cleanVariants));

      // Submit to server
      const url = editMode
        ? `${BASE_URL}/api/product/update/${editingProduct._id}`
        : `${BASE_URL}/api/product/create`;
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message || editMode ? "Product updated!" : "Product created!");
      new Audio(sound).play();
      setShowModal(false);
      fetchProducts();

      // Reset form
      setProductData({
        productName: "",
        slug: "",
        sku: "",
        stock: 100,
        type: "weight",
        isfeatured: false,
        isActive: false,
        category: "",
        productVideo: [],
      });
      setBenefits([{ icon: "", description: "" }]);
      setCertifications({ fssai: false, iso: false, gmp: false });
      setVariantInputs([]);
    } catch (err) {
      console.error("Submit failed:", err.response || err.message);
      setError("Failed to submit product. See console.");
    } finally {
      setCreateLoading(false);
    }
  };

  const filteredProducts =
    selectedStatus === "all"
      ? productsData
      : productsData.filter((prod) =>
          selectedStatus === "Active" ? prod.isActive : !prod.isActive
        );

  const getImageUrl = (path) => {
    if (!path) return "";
    return `${BASE_URL}/${path.replace(/^public\//, "")}`;
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
            Product Management
          </h1>
          <p className="text-gray-400">Manage and organize products.</p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setEditMode(false);
            setProductData({
              productName: "",
              slug: "",
              sku: "",
              stock: 100,
              type: "weight",
              isfeatured: false,
              isActive: false,
              category: "",
              productVideo: [],
            });
            setBenefits([{ icon: "", description: "" }]);
            setCertifications({ fssai: false, iso: false, gmp: false });
            setVariantInputs([
              {
                label: "",
                sku: "",
                originalPrice: 0,
                discountPrice: 0,
                discountPercent: 0,
                stockAvailability: 0,
                isActive: true,
                productImage: [],
                attribute: { label: "", quantity: 0 },
              },
            ]);
            setShowModal(true);
          }}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded shadow"
        >
          + Add Product
        </button>
      </div>

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
            Showing {filteredProducts.length} of {productsData.length}
          </p>
        </div>
      </div>

      <div className="rounded-xl p-6 backdrop-blur-3xl overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-6 py-4 text-gray-300">Product</th>
              <th className="px-6 py-4 text-gray-300">Category</th>
              <th className="px-6 py-4 text-gray-300">Price</th>
              <th className="px-6 py-4 text-gray-300">Status</th>
              <th className="px-6 py-4 text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4 flex items-center space-x-3">
                  {product.variants?.[0]?.productImage?.[0] ? (
                    <img
                      src={getImageUrl(product.variants[0].productImage[0])}
                      alt={product.productName}
                      className="w-10 h-10 rounded"
                    />
                  ) : (
                    <PiExclamationMarkBold className="w-10 h-10 rounded text-red-600" />
                  )}
                  <div>
                    <span className="text-white block">
                      {product.productName}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {product.slug}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-white">
                  {product.category?.Categoryname || "N/A"}
                </td>
                <td className="px-6 py-4 text-white">
                  {product.variants?.[0]?.discountPrice ? (
                    <>
                      <span className="line-through text-gray-400 mr-2">
                        ${product.variants[0].originalPrice}
                      </span>
                      <span className="text-cyan-400">
                        ${product.variants[0].discountPrice}
                      </span>
                    </>
                  ) : (
                    `$${product.variants?.[0]?.originalPrice || "N/A"}`
                  )}
                </td>
                <td className="px-6 py-4 text-white">
                  {product.isActive ? "Active" : "Inactive"}
                </td>
                <td className="px-6 py-4">
                  <button
                    className="text-cyan-400 hover:text-cyan-300 mr-3"
                    onClick={() => handleUpdate(product._id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDelete(product._id)}
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] scrollbar-hide">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-2xl space-y-4 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-3 right-4 text-white text-xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h2 className="text-xl text-white font-bold">
              {editMode ? "Update Product" : "Create Product"}
            </h2>

            <input
              type="text"
              placeholder="Product Name"
              value={productData.productName || ""}
              onChange={(e) => onChange("productName", e.target.value)}
              className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600"
            />
            <input
              type="text"
              placeholder="Slug"
              value={productData.slug || ""}
              onChange={(e) => onChange("slug", e.target.value)}
              className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600"
            />
            <input
              type="text"
              placeholder="SKU"
              value={productData.sku || ""}
              onChange={(e) => onChange("sku", e.target.value)}
              className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600"
            />
            <input
              type="number"
              placeholder="Stock"
              value={productData.stock || 100}
              onChange={(e) => onChange("stock", e.target.value)}
              className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600"
            />

            <select
              value={productData.type || "weight"}
              onChange={(e) => onChange("type", e.target.value)}
              className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600"
            >
              <option value="weight">Weight</option>
              <option value="quantity">Quantity</option>
            </select>

            <div className="flex gap-4">
              <label className="text-white flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={productData.isfeatured || false}
                  onChange={(e) => onChange("isfeatured", e.target.checked)}
                />{" "}
                Featured
              </label>
              <label className="text-white flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={productData.isActive || false}
                  onChange={(e) => onChange("isActive", e.target.checked)}
                />{" "}
                Active
              </label>
            </div>

            <select
              value={productData.category || ""}
              onChange={(e) => onChange("category", e.target.value)}
              className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.Categoryname}
                </option>
              ))}
            </select>

            <div className="space-y-2">
              <p className="text-white font-semibold">Benefits</p>
              {benefits.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 gap-2 items-center mb-2"
                >
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      className="border p-1 rounded w-full"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const updated = [...benefits];
                        updated[index].icon = file || "";
                        setBenefits(updated);
                      }}
                    />
                    {item.icon && typeof item.icon === "string" && (
                      <img
                        src={getImageUrl(item.icon)}
                        alt="Benefit icon"
                        className="w-10 h-10 mt-2"
                      />
                    )}
                  </div>
                  <input
                    type="text"
                    className="border p-1 rounded"
                    placeholder="Description"
                    value={item.description || ""}
                    onChange={(e) => {
                      const updated = [...benefits];
                      updated[index].description = e.target.value;
                      setBenefits(updated);
                    }}
                  />
                  <button
                    className="text-red-400 text-sm"
                    onClick={() => {
                      const updated = benefits.filter((_, i) => i !== index);
                      setBenefits(updated);
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                className="text-sm text-cyan-400 underline"
                onClick={() => {
                  setBenefits([...benefits, { icon: "", description: "" }]);
                }}
              >
                + Add Benefit
              </button>
            </div>

            <div className="flex gap-4">
              {Object.keys(certifications).map((key) => (
                <label
                  key={key}
                  className="text-white flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={certifications[key]}
                    onChange={() => handleCertChange(key)}
                  />{" "}
                  {key.toUpperCase()}
                </label>
              ))}
            </div>

            <p className="text-white font-semibold">Video</p>
            <input
              type="file"
              placeholder="Video"
              multiple
              accept="video/*"
              onChange={(e) => onChange("productVideo", Array.from(e.target.files))}
              className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600"
            />
            {productData.productVideo &&
              productData.productVideo.length > 0 &&
              productData.productVideo.map(
                (video, index) =>
                  typeof video === "string" && (
                    <video
                      key={index}
                      src={getImageUrl(video)}
                      controls
                      className="w-20 h-20 mt-2"
                    />
                  )
              )}

            <div className="space-y-4">
              <p className="text-white font-semibold">Variants</p>
              {variantInputs.map((variant, index) => (
                <div
                  key={index}
                  className="bg-slate-700 p-3 rounded space-y-2"
                >
                  <input
                    type="text"
                    placeholder="Variant Label"
                    value={variant.label || ""}
                    onChange={(e) => {
                      const updated = [...variantInputs];
                      updated[index].label = e.target.value;
                      setVariantInputs(updated);
                      onChange("variants", updated);
                    }}
                    className="w-full bg-slate-600 text-white p-2 rounded border border-slate-500"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Attribute Label"
                      value={variant.attribute?.label || ""}
                      onChange={(e) => {
                        const updated = [...variantInputs];
                        updated[index].attribute = {
                          ...updated[index].attribute,
                          label: e.target.value,
                        };
                        setVariantInputs(updated);
                        onChange("variants", updated);
                      }}
                      className="bg-slate-600 text-white p-2 rounded border border-slate-500"
                    />
                    <input
                      type="number"
                      placeholder="Attribute Quantity"
                      value={variant.attribute?.quantity || ""}
                      onChange={(e) => {
                        const updated = [...variantInputs];
                        updated[index].attribute = {
                          ...updated[index].attribute,
                          quantity: parseInt(e.target.value) || 0,
                        };
                        setVariantInputs(updated);
                        onChange("variants", updated);
                      }}
                      className="bg-slate-600 text-white p-2 rounded border border-slate-500"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Variant SKU"
                    value={variant.sku || ""}
                    onChange={(e) => {
                      const updated = [...variantInputs];
                      updated[index].sku = e.target.value;
                      setVariantInputs(updated);
                      onChange("variants", updated);
                    }}
                    className="w-full bg-slate-600 text-white p-2 rounded border border-slate-500"
                  />
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const updated = [...variantInputs];
                      updated[index].productImage = [
                        ...(updated[index].productImage || []).filter(
                          (img) => typeof img === "string"
                        ),
                        ...Array.from(e.target.files),
                      ];
                      setVariantInputs(updated);
                      onChange("variants", updated);
                    }}
                    className="w-full bg-slate-600 text-white p-2 rounded border border-slate-500"
                  />
                  {variant.productImage &&
                    variant.productImage.length > 0 &&
                    variant.productImage.map(
                      (img, imgIndex) =>
                        typeof img === "string" && (
                          <img
                            key={imgIndex}
                            src={getImageUrl(img)}
                            alt="Variant"
                            className="w-10 h-10 mt-2"
                          />
                        )
                    )}
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Original Price"
                      value={variant.originalPrice || ""}
                      onChange={(e) => {
                        const updated = [...variantInputs];
                        updated[index].originalPrice = parseFloat(e.target.value) || 0;
                        setVariantInputs(updated);
                        onChange("variants", updated);
                      }}
                      className="bg-slate-600 text-white p-2 rounded border border-slate-500"
                    />
                    <input
                      type="number"
                      placeholder="Discount Price"
                      value={variant.discountPrice || ""}
                      onChange={(e) => {
                        const updated = [...variantInputs];
                        updated[index].discountPrice = parseFloat(e.target.value) || 0;
                        setVariantInputs(updated);
                        onChange("variants", updated);
                      }}
                      className="bg-slate-600 text-white p-2 rounded border border-slate-500"
                    />
                  </div>
                  <input
                    type="number"
                    placeholder="Discount Percent"
                    value={variant.discountPercent || ""}
                    onChange={(e) => {
                      const updated = [...variantInputs];
                      updated[index].discountPercent = parseFloat(e.target.value) || 0;
                      setVariantInputs(updated);
                      onChange("variants", updated);
                    }}
                    className="w-full bg-slate-600 text-white p-2 rounded border border-slate-500"
                  />
                  <input
                    type="number"
                    placeholder="Stock Availability"
                    value={variant.stockAvailability || ""}
                    onChange={(e) => {
                      const updated = [...variantInputs];
                      updated[index].stockAvailability = parseInt(e.target.value) || 0;
                      setVariantInputs(updated);
                      onChange("variants", updated);
                    }}
                    className="w-full bg-slate-600 text-white p-2 rounded border border-slate-500"
                  />
                  <label className="flex items-center space-x-2 text-white">
                    <input
                      type="checkbox"
                      checked={variant.isActive ?? true}
                      onChange={(e) => {
                        const updated = [...variantInputs];
                        updated[index].isActive = e.target.checked;
                        setVariantInputs(updated);
                        onChange("variants", updated);
                      }}
                    />
                    <span>Active</span>
                  </label>
                  <button
                    className="text-red-400 text-sm"
                    onClick={() => {
                      const updated = variantInputs.filter((_, i) => i !== index);
                      setVariantInputs(updated);
                      onChange("variants", updated);
                    }}
                  >
                    Remove Variant
                  </button>
                </div>
              ))}
              <button
                className="text-sm text-cyan-400 underline"
                onClick={() => {
                  const updated = [
                    ...variantInputs,
                    {
                      label: "",
                      sku: "",
                      originalPrice: 0,
                      discountPrice: 0,
                      discountPercent: 0,
                      stockAvailability: 0,
                      isActive: true,
                      productImage: [],
                      attribute: { label: "", quantity: 0 },
                    },
                  ];
                  setVariantInputs(updated);
                  onChange("variants", updated);
                }}
              >
                + Add Variant
              </button>
            </div>

            <button
              onClick={handleCreateOrUpdateProduct}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded"
              disabled={createLoading}
            >
              {createLoading
                ? editMode
                  ? "Updating..."
                  : "Creating..."
                : editMode
                ? "Update"
                : "Create"}
            </button>
          </div>
        </div>
      )}
      <button className="text-white" onClick={() => new Audio(sound).play()}>
        Click to Play Sound
      </button>
    </div>
  );
};

export default HOC(Products); 