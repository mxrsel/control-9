import React, { useEffect, useState } from 'react';

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
        <div>
            <button onClick={() => { setEditingTransaction(null); setIsFormOpen(true); }}>
                Add Transaction
            </button>
            {isFormOpen && (
                <TransactionForm
                    transaction={editingTransaction}
                    onClose={() => setIsFormOpen(false)}
                />
            )}
            <div>
                <h2>Total: {totalAmount} KGS</h2>
            </div>
            <ul>
                {transactions
                    .slice()
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map(transaction => (
                        <li key={transaction.id}>
                            {dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')} - {transaction.amount > 0 ? '+' : '-'}{Math.abs(transaction.amount)} KGS
                            <button onClick={() => handleEdit(transaction)}>Edit</button>
                            <button onClick={() => handleDelete(transaction.id)}>Delete</button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default TransactionList;
