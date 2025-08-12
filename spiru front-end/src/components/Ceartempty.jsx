import { Trash2 } from "lucide-react";
import { useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Pure Himalayan Shilajit Resin | Unlock Your Peak Performance",
      weight: "20gm",
      image: "/shilajit.png",
      originalPrice: 1599,
      discountedPrice: 1120,
      quantity: 1,
    },
    {
      id: 2,
      title: "Natural Spirulina Powder",
      weight: "100g",
      image: "/spirulina.png",
      originalPrice: 399,
      discountedPrice: 319,
      quantity: 1,
    },
  ]);

  const updateQuantity = (id, value) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + value) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen pt-20">
      <div className="bg-cover bg-center h-40 flex items-center justify-center" style={{ backgroundImage: "url('/banner.jpg')" }}>
        <h1 className="text-white text-xl font-semibold uppercase">Shopping Cart</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="bg-white rounded p-6 flex-1">
          <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex gap-4">
                <img src={item.image} className="w-24 h-24 object-cover rounded" alt="" />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">Weight: {item.weight}</p>
                  <div className="text-sm text-gray-400 line-through">₹{item.originalPrice}</div>
                  <div className="text-green-600 font-semibold">₹{item.discountedPrice}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.id, -1)} className="border rounded px-2">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="border rounded px-2">+</button>
              </div>
              <div className="font-semibold">₹{item.discountedPrice * item.quantity}</div>
              <Trash2 className="text-red-500 cursor-pointer" onClick={() => removeItem(item.id)} />
            </div>
          ))}
        </div>

        {/* Cart Totals */}
        <div className="bg-white rounded p-6 w-full max-w-sm">
          <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>
          <div className="bg-green-100 p-3 rounded text-sm mb-4 text-green-700">
            🎉 Congratulations! You've got free shipping!
          </div>
          <div className="flex justify-between mb-6">
            <span className="font-medium">Subtotal:</span>
            <span className="font-bold text-lg">₹{subtotal.toFixed(2)}</span>
          </div>
          <button className="bg-green-700 text-white w-full py-2 rounded hover:bg-green-800 transition">
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
