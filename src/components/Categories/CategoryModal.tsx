import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store.ts";
import axiosApi from "../../axiosApi.ts";
import {fetchCategories} from "../../store/Categories/categoryThunks.ts";


const CategoryModal: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [type, setType] = useState<'income' | 'expense'>('income');
    const [name, setName] = useState('');

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleSubmit = async () => {
        const newCategory = { type, name };

        try {
            await axiosApi.post('/categories.json', newCategory);
            dispatch(fetchCategories());
        } catch (error) {
            console.error('Error', error);
        }
    };
    return (
        <div className="modal fade" id="categoryModal" aria-labelledby="categoryModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="categoryModalLabel">Add Category</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="type">Type</label>
                                <select id="type" className="form-control" value={type} onChange={e => setType(e.target.value as 'income' | 'expense')}>
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;
