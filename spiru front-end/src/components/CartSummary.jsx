const FREE_SHIPPING_THRESHOLD = 500;

const CartSummary = ({ subtotal }) => {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const percentage = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  return (
   <div className="p-5 bg-white rounded-xl shadow border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>

      <div className="bg-[#f1fdf6] rounded p-3 mb-4">
        {subtotal >= FREE_SHIPPING_THRESHOLD ? (
          <p className="text-sm font-medium text-green-700">
            <span className="font-bold">Congratulations!</span> You’ve got free shipping!
          </p>
        ) : (
          <p className="text-sm">
            Almost there, add <span className="text-green-600 font-semibold">₹{remaining.toFixed(2)}</span> more to get <strong>FREE SHIPPING!</strong>
          </p>
        )}

        <div className="mt-3 relative h-2 bg-green-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-600 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
          <div className="absolute right-1 top-1/2 -translate-y-1/2">
            <img src="/truck-icon.png" alt="truck" className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="text-base font-semibold">Subtotal:</p>
        <p className="text-lg font-bold text-green-700">₹{subtotal.toFixed(2)}</p>
      </div>

      <button
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        disabled={subtotal === 0}
      >
        Check Out
      </button>
    </div>
  );
};

export default CartSummary;
