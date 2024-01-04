import { configureStore } from "@reduxjs/toolkit";
import loginReducer, { initialState } from "./slice/userAuthSlice";
import productReducer from './slice/productSlice';
import cartReducer from './slice/cartSlice';

const storedData = localStorage.getItem("userData");
const preloadedState = {
    login: { ...initialState, data: storedData ? JSON.parse(storedData) : [] },
};

// Reducers
export const store = configureStore({
    reducer: {
        login: loginReducer,
        product: productReducer,
        cart: cartReducer,
    },
    preloadedState,
});
