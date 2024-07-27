import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Category} from "../../types.ts";
import {createCategory, deleteCategory, fetchCategories, updateCategory} from "./categoryThunks.ts";

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
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.status = 'success';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.status = 'error';
            })
            .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                state.categories.push(action.payload);
            })
            .addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                const index = state.categories.findIndex(cat => cat.id === action.payload.id);
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
            })
            .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
                state.categories = state.categories.filter(cat => cat.id !== action.payload);
            });
    },
})

export const categoryReducer = categorySlice.reducer;