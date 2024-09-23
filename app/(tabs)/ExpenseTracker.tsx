import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Expense {
    id: string;
    description: string;
    amount: number;
}

const ExpenseTracker: React.FC = () => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        const loadExpenses = async () => {
            const storedExpenses = await AsyncStorage.getItem('expenses');
            if (storedExpenses) {
                setExpenses(JSON.parse(storedExpenses));
            }
        };
        loadExpenses();
    }, []);

    const addOrEditExpense = async () => {
        if (!description || !amount) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const newExpense: Expense = {
            id: editingId ? editingId : Date.now().toString(),
            description,
            amount: parseFloat(amount),
        };

        const updatedExpenses = editingId
            ? expenses.map(expense => (expense.id === editingId ? newExpense : expense))
            : [...expenses, newExpense];

        setExpenses(updatedExpenses);
        await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
        resetForm();
    };

    const resetForm = () => {
        setDescription('');
        setAmount('');
        setEditingId(null);
    };

    const editExpense = (expense: Expense) => {
        setDescription(expense.description);
        setAmount(expense.amount.toString());
        setEditingId(expense.id);
    };

    const deleteExpense = async (id: string) => {
        Alert.alert('Delete Expense', 'Are you sure you want to delete this expense?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                onPress: async () => {
                    const updatedExpenses = expenses.filter(expense => expense.id !== id);
                    setExpenses(updatedExpenses);
                    await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{editingId ? 'Edit Expense' : 'Add Expense'}</Text>
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />
            <TextInput
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={styles.input}
            />
            <Button title={editingId ? "Save Changes" : "Add Expense"} onPress={addOrEditExpense} color="#4CAF50" />

            <FlatList
                data={expenses}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.expenseItem}>
                        <Text style={styles.expenseText}>{item.description} - ${item.amount.toFixed(2)} (ID: {item.id})</Text>
                        <View style={styles.buttons}>
                            <TouchableOpacity style={styles.editButton} onPress={() => editExpense(item)}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteExpense(item.id)}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
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
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    expenseItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
    },
    expenseText: {
        fontSize: 16,
        color: '#333',
    },
    buttons: {
        flexDirection: 'row',
    },
    editButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    deleteButton: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ExpenseTracker;
