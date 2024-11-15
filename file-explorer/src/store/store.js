
import { configureStore } from "@reduxjs/toolkit";
import fileSystemReducer from "./explorerSlice";

export const store = configureStore({
    reducer  : {
        explorer  : fileSystemReducer,
    }
})