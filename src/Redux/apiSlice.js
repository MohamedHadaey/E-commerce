import { createSlice } from "@reduxjs/toolkit";

const forkSlice = createSlice({
    name: "api",
    initialState: {
        allPizza: null,
        isLoading: false,
        isError: false
    }
})


export default forkSlice.reducer;

