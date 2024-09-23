import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExpenseProvider, useExpenses } from './app/ExpenseContext'; // Adjust the path if needed
import ExpensesScreen from './app/(tabs)/ExpenseTracker';
import Reports from './app/(tabs)/Reports';
import Stats from './app/(tabs)/Stats';

const Tab = createBottomTabNavigator();

const ReportsWithExpenses = () => {
    const { expenses } = useExpenses();
    return <Reports expenses={expenses} />;
};

const StatsWithExpenses = () => {
    const { expenses } = useExpenses();
    return <Stats expenses={expenses} />;
};

export default function App() {
    return (
        <ExpenseProvider>
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Expenses" component={ExpensesScreen} />
                    <Tab.Screen name="Reports" component={ReportsWithExpenses} />
                    <Tab.Screen name="Stats" component={StatsWithExpenses} />
                </Tab.Navigator>
            </NavigationContainer>
        </ExpenseProvider>
    );
}
