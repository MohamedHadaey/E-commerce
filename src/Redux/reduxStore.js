
import {configureStore} from "@reduxjs/toolkit";
import counterRedux from "./counterSlice";
import forkSlice from "./apiSlice"


export const reduxStore = configureStore({
    reducer: {
        counterRedux,
        forkSlice
    }
}) 

// redux store can contain many slices 