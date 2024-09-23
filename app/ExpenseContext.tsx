// ExpenseContext.tsx
import React, { createContext, useContext, useState } from 'react';

export interface Expense {
    id: string;
    description: string;
    amount: number;
}

const ExpenseContext = createContext<{
    expenses: Expense[];
    setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}>({ expenses: [], setExpenses: () => {} });

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    return (
        <ExpenseContext.Provider value={{ expenses, setExpenses }}>
            {children}
        </ExpenseContext.Provider>
    );
};

export const useExpenses = () => useContext(ExpenseContext);
