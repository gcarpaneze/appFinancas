import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

export default function AuthRoutes() {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator initialRouteName='SignIn'>
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    title: 'Voltar',
                    headerStyle: {
                        backgroundColor: '#3B3DBF',
                    },
                    headerTintColor: '#fff'
                }}
            />
        </Stack.Navigator>
    )
}