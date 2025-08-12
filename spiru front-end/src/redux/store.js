import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./slices/categoryslices.js"; 
import ProductReducer from "./slices/productslice.js"; 

export const store = configureStore({
    reducer: {
        Category: CategoryReducer,
        Product: ProductReducer,
    },
});