import React from 'react';

const CategoryForm: React.FC = () => {
    return (
        <form>
            <div>
                <label>Name:</label>
                <input
                type="text"
                required
                />
            </div>

            <div>
                <label>Type:</label>
                <select>
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