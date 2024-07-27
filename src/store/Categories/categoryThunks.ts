import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiCategory, Category} from "../../types.ts";
import {RootState} from "../../app/store.ts";
import axiosApi from "../../axiosApi.ts";

export const fetchCategories = createAsyncThunk<Category[], void, {state: RootState}>(
    'categories/fetch',
    async () => {
        const response = await axiosApi.get('/categories.json');
        const catData = response.data;
        let newCat: Category[] = [];

        if (catData) {
            newCat = Object.keys(catData).map((key: string) => {
                const cat = catData[key]
                return{
                    id: key,
                    ...cat,
                };
            });
        }
        return newCat;
    }
);

export const createCategory = createAsyncThunk<void, ApiCategory, {state: RootState}>('categories/create',
    async (category) => {
    await axiosApi.post('/categories.json', category);
    });

export const updateCategory = createAsyncThunk<void, Category, {state: RootState}>('categories/update',
    async (category) => {
    const {id, ...updatedCategory} = category;
    await axiosApi.put ('categories/' + id +'.json', updatedCategory);
    });

export const deleteCategory = createAsyncThunk<void, string, {state: RootState}>('categories/delete',
    async (id) => {
    await axiosApi.delete('categories/' + id + 'json');
    });

