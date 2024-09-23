import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useExpenses } from '../ExpenseContext'; // Adjust the path as necessary
import { Expense } from '../ExpenseContext'; // Import the Expense interface

const Reports: React.FC<{ expenses: Expense[] }> = ({ expenses = [] }) => {
    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reports</Text>
            <Text>Total Expenses: ${totalAmount.toFixed(2)}</Text>
            {/* Add more reporting details here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default Reports;
