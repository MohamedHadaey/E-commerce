import { createSlice } from "@reduxjs/toolkit";

const counterRedux = createSlice({
    name: "counter",
    initialState: {
        name: "mohamed",
        counter: 0
    }
})

export default counterRedux.reducer;