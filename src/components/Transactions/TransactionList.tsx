import React, { useEffect, useState } from 'react';
import './Transactions.css'

import dayjs from 'dayjs';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {Transaction} from "../../types.ts";
import TransactionForm from "./TransactionForm.tsx";
import {deleteTransaction, fetchTransactions} from "../../store/Transactions/transactionsThunks.ts";

const TransactionList: React.FC = () => {
    const dispatch = useAppDispatch();
    const transactions = useAppSelector(state => state.transactions.transactions);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    const handleEdit = (transaction: Transaction) => {
        setEditingTransaction(transaction);
        setIsFormOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            dispatch(deleteTransaction(id));
        }
    };

    const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);

    return (
        <div >

            {isFormOpen && (
                <TransactionForm
                    transaction={editingTransaction}
                    onClose={() => setIsFormOpen(false)}
                />
            )}

            <div className='d-flex justify-content-between'>
                <h2>Total: {totalAmount} KGS</h2>


            <button className='btn btn-dark mt-2' onClick={() => {
                setEditingTransaction(null);
                setIsFormOpen(true);
            }}>
                Add Transaction
            </button>
            </div>
            <ul className='d-flex justify-content-center'>
                {transactions
                    .slice()
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map(transaction => (
                        <li className='listItem border-1 p-2 bg-dark text-light' key={transaction.id}>
                            {dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')} KGS
                            <button className='btn btn-primary ms-2' onClick={() => handleEdit(transaction)}>Edit</button>
                            <button className='btn btn-danger ms-2' onClick={() => handleDelete(transaction.id)}>Delete</button>
                        </li>
                    ))}
            </ul>


        </div>
    );
};

export default TransactionList;
