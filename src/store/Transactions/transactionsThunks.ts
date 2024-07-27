import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiTransaction, Transaction} from "../../types.ts";
import {RootState} from "../../app/store.ts";
import axiosApi from "../../axiosApi.ts";

export const fetchTransactions = createAsyncThunk<Transaction[], void, {state: RootState}>('transactions/fetchTransactions',
    async () => {
    const response = await axiosApi.get('transactions.json');
    const transactionData = response.data;

    let newTransaction: Transaction[] = [];

    if (transactionData) {
        newTransaction = Object.keys(transactionData).map((key: string) => {
            const transaction = transactionData[key];
            return {
                id: key,
                ...transaction,
            };
        });
    }
    return newTransaction;
    });

    export const createTransaction = createAsyncThunk<Transaction, ApiTransaction, {state: RootState}> ('transactions/createTransaction',
        async (transaction) => {
        const response = await axiosApi.post('/transactions.json', transaction);
        return {id: response.data.name, ...transaction};
        });

    export const updateTransaction = createAsyncThunk<Transaction, Transaction, {state: RootState}>('transactions/updateTransaction',
        async (transaction) => {
        await axiosApi.patch('/transactions/' + transaction + '.json', transaction);
        return transaction
        });

    export const deleteTransaction = createAsyncThunk<string, string, {state: RootState}>('transactions/deleteTransaction',
        async (id) => {
        await axiosApi.delete('/transactions/' + id + '.json');
        return id;
        })