import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import { AuthContext } from '../../context/AuthContext'

export default function Profile() {

  const navigation = useNavigation()

  const { user, signOut } = useContext(AuthContext)

  const [apiLoading, setApiLoading] = useState(false)

  async function handleSignOut() {
    setApiLoading(true)

    await signOut()

    setApiLoading(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.text, { fontWeight: 'bold' }]}>Bem vindo de volta</Text>
      <Text style={styles.text}>{user?.name}</Text>

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.btn, { backgroundColor: '#3B3DBF' }]}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={[styles.btnLabel, { color: '#FFF' }]}>
          Registrar gastos
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.btn, { borderColor: '#C62C36', borderWidth: 1 }]}
        onPress={handleSignOut}
      >
        {apiLoading ? (
          <ActivityIndicator color="#C62C36" size="small" />) : (
          <Text style={[styles.btnLabel, { color: '#C62C36' }]}>
            Sair
          </Text>
        )}
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50
  },
  text: {
    fontSize: 20
  },
  btn: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 15
  },
  btnLabel: {
    fontSize: 20
  }
})