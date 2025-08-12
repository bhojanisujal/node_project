import React from "react";
import { useWishlist } from "./WishlistContext";

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    // console.log(wishlist)
    return (
        <div className="wishlist-page p-6">
            <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
            {wishlist.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {wishlist.map((product) => (
                        <div key={product.id} className="wishlist-item border p-2 relative">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-40 object-cover"
                            />
                            <h2 className="text-lg mt-2">{product.title}</h2>
                            <button
                                className="text-red-500 mt-2"
                                onClick={() => removeFromWishlist(product.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
