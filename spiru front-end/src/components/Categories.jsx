import React, { useEffect, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CategoryFetch } from "../redux/slices/Categoryslices";

const BASE_URL = "http://localhost:4000";
const FALLBACK_IMAGE = "https://placehold.co/24x24";

const Categories = () => {
  const dispatch = useDispatch();

  const { isLoading, isError, CategoryData } = useSelector(
    (state) => state.Category
  );

  const memoizedCategoryData = useMemo(() => CategoryData, [CategoryData]);

  useEffect(() => {
    console.log("Fetching categories for Categories component...");
    dispatch(CategoryFetch());
  }, [dispatch]);

  const getImageUrl = (path) => {
    if (!path || typeof path !== "string") {
      console.warn("Invalid or missing image path, using fallback:", path);
      return FALLBACK_IMAGE;
    }
    const cleanPath = path
      .replace(/^public\\category\\/, "") // For Windows-style paths
      .replace(/^public\/category\//, "") // For Unix-style paths
      .replace(/\\/g, "/") // Normalize backslashes to forward slashes
      .replace(/^\/+|\/+$/g, ""); // Remove leading/trailing slashes
    const fullUrl = `${BASE_URL}/category/${cleanPath}`;
    // console.log("Constructed image URL:", fullUrl);
    return fullUrl;
  };

  return (
    <section className="container mx-auto py-10 bg-white text-center section4">
      <h2 className="text-2xl sm:text-3xl font-bold mb-3">Shop By Categories</h2>
      <div className="h-[2px] bg-green-600 w-[150px] mx-auto mb-8 rounded"></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {isLoading ? (
          <div className="col-span-full">Loading categories...</div>
        ) : isError ? (
          <div className="col-span-full flex flex-col items-center">
            <span className="text-red-500">Error: {isError}</span>
            <button
              onClick={() => dispatch(CategoryFetch())}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              Retry
            </button>
          </div>
        ) : memoizedCategoryData.length === 0 ? (
          <div className="col-span-full">No categories available</div>
        ) : (
          memoizedCategoryData.map((category) => (
         <>
         {category.isactiv ? (<>
            <NavLink
              key={category._id}
              to={`/collection/${category.slug}`}
            >
              <div className="flex flex-col items-center">
                <img
                  src={getImageUrl(category.Categoryimage)} // Use Categoryicone or Categoryimage as needed
                  alt={category.Categoryname}
                  className="category-img object-contain"
                  onError={(e) => {
                    console.error(
                      `Failed to load image for ${category.Categoryname}:`,
                      category.Categoryicone
                    );
                    e.target.src = FALLBACK_IMAGE;
                  }}
                  loading="lazy"
                />
                <span className="mt-3 font-medium text-sm sm:text-base">
                  {category.Categoryname}
                </span>
              </div>
            </NavLink>
         </>): (null)}
         </>
          ))
        )}
      </div>
    </section>
  );
};

export default Categories;