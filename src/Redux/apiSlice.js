import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// RTX => redux toolkit => create AsyncThunk


export const getAllProducts = createAsyncThunk("eCommerce/getAllProducts", function() {
    return fetch("https://ecommerce.routemisr.com/api/v1/products").then((res) => res.json())
    
});
export const getAllBrands = createAsyncThunk("eCommerce/getAllBrands", function() {
    return fetch("https://ecommerce.routemisr.com/api/v1/brands").then((res) => res.json())
});







const allProductsSlice = createSlice({
    name: "eCommerce",
    initialState: {
        allProducts: [],
        isLoading: true,
        error: null,
        isError: false
    },

    extraReducers: function (builder) {
        builder.addCase(getAllProducts.fulfilled, function(x,y) {
            console.log('y.payload', y.payload)
            x.allProducts = y.payload.data
        })
        builder.addCase(getAllProducts.pending, function(state) {
            state.isLoading = false;
        
        })
        builder.addCase(getAllProducts.rejected, function(state, action) {
            state.isError = true;
            state.error = action.error.message;
        })

        builder.addCase(getAllBrands.fulfilled)
        builder.addCase(getAllBrands.pending)
        builder.addCase(getAllBrands.rejected)
    }
})


export default allProductsSlice.reducer;