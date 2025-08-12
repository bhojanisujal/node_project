import React, { useEffect, useCallback, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { MdOutlineSkipNext, MdSkipPrevious } from "react-icons/md";
import { ProductFetch } from "../redux/slices/productslice";
import { useDispatch, useSelector } from "react-redux";

const Collection = () => {
  const { category: rawCategorySlug } = useParams();
  const categorySlug = decodeURIComponent(rawCategorySlug || "");
  const dispatch = useDispatch();
  const { isLoading, isError, ProductData } = useSelector((state) => state.Product);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // State to track selected variant for each product
  const [selectedVariants, setSelectedVariants] = useState({});

  const BASE_URL = "http://localhost:4000";
  const FALLBACK_IMAGE = "https://placehold.co/400x400";
  const FALLBACK_PRICE = "N/A";

  const normalizedCategorySlug = categorySlug.replace(/\s+/g, "-").toLowerCase();

  // Fetch products for the category
  const fetchProducts = useCallback(() => {
    if (categorySlug) {
      const hasData = ProductData.some(
        (product) => product.category?.slug === normalizedCategorySlug
      );
      if (!hasData) {
        console.log("Fetching products for category:", categorySlug);
        dispatch(ProductFetch(categorySlug));
      }
    }
  }, [dispatch, categorySlug, ProductData, normalizedCategorySlug]);

  useEffect(() => {
    console.log("useEffect triggered with categorySlug:", categorySlug);
    fetchProducts();
  }, [fetchProducts]);

  // Debug product data
  useEffect(() => {
    console.log("ProductData:", ProductData);
    ProductData.forEach((product) => {
      console.log(`Product: ${product.productName} (_id: ${product._id})`, {
        variants: product.variants || [],
        images: product.variants?.map((v) => v.productImage) || [],
        prices: product.variants?.map((v) => ({
          originalPrice: v.originalPrice,
          discountPrice: v.discountPrice,
          discountPercent: v.discountPercent,
        })) || [],
      });
    });
  }, [ProductData]);

  // Convert backend image paths to full URLs
  const getImageUrl = (path) => {
    if (!path || typeof path !== "string" || path.trim() === "") {
      console.warn(`Invalid image path: ${path}`);
      return FALLBACK_IMAGE;
    }
    const cleanPath = path
      .replace(/^public\\product\\/, "")
      .replace(/^public\/product\//, "")
      .replace(/\\/g, "/")
      .replace(/^\/+|\/+$/g, "");
    const url = cleanPath ? `${BASE_URL}/product/${cleanPath}` : FALLBACK_IMAGE;
    console.log(`Image URL for path "${path}": ${url}`);
    return url;
  };

  // Handle variant selection
  const handleVariantChange = (productId, variantId) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: variantId,
    }));
  };

  // Placeholder for adding to wishlist
  const handleAddToWishlist = (variant) => {
    console.log("Add to wishlist:", { productId: variant._id, productName: variant.productName });
    // TODO: Implement wishlist logic
  };

  // Placeholder for adding to cart
  const handleAddToCart = (variant, e) => {
    e.preventDefault(); // Prevent Link navigation
    console.log("Add to cart:", { productId: variant._id, quantity: 1 });
    // TODO: Implement cart logic
  };

  // Render loading state with skeleton UI
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 container mx-auto px-4">
        {[...Array(productsPerPage)].map((_, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="w-full h-48 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-6 bg-gray-200 animate-pulse mt-4 rounded"></div>
            <div className="h-4 bg-gray-200 animate-pulse mt-2 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  // Render error state
  if (isError) {
    console.error("Error details:", isError);
    return (
      <div className="text-center py-10 text-red-500">
        Error loading products! Please try again later.
        <Link to="/Shopall" className="text-blue-500 underline ml-2">
          Browse all products
        </Link>
        .
      </div>
    );
  }

  // Filter active products with variants
  const filteredProducts = ProductData.filter(
    (product) =>
      product.category?.slug === normalizedCategorySlug &&
      product.variants?.length > 0 &&
      product.isActive === true
  );

  // Pagination logic
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Render empty state
  if (!categorySlug) {
    return (
      <div className="text-center py-10">
        No category specified.{" "}
        <Link to="/Shopall" className="text-blue-500 underline">
          Browse all products
        </Link>
        .
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-10">
        No active products found for the category "{categorySlug}".{" "}
        <Link to="/Shopall" className="text-blue-500 underline">
          Browse all products
        </Link>
        .
      </div>
    );
  }

  return (
    <section className="secNewLaunches container mx-auto bg-white mb-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 capitalize">
          {categorySlug.replace(/-/g, " ")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentProducts.map((product) => {
            // Check if variants exist
            if (!product.variants || product.variants.length === 0) {
              console.warn(`No variants for product: ${product.productName}`);
              return (
                <div key={product._id} className="text-center p-4 border rounded">
                  <p>{product.productName}</p>
                  <p className="text-red-500">No variants available</p>
                </div>
              );
            }

            // Use the selected variant or the first one by default
            const selectedVariantId = selectedVariants[product._id];
            const variant = product.variants.find((v) => v._id === selectedVariantId) || product.variants[0];
            const primaryImage = variant.productImage?.[0]
              ? getImageUrl(variant.productImage[0])
              : FALLBACK_IMAGE;
            const hoverImage =
              variant.productImage?.[1] && getImageUrl(variant.productImage[1]) !== FALLBACK_IMAGE
                ? getImageUrl(variant.productImage[1])
                : primaryImage;
            const originalPrice = variant.originalPrice >= 0 ? `₹${variant.originalPrice}` : FALLBACK_PRICE;
            const discountPrice =
              variant.discountPrice && variant.discountPrice < variant.originalPrice
                ? `₹${variant.discountPrice}`
                : null;
            const discountPercent =
              variant.discountPercent && variant.discountPercent > 0 ? variant.discountPercent : 0;

            return (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="product-card rounded-lg shadow-md hover:shadow-lg transition block"
              >
                <div className="product-image-wrapper relative">
                  {/* Discount Badge */}
                  {discountPercent > 0 && (
                    <span className="discount-badge absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {discountPercent}% OFF
                    </span>
                  )}
                  {/* Wishlist Button */}
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent Link navigation
                      handleAddToWishlist(variant);
                    }}
                    aria-label={`Add ${product.productName} to wishlist`}
                  >
                    <Heart className="wish-list w-6 h-6" />
                  </button>
                  {/* Image Container */}
                  <div className="image-container relative overflow-hidden aspect-square">
                    <img
                      src={primaryImage}
                      alt={`${product.productName} primary image`}
                      className="product-image default-img w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        if (e.target.src !== FALLBACK_IMAGE) {
                          console.warn(
                            `Failed to load primary image for ${product.productName}: ${e.target.src}`
                          );
                          e.target.src = FALLBACK_IMAGE;
                        }
                      }}
                    />
                    <img
                      src={hoverImage}
                      alt={`${product.productName} hover image`}
                      className="product-image hover-img w-full h-full object-cover absolute top-0 left-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                      loading="lazy"
                      onError={(e) => {
                        if (e.target.src !== FALLBACK_IMAGE) {
                          console.warn(
                            `Failed to load hover image for ${product.productName}: ${e.target.src}`
                          );
                          e.target.src = FALLBACK_IMAGE;
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="product-details p-4">
                  <h3 className="product-title text-lg font-semibold truncate">
                    {product.productName}
                  </h3>
                  <div className="product-prices flex gap-2 mt-2">
                    {discountPrice ? (
                      <>
                        <span className="original-price text-gray-500 line-through">
                          {originalPrice}
                        </span>
                        <span className="discounted-price text-green-600 font-bold">
                          {discountPrice}
                        </span>
                      </>
                    ) : (
                      <span className="original-price text-green-600 font-bold">
                        {originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                <div className="action-buttons p-4 flex gap-2">
                  <button
                    className="cart-btn flex-1 bg-gray-200 hover:bg-gray-300 text-black py-2 rounded flex items-center justify-center"
                    onClick={(e) => handleAddToCart(variant, e)}
                    aria-label={`Add ${product.productName} to cart`}
                  >
                    <ShoppingCart className="icon w-5 h-5 mr-2" />
                    Add to Cart
                  </button>
                  <Link
                    to="/Checkout"
                    className="buy-btn flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-center"
                    onClick={(e) => e.stopPropagation()} // Prevent parent Link navigation
                    aria-label={`Buy ${product.productName} now`}
                  >
                    Buy Now
                  </Link>
                </div>
              </Link>
            );
          })}
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination flex justify-center items-center gap-4 mt-8">
            <button
              className={`p-2 rounded ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <MdSkipPrevious className="w-6 h-6" />
            </button>
            <div className="page-numbers flex gap-2">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    className={`px-4 py-2 rounded ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-black hover:bg-gray-300"
                    }`}
                    onClick={() => handlePageChange(page)}
                    aria-label={`Page ${page}`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            <button
              className={`p-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <MdOutlineSkipNext className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Collection;