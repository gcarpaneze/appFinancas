import React, { useContext } from 'react';

import { AuthContext } from '../context/AuthContext'

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';


export default function Routes() {

    const { isAuthenticated } = useContext(AuthContext)

    return (
        isAuthenticated ? <AppRoutes /> : <AuthRoutes />
    )
}
