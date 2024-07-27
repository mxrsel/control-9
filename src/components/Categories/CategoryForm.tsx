import React, { useEffect, useState} from 'react';
import {Category} from "../../types.ts";
import {createCategory, updateCategory} from "../../store/Categories/categoryThunks.ts";
import {useAppDispatch} from "../../app/hooks.ts";

interface Props {
    category: Category | null;
    onClose: () => void;
}


const CategoryForm: React.FC<Props> = ({ category}) => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const [type, setType] = useState<'income' | 'expense'>('income');

    useEffect(() => {
        if (category) {
            setName(category.name);
            setType(category.type);
        }
    }, [category]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (category) {
            dispatch(updateCategory({ ...category, name, type }));
        } else {
            dispatch(createCategory({ name, type })); // Ensures all fields are included
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </div>

            <div>
                <label>Type:</label>
                <select value={type} onChange={e => setType(e.target.value as 'income' | 'expense')}>
                    <option value='income'>Income</option>
                    <option value='expense'>Expense</option>
                </select>
            </div>
            <button type="submit">Save</button>
            <button type='submit'>Cancel</button>
        </form>
    );
};

export default CategoryForm;