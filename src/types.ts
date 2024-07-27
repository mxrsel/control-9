export interface Category {
    id: string;
    name: string;
    type: 'income' | 'expense';
}

export type ApiCategory = Omit<Category, 'id'>

export interface Transaction {
    id: string;
    category: string;
    amount: number;
    createdAt: string;
}
