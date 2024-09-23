import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Expense } from '../ExpenseContext'; // Import the Expense interface

const Stats: React.FC<{ expenses: Expense[] }> = ({ expenses = [] }) => {
    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Statistics</Text>
            <Text>Total Expenses: ${totalAmount.toFixed(2)}</Text>
            {/* Add more statistics details here */}
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

export default Stats;
