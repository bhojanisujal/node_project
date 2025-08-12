import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaImage, FaVideo, FaFolder, FaSearch, FaList, FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import HOC from '../compoent/HOC';

const Media = () => {
    const [mediaItems, setMediaItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingMedia, setEditingMedia] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterType, setFilterType] = useState('');
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        type: 'image',
        category: 'product',
        tags: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 16;

    const categories = ['categoryImage', 'categoryIcon', 'product', 'benefit', 'ingredients', 'howToUse'];

    const getAllMedia = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/media/get');
            setMediaItems(response.data.data);
        } catch (error) {
            console.error('Error fetching media:', error);
        }
    };

    useEffect(() => {
        getAllMedia();
    }, []);

    const filteredMedia = mediaItems.filter(media => {
        const matchesSearch = media.originalname?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory ? media.category === filterCategory : true;
        const matchesType = filterType ? media.type === filterType : true;
        return matchesSearch && matchesCategory && matchesType;
    });

    const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);
    const currentItems = filteredMedia.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterCategory, filterType]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formDataToSend = new FormData();
        if (file) formDataToSend.append('file', file);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('type', formData.type);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('tags', formData.tags);

        try {
            if (editingMedia) {
                await axios.put(`http://localhost:4000/api/media/update/${editingMedia._id}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                await axios.post('http://localhost:4000/api/media/create', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            getAllMedia();
            resetForm();
        } catch (error) {
            console.error('Error saving media:', error.response?.data || error.message);
            alert(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleEdit = (media) => {
        setEditingMedia(media);
        setFormData({
            name: media.originalname || '',
            type: media.type || 'image',
            category: media.category || 'product',
            tags: media.tags?.join(', ') || ''
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this media item?')) {
            try {
                await axios.delete(`http://localhost:4000/api/media/remove/${id}`);
                getAllMedia();
            } catch (error) {
                console.error('Error deleting media:', error);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            type: 'image',
            category: 'product',
            tags: ''
        });
        setFile(null);
        setEditingMedia(null);
        setShowModal(false);
    };
    

    const renderPagination = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage, endPage;

        if (totalPages <= maxVisiblePages) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
            const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;
            
            if (currentPage <= maxPagesBeforeCurrent) {
                startPage = 1;
                endPage = maxVisiblePages;
            } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
                startPage = totalPages - maxVisiblePages + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - maxPagesBeforeCurrent;
                endPage = currentPage + maxPagesAfterCurrent;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`px-4 py-2 rounded-lg ${currentPage === i ? 'bg-sky-500 text-white' : 'bg-slate-700/10 backdrop-blur-lg text-gray-300 hover:bg-slate-600/10 backdrop-blur-lg'}`}
                >
                    {i}
                </button>
            );
        }

        return (
            <div className="flex items-center justify-center mt-6 pb-10">
                <nav className="flex items-center space-x-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-slate-700/10 backdrop-blur-lg text-gray-500 cursor-not-allowed' : 'bg-slate-700/10 backdrop-blur-lg text-gray-300 hover:bg-slate-600/10 backdrop-blur-lg'}`}
                    >
                        <FaArrowLeft />
                    </button>
                    
                    {startPage > 1 && (
                        <>
                            <button
                                onClick={() => setCurrentPage(1)}
                                className="px-4 py-2 rounded-lg bg-slate-700/10 backdrop-blur-lg text-gray-300 hover:bg-slate-600/10 backdrop-blur-lg"
                            >
                                1
                            </button>
                            {startPage > 2 && <span className="px-2 text-gray-400">...</span>}
                        </>
                    )}

                    {pages}

                    {endPage < totalPages && (
                        <>
                            {endPage < totalPages - 1 && <span className="px-2 text-gray-400">...</span>}
                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                className="px-4 py-2 rounded-lg bg-slate-700/10 backdrop-blur-lg text-gray-300 hover:bg-slate-600/10 backdrop-blur-lg"
                            >
                                {totalPages}
                            </button>
                        </>
                    )}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-slate-700/10 backdrop-blur-lg text-gray-500 cursor-not-allowed' : 'bg-slate-700/10 backdrop-blur-lg text-gray-300 hover:bg-slate-600/10 backdrop-blur-lg'}`}
                    >
                        <FaArrowRight />
                    </button>
                </nav>
            </div>
        );
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'product': return 'bg-blue-500/20 text-blue-400';
            case 'categoryImage': return 'bg-purple-500/20 text-purple-400';
            case 'categoryIcon': return 'bg-green-500/20 text-green-400';
            case 'benefit': return 'bg-yellow-500/20 text-yellow-400';
            case 'ingredients': return 'bg-red-500/20 text-red-400';
            case 'howToUse': return 'bg-teal-500/20 text-teal-400';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Media Management</h1>
                    <p className="text-gray-400">Manage your images, icons, and videos</p>
                </div>
           <button
  onClick={() => setShowModal(true)}
  className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 py-3 rounded-xl hover:from-cyan-600 hover:to-teal-600 transition duration-200 transform hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
>
  <FaImage className="text-lg" />
  <span className="font-medium text-base">Upload Media</span>
</button>
            </div>

            {/* Controls */}
            <div className="bg-slate-800/10 backdrop-blur-lg rounded-xl shadow-lg border-0 border-slate-700">
                <div className="p-6 border-b border-slate-700">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="relative flex-1 max-w-md">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <FaSearch />
                            </div>
                            <input
                                type="text"
                                placeholder="Search media..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full bg-slate-700/10 backdrop-blur-lg border-0 border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                        </div>

                        <div className="flex items-center space-x-3">
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="px-3 py-2 bg-slate-700/10 backdrop-blur-lg border-0 border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                            >
                                <option value="">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-700/10 backdrop-blur-lg">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Media</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">URL</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Uploaded</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {currentItems.map((media) => (
                                <tr key={media._id} className="hover:bg-slate-700/10 backdrop-blur-lg/50 transition-colors duration-150">
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden">
                                                {media.type === 'image' ? (
                                                    <img
                                                        src={media.url}
                                                        alt={media.originalname}
                                                        className="w-full h-full object-cover cursor-pointer"
                                                        onClick={() => setSelectedMedia(media)}
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-slate-800/10 backdrop-blur-lg">
                                                        <FaVideo className="text-xl text-gray-500" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-3 overflow-hidden">
                                                <div className="text-sm font-medium text-white truncate">{media.originalname}</div>
                                                <div className="text-sm text-gray-400">
                                                    {media.tags?.slice(0, 3).map((tag, index) => (
                                                        <span key={index} className="mr-1 px-1.5 py-0.5 text-xs bg-slate-600/10 backdrop-blur-lg text-gray-300 rounded-full">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {media.tags?.length > 3 && (
                                                        <span className="px-1.5 py-0.5 text-xs bg-slate-600/10 backdrop-blur-lg text-gray-300 rounded-full">
                                                            +{media.tags.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="text-sm text-gray-400 truncate max-w-xs">{media.url}</div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(media.category)} capitalize`}>
                                            {media.category}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-400 capitalize">
                                        {media.type}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-400">
                                        {new Date(media.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleEdit(media)}
                                                className="p-1.5 rounded hover:bg-slate-600/10 backdrop-blur-lg transition-colors duration-200 text-blue-400 hover:text-blue-300"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(media._id)}
                                                className="p-1.5 rounded hover:bg-slate-600/10 backdrop-blur-lg transition-colors duration-200 text-red-400 hover:text-red-300"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredMedia.length > itemsPerPage && renderPagination()}
            </div>

            {/* Add/Edit Modal */}
          {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800/10 backdrop-blur-lg rounded-xl p-6 w-full max-w-2xl mx-4 border-0 border-slate-700 shadow-xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-white">
                                {editingMedia ? 'Edit Media' : 'Upload New Media'}
                            </h2>
                            <button onClick={resetForm} className="p-1 rounded hover:bg-slate-700/10 backdrop-blur-lg transition-colors duration-200 text-gray-400 hover:text-white">
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Media Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 bg-slate-700/10 backdrop-blur-lg border-0 border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    placeholder="Enter media name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    {editingMedia ? 'Replace Media File' : 'Upload Media File *'}
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    className="w-full px-3 py-2 bg-slate-700/10 backdrop-blur-lg border-0 border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    required={!editingMedia}
                                />
                                {editingMedia && !file && (
                                    <p className="text-xs text-gray-400 mt-1">Leave empty to keep current file</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-700/10 backdrop-blur-lg border-0 border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    >
                                        <option value="image">Image</option>
                                        <option value="video">Video</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-700/10 backdrop-blur-lg border-0 border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    >
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    className="w-full px-3 py-2 bg-slate-700/10 backdrop-blur-lg border-0 border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    placeholder="tag1, tag2, tag3"
                                />
                            </div>

                            <div className="flex items-center space-x-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                                >
                                    {editingMedia ? 'Update Media' : 'Upload Media'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 px-4 py-2 bg-slate-700/10 backdrop-blur-lg hover:bg-slate-600/10 backdrop-blur-lg text-white rounded-lg transition-colors duration-200"
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

export default HOC(Media);