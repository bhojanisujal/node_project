import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { PiExclamationMarkBold } from 'react-icons/pi';
import HOC from '../compoent/HOC';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const orderStatuses = ['Approved', 'Dispatch', 'Out Of Delivery', 'Cancelled'];

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/order/get-all');
      setOrders(response.data.data);
    } catch (err) {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:4000/api/order/update-status/${orderId}`, { status: newStatus });
      fetchOrders();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update order status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-emerald-500/20 text-emerald-400';
      case 'Dispatch': return 'bg-blue-500/20 text-blue-400';
      case 'Out Of Delivery': return 'bg-sky-500/20 text-sky-400';
      case 'Cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

const calculateOrderTotal = (order) => {
  if (!order || !Array.isArray(order.items)) return '0.00';

  const total = order.items.reduce((sum, item) => {
    const variant = item.product?.variants?.[0];
    const price =
      variant?.discountPrice ??
      variant?.totalAmount ??
      variant?.originalPrice ??
      0;

    const quantity = item.quantity ?? 1;

    return sum + price * quantity;
  }, 0);

  return total.toFixed(2);
};


  if (loading) return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/20 text-red-400 p-4 rounded-lg relative">
          {error}
          <button onClick={() => setError(null)} className="absolute top-2 right-2">
            ×
          </button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Order Management</h1>
          <p className="text-gray-400">Manage and track customer orders</p>
        </div>
      </div>

      <div className="rounded-xl p-6 backdrop-blur-3xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-700/50 text-white p-2 pl-10 rounded border border-slate-600"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-700/50 text-white border border-slate-600 rounded-lg px-4 py-2"
            >
              <option value="all">All Status</option>
              {orderStatuses.map(status => (
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
              <th className="px-6 py-4 text-gray-300 text-center">Customer</th>
              <th className="px-6 py-4 text-gray-300 text-left">Items</th>
              <th className="px-6 py-4 text-gray-300 text-left">Amount</th>
              <th className="px-6 py-4 text-gray-300 text-left">Status</th>
              <th className="px-6 py-4 text-gray-300 text-left">Date</th>
              <th className="px-6 py-4 text-gray-300 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {filteredOrders.map((order) => (
              <tr key={order._id} className="hover:bg-slate-700/20">
                <td className="px-6 py-4 text-center">
                  {order.user?.profileImage ? (
                    <img 
                      src={order.user.profileImage}
                      alt={order.user.name}
                      className="h-10 w-10 object-cover rounded-full mx-auto"
                    />
                  ) : (
                    <PiExclamationMarkBold className="w-10 h-10 text-red-600 mx-auto" />
                  )}
                  <div className="mt-2 text-white">{order.user?.name}</div>
                </td>

                <td className="px-6 py-4 text-white">
                  {order.items?.length} item{order.items?.length !== 1 ? 's' : ''}
                  <div className="text-xs text-gray-400 mt-1">
                    {order.items?.slice(0, 2).map((item, index) => (
                      <div key={index}>{item.product?.productName} (x{item.quantity})</div>
                    ))}
                    {order.items?.length > 2 && (
                      <div className="text-gray-500">+{order.items?.length - 2} more...</div>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4 text-emerald-400">
                  ${calculateOrderTotal(order)}
                </td>

                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-400">
                  {formatDate(order.orderDate)}
                </td>

                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      className="text-cyan-400 hover:text-cyan-300"
                      onClick={() => setSelectedOrder(order)}
                      title="View"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      className="text-blue-400 hover:text-blue-300"
                      onClick={() => {}}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-400 hover:text-red-300"
                      onClick={() => {}}
                      title="Delete"
                    >
                      <MdOutlineDeleteForever />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] scrollbar-hide">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-2xl space-y-4 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-3 right-4 text-white text-xl"
              onClick={() => setSelectedOrder(null)}
            >
              ×
            </button>
            <h2 className="text-xl text-white font-bold">
              Order Details - {selectedOrder._id}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-3">Customer Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white">{selectedOrder.user?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span className="text-white">{selectedOrder.user?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Phone:</span>
                    <span className="text-white">{selectedOrder.user?.phone || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-3">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`${getStatusColor(selectedOrder.status)} px-2 py-1 rounded-full text-xs`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total:</span>
                    <span className="text-emerald-400">${calculateOrderTotal(selectedOrder)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Order Date:</span>
                    <span className="text-white">{formatDate(selectedOrder.orderDate)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-3">Order Items</h3>
              <div className="space-y-3">
                {selectedOrder.items?.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-slate-600/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {item.product?.productImage?.[0] ? (
                        <img 
                          src={item.product.productImage[0]}
                          alt={item.product.productName}
                          className="h-12 w-12 object-cover rounded"
                        />
                      ) : (
                        <PiExclamationMarkBold className="h-12 w-12 text-red-600" />
                      )}
                      <div>
                        <div className="text-white">{item.product?.productName}</div>
                        <div className="text-gray-400 text-sm">Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="text-emerald-400">
                      ${((item.product?.variants?.[0]?.discountPrice || item.product?.variants?.[0]?.originalPrice || 0) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-700/50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-3">Update Status</h3>
              <div className="flex flex-wrap gap-2">
                {orderStatuses.map(status => (
                  <button
                    key={status}
                    onClick={() => updateOrderStatus(selectedOrder._id, status)}
                    className={`px-4 py-2 rounded-lg ${
                      selectedOrder.status === status 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-slate-600 text-gray-300 hover:bg-slate-500'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HOC(Order);