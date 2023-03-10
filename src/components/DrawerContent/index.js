import React, { useContext } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'

import { AuthContext } from '../../context/AuthContext';

import Logo from '../../../assets/Logo.png'

export default function CustomDrawerContent(props) {

    const { user } = useContext(AuthContext)

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.container}>
                <Image source={Logo} />
                <Text style={[styles.label, { fontWeight: 'bold' }]}>Bem vindo</Text>
                <Text style={styles.label}>{user?.name}</Text>
            </View>

            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 10
    },
    label: {
        fontSize: 16
    }
})
