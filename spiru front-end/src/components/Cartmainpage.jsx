import { useState } from 'react';
import CartItem from '../components/CartItem';
import { cartItems as initialItems } from '../constant/Constant';
import { ShoppingCart } from 'lucide-react';
import CartSummary from './CartSummary';
import { useNavigate } from 'react-router-dom';
import bgimage from '../assets/cart_banner.jpg';
import { BsCartX } from 'react-icons/bs';

function Cartmainpage() {
  const [cartItems, setCartItems] = useState(initialItems);
  const navigate = useNavigate();

  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: newQty } : item)
    );
  };

  const handleRemove = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  );

  const isEmpty = cartItems.length === 0;
  const sampleProduct = initialItems[0]; // for demo
  const sampleProduct1 = initialItems[1]; // for demo

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Header */}
      <div
  className="relative h-[180px] md:h-[220px] lg:h-[250px] w-full bg-cover bg-center"
  style={{ backgroundImage: `url(${bgimage})` }}
>
  <div className="absolute inset-0 bg-black/40" />
  <div className="relative z-10 h-full flex items-end md:items-center justify-start px-6 md:px-10">
    <h1 className="text-white text-xl md:text-2xl lg:text-[20px]  mb-4 md:mb-0">
      SHOPPING CART
    </h1>
  </div>
</div>

      <div className="p-6 md:p-10 max-w-[85%] mx-auto">
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => handleAddToCart(sampleProduct)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <ShoppingCart className="w-5 h-5" /> Add Sample Product 1
          </button>
          <button
            onClick={() => handleAddToCart(sampleProduct1)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <ShoppingCart className="w-5 h-5" /> Add Sample Product 2
          </button>
        </div>

        {isEmpty ? (
          <div className="bg-white rounded shadow p-10 text-center max-w-7xl mx-auto">
            <div className="text-4xl mb-4 text-center "><BsCartX className='mx-auto' /></div>
            <h2 className="text-xl font-semibold mb-2">YOUR CART IS EMPTY.</h2>
            <p className="text-gray-600 mb-1">
              Before proceeding to checkout, you must add some products to your shopping cart.
            </p>
            <p className="text-gray-600 mb-4">
              You will find many interesting products on our{" "}
              <span className="font-medium">“Shop”</span> page.
            </p>
            <button
              onClick={() => navigate("/collection/Immunity")}
              className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
            >
              RETURN TO SHOP
            </button>
            <p className="text-sm text-start  mt-6">
              Free Shipping for all orders over <span className="text-red-600 font-bold">₹500.00</span>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cart Items Table */}
            <div className="md:col-span-2 bg-white p- rounded-xl shadow border-0 p-3">
              <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                {/* Table Header */}
               <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b text-sm font-semibold text-gray-700 rounded-t-md">
  <div className="col-span-5">Product</div>
  <div className="col-span-2 text-center">Price</div>
  <div className="col-span-2 text-center">Quantity</div>
  <div className="col-span-2 text-center">Total</div>
  <div className="col-span-1 text-center">Action</div>
</div>


                {/* Table Items */}
                {cartItems.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <CartSummary subtotal={subtotal} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Cartmainpage;
