import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import Register from '../pages/Register';
import Profile from '../pages/Profile';

import DrawerContent from '../components/DrawerContent'

export default function AppRoutes() {

  const Drawer = createDrawerNavigator()

  return (
    <Drawer.Navigator
     initialRouteName='Home'
     drawerContent={props => <DrawerContent {...props}/>}
      >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: 'Minhas movimentações',
          drawerLabel: 'Home',
          drawerActiveTintColor: '#FFF',
          drawerActiveBackgroundColor: '#3B3DBF',
          drawerInactiveTintColor: '#1B1B1B',
          drawerInactiveBackgroundColor: '#F0F2FF'
        }}
      />

      <Drawer.Screen
        name="Register"
        component={Register}
        options={{
          headerTitle: 'Registrando',
          drawerLabel: 'Registrar',
          drawerActiveTintColor: '#FFF',
          drawerActiveBackgroundColor: '#3B3DBF',
          drawerInactiveTintColor: '#1B1B1B',
          drawerInactiveBackgroundColor: '#F0F2FF',
          headerStyle: {
            backgroundColor: '#F0F2FF',
          }
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: 'Meu perfil',
          drawerLabel: 'Meu perfil',
          drawerActiveTintColor: '#FFF',
          drawerActiveBackgroundColor: '#3B3DBF',
          drawerInactiveTintColor: '#1B1B1B',
          drawerInactiveBackgroundColor: '#F0F2FF'
        }}
      />
    </Drawer.Navigator>
  )
}