import React from 'react';
import {NavLink, Route, Routes} from "react-router-dom";
import TransactionList from "./components/Transactions/TransactionList.tsx";
import CategoryList from "./components/Categories/CategoryList.tsx";

const App: React.FC = () => {
    return (
        <div>
            <header>
                <nav
                    className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between align-items-center ps-2 pe-2">
                    <div className='navbar-brand'>Finance Tracker</div>
                    <ul className='navbar-list '>
                        <NavLink className='text-decoration-none text-light me-3' to="/">Home</NavLink>
                        <NavLink className='text-decoration-none text-light' to="/categories">Categories</NavLink>
                    </ul>
                </nav>
            </header>

            <Routes>
                <Route path="/" element={<TransactionList />} />
                <Route path="/categories" element={<CategoryList />} />
            </Routes>
        </div>
    );
};

export default App;