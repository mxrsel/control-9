import {createSlice} from "@reduxjs/toolkit";
import {Category} from "../types.ts";

export interface Categories{
    categories: Category[];
    status: 'idle' | 'loading' | 'success' | 'error';
}

const initialState: Categories = {
    categories: [],
    status: 'idle',
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: {},
})