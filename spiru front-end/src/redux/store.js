import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./slices/categoryslices.js"; 
import ProductReducer from "./slices/productslice.js"; 
import cartReducer from "./slices/addtocart.js";
export const store = configureStore({
    reducer: {
        Category: CategoryReducer,
        Product: ProductReducer,
        cart: cartReducer,
    },
});