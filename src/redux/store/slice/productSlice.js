import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    data: [],
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        productList: (state, { payload }) => {
            state.data = payload;
        },
        clearProductList(state) {
            state.data = [];
        }
    },
});

export const { productList, clearProductList } = productSlice.actions;

export default productSlice.reducer;