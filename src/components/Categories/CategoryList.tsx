import React, {useEffect, useState} from 'react';
import {Category} from "../../types.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {deleteCategory, fetchCategories} from "../../store/Categories/categoryThunks.ts";
import CategoryForm from "./CategoryForm.tsx";


const CategoryList: React.FC = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.categories.categories);
    const [openForm, setOpenForm] = useState(false);
    const [editCategory, setEditCategory] = useState<Category | null>(null);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleEdit = (category: Category) => {
        setEditCategory(category);
        setOpenForm(true);
    }

    const handleDelete = (id: string) => {
        if (window.confirm('You want to delete this category?')) {
            dispatch(deleteCategory(id));
        }
    }
    return (
        <div>
            <button onClick={() => {setEditCategory(null); setOpenForm(true)}}>add Category</button>
            {openForm && (
                <CategoryForm
                category={editCategory}
                onClose={() => setOpenForm(false)}
                />
            )}

            {categories.map(category => (
                <li key={category.id}>
                    {category.name}
                    {category.type}
                    <button className='btn btn-primary' onClick={() => handleEdit(category)}>Edit</button>
                    <button className='btn btn-danger' onClick={() => handleDelete(category.id)}>Delete</button>
                </li>
            ))}
        </div>
    );
};

export default CategoryList;