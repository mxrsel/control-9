import React, {useState} from 'react';
import {Category} from "../../types.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";


const CategoryList: React.FC = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.categories.categories);
    const [openForm, setOpenForm] = useState(false);
    const [editCategory, setEditCategory] = useState<Category | null>(null);

    const handleEdit = (category: Category) => {
        setEditCategory(category);
        setOpenForm(true);
    }
    return (
        <div>
            <button>add Category</button>

            {categories.map(category => (
                <li key={category.id}>
                    {category.name}
                    {category.type}
                    <button onClick={() => handleEdit(category)}>Edit</button>
                </li>
            ))}
        </div>
    );
};

export default CategoryList;