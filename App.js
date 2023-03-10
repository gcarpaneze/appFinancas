import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import {
  StatusBar
} from 'react-native';

import Routes from './src/routes';
import AuthProvider from './src/context/AuthContext';

function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  )
}

export default App;
