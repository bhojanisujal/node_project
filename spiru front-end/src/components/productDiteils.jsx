import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Plus, Minus, ShoppingCart, Heart, MessageCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductFetchById } from '../redux/slices/productslice';
import CustomerReviews from './CustomerReviews';
import Bestseller from './Bestseller';
import verifiedIcon from '../assets/global_icon_main.png';

// Fallback for WhySpiruSwastha
let WhySpiruSwastha = () => <div className="p-4 text-center text-gray-500">WhySpiruSwastha component not available</div>;
try {
  WhySpiruSwastha = require('./WhySpiruSwastha').default;
} catch (error) {
  console.warn("Failed to import WhySpiruSwastha:", error);
}

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { ProductData, isLoading, isError } = useSelector((state) => state.Product);
  const BASE_URL = "http://localhost:4000";
  const FALLBACK_IMAGE = "https://placehold.co/400x400";

  // Find the product from ProductData
  const product = ProductData.find((p) => p._id === productId);
  const variant = product?.variants?.[0]; // Use first variant for simplicity

  // State for UI interactions
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedSection, setExpandedSection] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);

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

  // Fetch product if not found in ProductData
  useEffect(() => {
    if (!product && productId) {
      console.log("Fetching product details for ID:", productId);
      dispatch(ProductFetchById(productId));
    }
  }, [dispatch, productId, product]);

  // Set default weight option when product data is loaded
  useEffect(() => {
    if (variant && variant.weightOptions && !selectedWeight) {
      setSelectedWeight(variant.weightOptions[0].label);
    } else if (product && !variant?.weightOptions) {
      // Set a default weight if no variants exist
      setSelectedWeight(product.weight || "100g");
    }
  }, [variant, product, selectedWeight]);

  // Handle quantity change
  const handleQuantityChange = (action) => {
    setQuantity((prev) => {
      if (action === 'increment') return prev + 1;
      if (action === 'decrement' && prev > 1) return prev - 1;
      return prev;
    });
  };

  // Placeholder for adding to cart
  const handleAddToCart = () => {
    console.log("Add to cart:", { productId: product?._id, quantity, selectedWeight });
    // TODO: Implement cart logic using CartContext
  };

  // Placeholder for adding to wishlist
  const handleAddToWishlist = () => {
    console.log("Add to wishlist:", { productId: product?._id, productName: product?.productName });
    // TODO: Implement wishlist logic using WishlistContext
  };

  // Loading state
  if (isLoading || !product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 max-w-2xl">
              <div className="w-full h-96 bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="flex-1 max-w-xl space-y-4">
              <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-white">
        <div className="text-center py-10 text-red-500">
          Error loading product details: {isError}
        </div>
      </div>
    );
  }

  // Dynamic product data
  const productImages = variant?.productImage?.map((img) => getImageUrl(img)) || [FALLBACK_IMAGE];
  const weightOptions = variant?.weightOptions || [];
  const hasVariants = weightOptions.length > 0;
  const defaultPrice = product?.price || 319; // Default price if no variants
  const defaultOriginalPrice = product?.originalPrice || 399; // Default original price if no variants
  const defaultDiscount = product?.discount || "20% OFF"; // Default discount if no variants
  const selectedOption = hasVariants
    ? weightOptions.find((option) => option.label === selectedWeight) || weightOptions[0]
    : { label: selectedWeight, price: defaultPrice, original: defaultOriginalPrice, discount: defaultDiscount };

  // Dynamic sections
  const sections = [
    {
      id: 'description',
      title: 'Description',
      content: (
        <>
          <p><strong>{product.description?.title || "Premium Product for Optimal Health"}</strong></p>
          <p>{product.description?.content || "A high-quality product designed to enhance your well-being with natural ingredients."}</p>
        </>
      ),
    },
    {
      id: 'whats-inside',
      title: "What's Inside?",
      content: (
        <>
          <p className="text-green-700 font-semibold">Key Ingredients</p>
          <p>{product.ingredients || "Pure, lab-tested ingredients sourced responsibly."}</p>
        </>
      ),
    },
    {
      id: 'why-trust',
      title: 'Why Choose This Product?',
      content: (
        <>
          <p>{product.benefits?.intro || "Trusted by thousands for its proven benefits:"}</p>
          {product.benefits?.list?.map((benefit, index) => (
            <div key={index}>
              <hr className="my-2" />
              <p className="text-green-700 font-semibold">{benefit.title}</p>
              <p>{benefit.description}</p>
            </div>
          )) || (
            <>
              <hr className="my-2" />
              <p className="text-green-700 font-semibold">Boost Energy</p>
              <p>Fights fatigue and keeps you active all day.</p>
            </>
          )}
        </>
      ),
    },
    {
      id: 'how-to-take',
      title: 'How to Use',
      content: (
        <>
          {product.usage?.map((step, index) => (
            <p key={index}><strong>Step {index + 1}:</strong> {step}</p>
          )) || (
            <>
              <p><strong>Step 1:</strong> Follow the recommended dosage.</p>
              <p><strong>Step 2:</strong> Mix with water or as directed.</p>
              <p><strong>Step 3:</strong> Take daily for best results.</p>
            </>
          )}
        </>
      ),
    },
    {
      id: 'faqs',
      title: 'FAQs',
      content: (
        <div className="space-y-4">
          {product.faqs?.map((faq) => (
            <div key={faq.id}>
              <button
                onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                className="w-full flex justify-between items-center text-left font-medium text-green-700"
                aria-expanded={openFAQ === faq.id}
              >
                <div className="flex items-center gap-2">
                  {openFAQ === faq.id ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  <span>{faq.question}</span>
                </div>
              </button>
              {openFAQ === faq.id && (
                <p className="pl-6 mt-2 text-sm text-gray-600">{faq.answer}</p>
              )}
            </div>
          )) || (
            <div>
              <button
                onClick={() => setOpenFAQ(openFAQ === 'faq1' ? null : 'faq1')}
                className="w-full flex justify-between items-center text-left font-medium text-green-700"
                aria-expanded={openFAQ === 'faq1'}
              >
                <div className="flex items-center gap-2">
                  {openFAQ === 'faq1' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  <span>How long does it take to see results?</span>
                </div>
              </button>
              {openFAQ === 'faq1' && (
                <p className="pl-6 mt-2 text-sm text-gray-600">Results vary by product. Typically, 1–2 weeks for initial effects.</p>
              )}
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Gallery */}
          <div className="flex gap-4 flex-1 max-w-2xl">
            <div className="flex flex-col gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 border rounded-md overflow-hidden transition duration-200 ${
                    selectedImage === index ? 'border-green-600 shadow-md' : 'border-gray-300'
                  }`}
                >
                  <img src={image} alt={`thumb-${index}`} className="object-cover w-full h-full" loading="lazy" />
                </button>
              ))}
            </div>
            <div className="flex-1 relative rounded-lg overflow-hidden">
              <img
                src={productImages[selectedImage]}
                alt={`${product?.productName || 'Product'} main image`}
                className="object-cover w-full h-full max-h-[550px] mx-auto"
              />
              <div className="absolute top-4 right-4 bg-green-600 text-white px-2 py-1 text-sm font-bold rounded">
                {selectedOption.discount}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 max-w-xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {product?.productName || 'Product Name'}
            </h1>

            {selectedOption && (
              <div className="flex items-center gap-3 mb-4">
                <span className="text-gray-400 line-through text-lg">
                  ₹{selectedOption.original.toLocaleString("en-IN")}.00
                </span>
                <span className="text-green-600 text-2xl font-bold">
                  ₹{selectedOption.price.toLocaleString("en-IN")}.00
                </span>
                <span className="bg-green-100 text-green-700 text-sm font-bold px-2 py-1 rounded">
                  {selectedOption.discount}
                </span>
              </div>
            )}

            <div className="flex items-center mb-4 border-b-2 border-[#018d43] pb-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm font-semibold">{product?.rating || '4.88'}</span>
              <span className="text-gray-500 text-sm ml-2">({product?.reviewCount || 186} reviews)</span>
              <div className="ml-auto">
                <img src={verifiedIcon} className="w-44" alt="Verified Icon" />
              </div>
            </div>

              {/* <div className="grid grid-cols-2 gap-3 mb-4">
                {(product?.benefits?.list || [
                  { icon: '⚡', text: 'Enhances Energy & Stamina' },
                  { icon: '💪', text: 'Boosts Strength & Power' },
                  { icon: '🧠', text: 'Improves Focus & Mental Clarity' },
                  { icon: '🧬', text: 'Supports Male Vitality' },
                ]).map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-[#696969]">
                    <span className="text-lg">{benefit.icon}</span>
                    <span className="text-sm font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div> */}

            <div className="mb-4">
              <span className="text-gray-700 font-semibold">WEIGHT: </span>
              <span className="text-green-600 font-bold">{selectedWeight}</span>
            </div>

            {/* Show variants only if they exist */}
            {hasVariants && (
              <div className="flex flex-wrap gap-2 p-2 rounded-md">
                {weightOptions.map((option) => {
                  const isSelected = selectedWeight === option.label;
                  return (
                    <button
                      key={option.label}
                      onClick={() => setSelectedWeight(option.label)}
                      className={`w-[134px] border rounded-md overflow-hidden text-left shadow-sm transition-all duration-200 ${
                        isSelected ? "border-green-600" : "border-gray-300 hover:border-green-400"
                      }`}
                    >
                      <div
                        className={`${
                          isSelected ? "bg-green-600 text-white" : "bg-white text-green-600"
                        } px-3 py-2 text-sm font-semibold`}
                      >
                        {option.label}
                      </div>
                      <div className="px-3 py-2 bg-white text-sm font-semibold text-green-700">
                        ₹{option.price.toLocaleString("en-IN")}.00
                      </div>
                      <div className="px-3 pb-3 pt-1 bg-white flex items-center justify-between text-xs font-medium">
                        <span className="text-gray-500 line-through">
                          ₹{option.original.toLocaleString("en-IN")}.00
                        </span>
                        <span className="bg-green-600 text-white px-2 py-0.5 rounded text-[10px]">
                          {option.discount}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange('decrement')}
                  className="p-2 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange('increment')}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-4 rounded-full"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="inline-block w-5 h-5 mr-2" />
                ADD TO CART
              </button>

              <button
                className="p-3 border border-green-800 rounded-full hover:border-red-500 hover:bg-gray-50"
                onClick={handleAddToWishlist}
              >
                <Heart className="w-5 h-5 text-green-700 hover:text-red-500" />
              </button>
            </div>

            <button className="w-full sm:w-[60%] bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-full mb-6 mx-auto block">
              BUY IT NOW
            </button>

            <div className="space-y-2">
              {sections.map((section) => (
                <div key={section.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                    className="w-full p-4 text-left font-semibold text-gray-800 hover:bg-gray-50 flex justify-between items-center"
                    aria-expanded={expandedSection === section.id}
                  >
                    {section.title}
                    <Plus
                      className={`w-5 h-5 transition-transform ${
                        expandedSection === section.id ? 'rotate-45' : ''
                      }`}
                    />
                  </button>
                  {expandedSection === section.id && (
                    <div className="p-4 pt-0 text-gray-600 text-sm">{section.content}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-6 z-50">
        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg shadow-green-200 transition duration-300"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>

      <WhySpiruSwastha />
      <CustomerReviews />
      <Bestseller />
    </div>
  );
};

export default ProductDetails;