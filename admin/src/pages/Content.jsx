import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { PiExclamationMarkBold } from 'react-icons/pi';
import HOC from '../compoent/HOC';

const Content = () => {
  // State for products and content items
  const [products, setProducts] = useState([]);
  const [contentItems, setContentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal and form states
  const [showModal, setShowModal] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProduct, setFilterProduct] = useState('');
  const [filterContentType, setFilterContentType] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Content form state
  const [content, setContent] = useState({
    productId: '',
    description: '',
    benefits: [{ title: '', desc: '' }],
    howtoUse: [{ step: '', desc: '' }],
    faqs: [{ que: '', ans: '' }],
    status: 'Draft'
  });

  const contentTypes = ['Description', 'FAQ', 'How to Use', 'Benefits', 'Specifications', 'Reviews', 'Warranty'];
  const statuses = ['Draft', 'Published', 'Archived'];

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const productsRes = await axios.get('http://localhost:4000/api/product/get');
      setProducts(productsRes.data.data);
    } catch (error) {
      console.log(error);
      setError('Failed to load products');
    }
  };

  // Fetch content
  const getAllContent = async () => {
    try {
      const contentRes = await axios.get('http://localhost:4000/api/content/getall');
      setContentItems([...contentRes.data.data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError('Failed to load content');
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllContent();
  }, []);

  // Filter content based on search and filters
  const filteredContent = contentItems?.filter((item) => {
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      item.productName?.toLowerCase().includes(searchTerm?.toLowerCase());
    const matchesProduct = !filterProduct || item.productId?.toString() === filterProduct;
    const matchesContentType = !filterContentType || item.contentType === filterContentType;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;

    return matchesSearch && matchesProduct && matchesContentType && matchesStatus;
  });

  // Helper functions for dynamic form fields
  const handleArrayChange = (field, index, key, value) => {
    const updated = [...content[field]];
    updated[index][key] = value;
    setContent({ ...content, [field]: updated });
  };

  const addField = (field) => {
    const empty = Object.keys(content[field][0])?.reduce((obj, k) => ({ ...obj, [k]: '' }), {});
    setContent({ ...content, [field]: [...content[field], empty] });
  };

  const removeField = (field, index) => {
    const updated = [...content[field]];
    updated.splice(index, 1);
    setContent({ ...content, [field]: updated });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const selectedProduct = products?.find(p => p._id.toString() === content.productId);
      
      const contentData = {
        productId: content?.productId,
        description: content?.description,
        benefits: content.benefits
          .filter(b => b.title && b.desc)
          .map(b => ({
            title: b.title,
            desc: b.desc,
            _id: b._id || undefined
          })),
        howtoUse: content.howtoUse
          .filter(h => h.step && h.desc)
          .map(h => ({
            step: h.step,
            desc: h.desc,
            _id: h._id || undefined
          })),
        faqs: content.faqs
          .filter(f => f.que && f.ans)
          .map(f => ({
            que: f.que,
            ans: f.ans,
            _id: f._id || undefined
          })),
        status: content?.status
      };

      if (editingContent) {
        // Update existing content
        const res = await axios.post(`http://localhost:4000/api/content/update/${editingContent._id}`, contentData);
        setContentItems(contentItems.map(item => 
          item._id === editingContent._id ? res.data : item
        ));
      } else {
        // Create new content
        const res = await axios.post('http://localhost:4000/api/content/create', contentData);
        setContentItems([...contentItems, res.data.data]);
      }
      getAllContent();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  // Edit content handler
  const handleEdit = (contentItem) => {
    setEditingContent(contentItem);
    setContent({
      productId: contentItem.productId._id || contentItem.productId,
      description: contentItem.description,
      benefits: contentItem.benefits?.length > 0
        ? contentItem.benefits.map(b => ({
            title: b.title,
            desc: b.desc,
            _id: b._id
          }))
        : [{ title: '', desc: '', _id: undefined }],
      howtoUse: contentItem.howtoUse?.length > 0
        ? contentItem.howtoUse.map(h => ({
            step: h.step,
            desc: h.desc,
            _id: h._id
          }))
        : [{ step: '', desc: '', _id: undefined }],
      faqs: contentItem.faqs?.length > 0
        ? contentItem.faqs.map(f => ({
            que: f.que,
            ans: f.ans,
            _id: f._id
          }))
        : [{ que: '', ans: '', _id: undefined }],
      status: contentItem.status || 'Draft'
    });
    setShowModal(true);
  };

  // Delete content handler
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        await axios.delete(`http://localhost:4000/api/content/delete/${id}`);
        setContentItems(contentItems.filter(item => item._id !== id));
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setContent({
      productId: '',
      description: '',
      benefits: [{ title: '', desc: '' }],
      howtoUse: [{ step: '', desc: '' }],
      faqs: [{ que: '', ans: '' }],
      status: 'Draft'
    });
    setEditingContent(null);
    setShowModal(false);
    setError(null);
  };

  // Helper functions for UI
  const getStatusColor = (status) => {
    switch (status) {
      case 'Published': return 'bg-emerald-500/20 text-emerald-400';
      case 'Draft': return 'bg-orange-500/20 text-orange-400';
      case 'Archived': return 'bg-slate-500/20 text-slate-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

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
            Content Management
          </h1>
          <p className="text-gray-400">Manage and organize product content</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded shadow"
        >
          + Add Content
        </button>
      </div>

      <div className="rounded-xl p-6 backdrop-blur-3xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-700/50 text-white p-2 pl-10 rounded border border-slate-600"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <select
              value={filterProduct}
              onChange={(e) => setFilterProduct(e.target.value)}
              className="bg-slate-700/50 text-white border border-slate-600 rounded-lg px-4 py-2"
            >
              <option value="">All Products</option>
              {products?.map(product => (
                <option key={product._id} value={product._id}>{product.name}</option>
              ))}
            </select>
            
            <select
              value={filterContentType}
              onChange={(e) => setFilterContentType(e.target.value)}
              className="bg-slate-700/50 text-white border border-slate-600 rounded-lg px-4 py-2"
            >
              <option value="">All Types</option>
              {contentTypes?.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-700/50 text-white border border-slate-600 rounded-lg px-4 py-2"
            >
              <option value="all">All Status</option>
              {statuses?.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-xl p-6 backdrop-blur-3xl overflow-x-auto">
        <table className="w-full">
         <thead className="bg-slate-700/50">
  <tr>
    <th className="px-6 py-4 text-gray-300 text-center">Image</th>
    <th className="px-6 py-4 text-gray-300 text-left">Product Name</th>
    <th className="px-6 py-4 text-gray-300 text-left">Actions</th>
  </tr>
</thead>
<tbody className="divide-y divide-slate-700/50">
  {filteredContent?.map((contentItem) => {
    const product = products.find(p => p._id === contentItem.productId?.toString()) || {};
    return (
      <tr key={contentItem._id} className="hover:bg-slate-700/20">
        {/* Image centered */}
        <td className="px-6 py-4 text-center">
          {product.productImage?.[0] ? (
            <img 
              src={`http://localhost:4000/ProductImages/${product.productImage[0]?.split('/')[3]}`}
              alt={product.productName}
              className="h-10 w-10 object-cover rounded-full mx-auto"
            />
          ) : (
            <PiExclamationMarkBold className="w-10 h-10 text-red-600 mx-auto" />
          )}
        </td>

        {/* Product name */}
        <td className="px-6 py-4 text-white">
          {product.productName || 'Unknown Product'}
        </td>

        {/* Actions */}
        <td className="px-6 py-4">
          <div className="flex space-x-2">
            <button
              className="text-cyan-400 hover:text-cyan-300"
              onClick={() => handleEdit(contentItem)}
              title="Edit"
            >
              <FaEdit />
            </button>
            <button
              className="text-red-400 hover:text-red-300"
              onClick={() => handleDelete(contentItem._id)}
              title="Delete"
            >
              <MdOutlineDeleteForever />
            </button>
          </div>
        </td>
      </tr>
    );
  })}
</tbody>


        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] scrollbar-hide">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-2xl space-y-4 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-3 right-4 text-white text-xl"
              onClick={resetForm}
            >
              ×
            </button>
            <h2 className="text-xl text-white font-bold">
              {editingContent ? "Update Content" : "Create Content"}
            </h2>

            {error && (
              <div className="bg-red-500/20 text-red-400 p-4 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Product *</label>
                <select
                  required
                  value={content.productId}
                  onChange={(e) => setContent({ ...content, productId: e.target.value })}
                  className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600"
                >
                  <option value="">-- Choose product --</option>
                  {products.map(p => (
                    <option key={p._id} value={p._id}>{p.productName}</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                <select
                  value={content.status}
                  onChange={(e) => setContent({ ...content, status: e.target.value })}
                  className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description *</label>
                <textarea
                  required
                  value={content.description}
                  onChange={(e) => setContent({ ...content, description: e.target.value })}
                  rows={3}
                  className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600"
                />
              </div>

              {/* Benefits */}
              <div className="border border-slate-700 rounded-lg p-4 bg-slate-700/50">
                <label className="block text-sm font-semibold text-gray-300 mb-2">Benefits</label>
                {content.benefits.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 mb-3 items-end">
                    <div className="col-span-5">
                      <input
                        type="text"
                        placeholder="Title"
                        value={item.title}
                        onChange={(e) => handleArrayChange('benefits', index, 'title', e.target.value)}
                        className="w-full bg-slate-600 text-white p-2 rounded border border-slate-500"
                      />
                    </div>
                    <div className="col-span-5">
                      <input
                        type="text"
                        placeholder="Description"
                        value={item.desc}
                        onChange={(e) => handleArrayChange('benefits', index, 'desc', e.target.value)}
                        className="w-full bg-slate-600 text-white p-2 rounded border border-slate-500"
                      />
                    </div>
                    <div className="col-span-2">
                      {index > 0 && (
                        <button 
                          type="button" 
                          onClick={() => removeField('benefits', index)} 
                          className="w-full bg-red-500/20 text-red-400 p-2 rounded hover:bg-red-500/30"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => addField('benefits')} 
                  className="mt-2 text-sm text-cyan-400 underline"
                >
                  + Add Benefit
                </button>
              </div>

              {/* How to Use */}
              <div className="border border-slate-700 rounded-lg p-4 bg-slate-700/50">
                <label className="block text-sm font-semibold text-gray-300 mb-2">How to Use</label>
                {content.howtoUse.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 mb-3 items-end">
                    <div className="col-span-5">
                      <input
                        type="text"
                        placeholder="Step"
                        value={item.step}
                        onChange={(e) => handleArrayChange('howtoUse', index, 'step', e.target.value)}
                        className="w-full bg-slate-600 text-white p-2 rounded border border-slate-500"
                      />
                    </div>
                    <div className="col-span-5">
                      <input
                        type="text"
                        placeholder="Description"
                        value={item.desc}
                        onChange={(e) => handleArrayChange('howtoUse', index, 'desc', e.target.value)}
                        className="w-full bg-slate-600 text-white p-2 rounded border border-slate-500"
                      />
                    </div>
                    <div className="col-span-2">
                      {index > 0 && (
                        <button 
                          type="button" 
                          onClick={() => removeField('howtoUse', index)} 
                          className="w-full bg-red-500/20 text-red-400 p-2 rounded hover:bg-red-500/30"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => addField('howtoUse')} 
                  className="mt-2 text-sm text-cyan-400 underline"
                >
                  + Add Step
                </button>
              </div>

              {/* FAQs */}
              <div className="border border-slate-700 rounded-lg p-4 bg-slate-700/50">
                <label className="block text-sm font-semibold text-gray-300 mb-2">FAQs</label>
                {content.faqs.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 mb-3 items-end">
                    <div className="col-span-5">
                      <input
                        type="text"
                        placeholder="Question"
                        value={item.que}
                        onChange={(e) => handleArrayChange('faqs', index, 'que', e.target.value)}
                        className="w-full bg-slate-600 text-white p-2 rounded border border-slate-500"
                      />
                    </div>
                    <div className="col-span-5">
                      <input
                        type="text"
                        placeholder="Answer"
                        value={item.ans}
                        onChange={(e) => handleArrayChange('faqs', index, 'ans', e.target.value)}
                        className="w-full bg-slate-600 text-white p-2 rounded border border-slate-500"
                      />
                    </div>
                    <div className="col-span-2">
                      {index > 0 && (
                        <button 
                          type="button" 
                          onClick={() => removeField('faqs', index)} 
                          className="w-full bg-red-500/20 text-red-400 p-2 rounded hover:bg-red-500/30"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => addField('faqs')} 
                  className="mt-2 text-sm text-cyan-400 underline"
                >
                  + Add FAQ
                </button>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded font-medium"
                >
                  {editingContent ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HOC(Content);