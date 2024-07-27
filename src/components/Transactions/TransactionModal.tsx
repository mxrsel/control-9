import React, { useState, useEffect } from 'react';
import {Transaction} from "../../types.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {createTransaction, updateTransaction} from "../../store/Transactions/transactionsThunks.ts";

interface TransactionFormProps {
    transaction: Transaction | null;
    onClose: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ transaction, onClose }) => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.categories.categories);
    const [type, setType] = useState<'income' | 'expense'>('income');
    const [categoryId, setCategoryId] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);

    useEffect(() => {
        if (transaction) {
            setType(transaction.amount > 0 ? 'income' : 'expense');
            setCategoryId(transaction.category);
            setAmount(Math.abs(transaction.amount));
        }
    }, [transaction]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (transaction) {
            dispatch(updateTransaction({ ...transaction, amount: type === 'income' ? amount : -amount }));
        } else {
            dispatch(createTransaction({
                category: categoryId,
                amount: type === 'income' ? amount : -amount,
                createdAt: new Date().toISOString(),
            }));
        }
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Type:</label>
                <select value={type} onChange={e => setType(e.target.value as 'income' | 'expense')}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>
            <div>
                <label>Category:</label>
                <select
                    value={categoryId}
                    onChange={e => setCategoryId(e.target.value)}
                >
                    <option value="">Select Category</option>
                    {categories.filter(cat => cat.type === type).map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value))}
                    required
                />
                <span> KGS</span>
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default TransactionForm;
