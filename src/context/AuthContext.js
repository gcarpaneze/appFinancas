import React, { createContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../services/api';

export const AuthContext = createContext()

export default function AuthProvider({ children }) {

    const navigation = useNavigation();

    const [user, setUser] = useState({})
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [initialLoading, setInicialLoading] = useState(true);

    useEffect(() => {

        async function getLogin() {

            setInicialLoading(true)

            const userAcess = await AsyncStorage.getItem('@userAcess')

            if (userAcess) {
                const userAcessObject = JSON.parse(userAcess)
                const { token } = userAcessObject
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                await api.get('/me')
                    .then(() => {

                        setUser(userAcessObject)

                        setIsAuthenticated(true)
                    })
                    .catch(err => {
                        signOut()
                    })
            } else {
                signOut()
            }

            setInicialLoading(false)
        }

        getLogin()
    }, [])

    async function signIn({ email, password }) {

        try {
            const response = await api.post("/login", {
                email,
                password
            })

            const { id, name, token } = response.data

            const data = {
                id,
                name,
                token
            }

            AsyncStorage.setItem('@userAcess', JSON.stringify(data))

            setUser(data)

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setIsAuthenticated(true)

        } catch (error) {
            console.log(error)
        }

    }

    async function signUp({ name, email, password }) {

        try {
            const response = await api.post("/users", {
                name,
                email,
                password
            })

            navigation.navigate('SignIn')

        } catch (error) {
            console.log(error)
        }
    }

    async function signOut() {

        setUser({})
        AsyncStorage.clear()
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{
            signIn,
            signUp,
            signOut,
            isAuthenticated,
            user,
            initialLoading,
        }}>
            {children}
        </AuthContext.Provider>
    )
}