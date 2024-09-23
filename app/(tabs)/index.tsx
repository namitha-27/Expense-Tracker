import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExpenseTracker from './ExpenseTracker';
import Reports from './Reports';
import Stats from './Stats';

const Tab = createBottomTabNavigator();

const Tabs: React.FC = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Expenses" component={ExpenseTracker} />
            <Tab.Screen name="Reports" component={Reports} />
            <Tab.Screen name="Stats" component={Stats} />
        </Tab.Navigator>
    );
};

export default Tabs;
