import {createSlice} from "@reduxjs/toolkit";
import {Transaction} from "../../types.ts";

export interface Transactions {
    transactions: Transaction[];
    status: 'idle' | 'loading' | 'success' | 'error';
}

const initialState: Transactions = {
    transactions: [],
    status: 'idle',
}

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {}
})