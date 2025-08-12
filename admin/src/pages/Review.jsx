import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaCheck, FaTimes, FaClock, FaSearch, FaStar } from 'react-icons/fa';
import HOC from '../compoent/HOC';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRating, setFilterRating] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const statuses = ['Pending', 'Approved', 'Rejected'];
  const ratings = [1, 2, 3, 4, 5];

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:4000/api/review/getall');
      const mappedReviews = response.data.data.map(review => ({
        id: review._id,
        productId: review.product?.$oid || 'N/A',
        productName: review.productName || 'Unknown Product',
        customerName: review.displayName || 'Anonymous',
        customerEmail: review.email || 'N/A',
        rating: review.count || 0,
        title: review.title || 'No Title',
        comment: review.content || 'No Comment',
        status: review.status ? review.status.charAt(0).toUpperCase() + review.status.slice(1).toLowerCase() : 'Pending',
        createdAt: review.createdAt?.$date || new Date().toISOString(),
        helpful: review.helpful || 0,
        verified: review.isApprove || false
      }));
      setReviews(mappedReviews);
    } catch (err) {
      setError('Failed to fetch reviews. Please try again.');
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (reviewId, newStatus) => {
    if (!reviewId) {
      setError('Review ID is undefined. Cannot update status.');
      return;
    }
    const apiStatus = newStatus === 'Pending' ? 'pending' : newStatus;
    try {
      await axios.post(`http://localhost:4000/api/review/update-status/${reviewId}`, { status: apiStatus });
      setReviews(reviews.map(review =>
        review.id === reviewId ? { ...review, status: newStatus } : review
      ));
      if (selectedReview && selectedReview.id === reviewId) {
        setSelectedReview({ ...selectedReview, status: newStatus });
      }
    } catch (err) {
      setError(`Failed to update review status to ${newStatus}. Please try again.`);
      console.error('Error updating status:', err.response?.data || err.message);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!reviewId) {
      setError('Review ID is undefined. Cannot delete review.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`http://localhost:4000/api/review/delete/${reviewId}`);
        setReviews(reviews.filter(review => review.id !== reviewId));
        setShowModal(false);
      } catch (err) {
        setError('Failed to delete review. Please try again.');
        console.error('Error deleting review:', err.response?.data || err.message);
      }
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleViewDetails = (review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'bg-emerald-500/20 text-emerald-400';
      case 'pending': return 'bg-amber-500/20 text-amber-400';
      case 'rejected': return 'bg-red-500/20 text-red-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return <FaCheck className="text-emerald-400" />;
      case 'pending': return <FaClock className="text-amber-400" />;
      case 'rejected': return <FaTimes className="text-red-400" />;
      default: return null;
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={index < rating ? 'text-yellow-400' : 'text-slate-600'}
      />
    ));
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || review.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesRating = !filterRating || review.rating.toString() === filterRating;
    
    return matchesSearch && matchesStatus && matchesRating;
  });

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/20 text-red-400 p-4 rounded-lg relative backdrop-blur-sm">
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
          <h1 className="text-3xl font-bold text-white mb-2">Review Management</h1>
          <p className="text-gray-400">Manage customer reviews and ratings</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/10 backdrop-blur-lg rounded-xl p-6 backdrop-blur-sm border-0 border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Reviews</p>
              <p className="text-2xl font-bold text-white mt-2">{reviews.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-700/50">
              <FaStar className="text-yellow-400 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-slate-800/10 backdrop-blur-lg rounded-xl p-6 backdrop-blur-sm border-0 border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-white mt-2">
                {reviews.filter(r => r.status.toLowerCase() === 'pending').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-700/50">
              <FaClock className="text-amber-400 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-slate-800/10 backdrop-blur-lg rounded-xl p-6 backdrop-blur-sm border-0 border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Approved</p>
              <p className="text-2xl font-bold text-white mt-2">
                {reviews.filter(r => r.status.toLowerCase() === 'approved').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-700/50">
              <FaCheck className="text-emerald-400 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-slate-800/10 backdrop-blur-lg rounded-xl p-6 backdrop-blur-sm border-0 border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Avg Rating</p>
              <p className="text-2xl font-bold text-white mt-2">
                {reviews.length ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 'N/A'}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-700/50">
              <div className="flex">
                <FaStar className="text-yellow-400 text-sm mt-1" />
                <span className="text-white ml-1">5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-slate-800/10 backdrop-blur-lg rounded-xl p-6 backdrop-blur-sm border-0 border-slate-700/50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-1/3">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border-0 border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-700/50 text-white border-0 border-slate-600/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="bg-slate-700/50 text-white border-0 border-slate-600/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="">All Ratings</option>
              {ratings.map(rating => (
                <option key={rating} value={rating}>{rating} Star{rating !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-slate-800/10 backdrop-blur-lg rounded-xl backdrop-blur-sm border-0 border-slate-700/50 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {filteredReviews.map((review) => (
              <tr key={review.id} className="hover:bg-slate-700/30 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{review.productName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-white">{review.customerName}</div>
                    <div className="text-sm text-gray-400">{review.customerEmail}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm font-medium text-white">
                      {review.rating}/5
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                      {getStatusIcon(review.status)}
                      <span className="ml-1">{review.status}</span>
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleViewDetails(review)}
                      className="p-1.5 rounded hover:bg-slate-600/50 transition-colors duration-200 text-blue-400 hover:text-blue-300"
                      title="View Details"
                    >
                      <FaEdit />
                    </button>
                    {review.status.toLowerCase() === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleStatusChange(review.id, 'Approved')}
                          className="p-1.5 rounded hover:bg-slate-600/50 transition-colors duration-200 text-emerald-400 hover:text-emerald-300"
                          title="Approve"
                        >
                          <FaCheck />
                        </button>
                        <button 
                          onClick={() => handleStatusChange(review.id, 'Rejected')}
                          className="p-1.5 rounded hover:bg-slate-600/50 transition-colors duration-200 text-red-400 hover:text-red-300"
                          title="Reject"
                        >
                          <FaTimes />
                        </button>
                      </>
                    )}
                    {review.status.toLowerCase() !== 'pending' && (
                      <button 
                        onClick={() => handleStatusChange(review.id, 'Pending')}
                        className="p-1.5 rounded hover:bg-slate-600/50 transition-colors duration-200 text-amber-400 hover:text-amber-300"
                        title="Mark as Pending"
                      >
                        <FaClock />
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(review.id)}
                      className="p-1.5 rounded hover:bg-slate-600/50 transition-colors duration-200 text-red-500 hover:text-red-400"
                      title="Delete"
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

      {/* Review Details Modal */}
      {showModal && selectedReview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800/10 backdrop-blur-lg rounded-xl p-6 w-full max-w-2xl border-0 border-slate-700/50 backdrop-blur-sm max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Review Details</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-slate-700/50 transition-colors duration-200 text-gray-400 hover:text-white"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Review Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{selectedReview.title}</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {renderStars(selectedReview.rating)}
                      </div>
                      <span className="text-sm font-medium text-white">
                        {selectedReview.rating}/5
                      </span>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedReview.status)}`}>
                      {getStatusIcon(selectedReview.status)}
                      <span className="ml-1">{selectedReview.status}</span>
                    </span>
                    {selectedReview.verified && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400">
                        ✓ Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-3">Customer Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-gray-400">Name:</span>
                    <p className="text-sm text-white font-medium">{selectedReview.customerName}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Email:</span>
                    <p className="text-sm text-white font-medium">{selectedReview.customerEmail}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Product:</span>
                    <p className="text-sm text-white font-medium">{selectedReview.productName}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Review Date:</span>
                    <p className="text-sm text-white font-medium">{new Date(selectedReview.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-3">Review Content</h4>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-gray-200 leading-relaxed">{selectedReview.comment}</p>
                </div>
              </div>

              {/* Review Stats */}
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-3">Review Statistics</h4>
                <div className="flex items-center space-x-6">
                  <div>
                    <span className="text-xs text-gray-400">Helpful Votes:</span>
                    <p className="text-sm text-white font-medium">{selectedReview.helpful}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Verified Purchase:</span>
                    <p className="text-sm text-white font-medium">{selectedReview.verified ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-700/50">
                {selectedReview.status.toLowerCase() === 'pending' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(selectedReview.id, 'Approved')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors duration-200 font-medium"
                    >
                      <FaCheck /> Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedReview.id, 'Rejected')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors duration-200 font-medium"
                    >
                      <FaTimes /> Reject
                    </button>
                  </>
                )}
                {selectedReview.status.toLowerCase() !== 'pending' && (
                  <button
                    onClick={() => handleStatusChange(selectedReview.id, 'Pending')}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors duration-200 font-medium"
                  >
                    <FaClock /> Mark Pending
                  </button>
                )}
                <button
                  onClick={() => handleDelete(selectedReview.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HOC(Review);