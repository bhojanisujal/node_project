import { HiOutlineTrash } from "react-icons/hi";
import { Minus, Plus } from "lucide-react";

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const price = parseFloat(item.discountedPrice.toString().replace(/[^\d.-]/g, ""));
  const total = (price * item.quantity).toFixed(2);

  return (
    <div className="grid grid-cols-12 gap-10 pe-4 ps-4   items-center py-4 border-b border-gray-200">
      {/* Product */}
      <div className="col-span-5 flex items-center gap-4">
        <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
        <div>
          <h3 className="text-base font-medium text-gray-900">{item.title}</h3>
          <p className="text-sm text-gray-500">
            Weight: <span className="text-green-600 font-medium">{item.weight}</span>
          </p>
         
        </div>
      </div>

      {/* Price */}
      {/* <p className="text-center text-green-600 font-semibold">
        ₹{item.discountedPrice}
      </p> */}

<div className="col-span-2 text-center text-sm flex flex-col justify-center items-center">
  <p className="line-through text-gray-400">₹{item.originalPrice}</p>
  <p className="text-green-600 font-semibold">₹{item.discountedPrice}</p>
</div>

      {/* Quantity */}
      <div className="col-span-2 flex items-center justify-center gap-2 border border-gray-300 bg-gray-100 px-2 py-1 rounded-full">
        {item.quantity === 1 ? (
          <HiOutlineTrash
            onClick={() => onRemove(item.id)}
            className="cursor-pointer text-gray-500 hover:text-red-600"
          />
        ) : (
          <button
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            className="p-1 hover:bg-gray-200 rounded-full"
          >
            <Minus size={14} />
          </button>
        )}
        <span className="w-6 text-center">{item.quantity}</span>
        <button
          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Total */}
      <p className="col-span-2 text-center text-green-600 font-semibold">₹{total}</p>

      {/* Action */}
      <div className="col-span-1 text-center">
        <HiOutlineTrash
          onClick={() => onRemove(item.id)}
          className="cursor-pointer text-gray-500 hover:text-red-600 inline-block"
        />
      </div>
    </div>
  );
};

export default CartItem;
