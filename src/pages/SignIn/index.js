import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native'

const Logo = require('../../../assets/Logo.png')

import { AuthContext } from '../../context/AuthContext';

export default function SignIn() {

  const navigation = useNavigation();

  const { signIn, initialLoading } = useContext(AuthContext);

  const [email, setEmail] = useState('teste@teste.com')
  const [password, setPassword] = useState('123123')
  const [apiLoading, setApiLoading] = useState(false)

  async function handleLogin() {

    setApiLoading(true)

    if (email === '' || password === '') return

    await signIn({ email, password })

    setApiLoading(false)

  }

  return (
    <SafeAreaView style={styles.container}>

      {initialLoading ? (
        <ActivityIndicator color="#3B3DBF" size={40} />
      ) : (
        <>
          <Image source={Logo} style={{ marginBottom: 40 }} />

          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
            placeholder='Email'
            style={styles.input}
          />

          <TextInput
            value={password}
            onChangeText={text => setPassword(text)}
            keyboardType="default"
            placeholder='Senha'
            style={styles.input}
            secureTextEntry={true}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn}
            onPress={handleLogin}>
            {apiLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.labelBtn}>Acessar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('SignUp')}>
            <Text>Criar uma conta gratuita</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4FF',
  },
  input: {
    width: '85%',
    height: 50,
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
    color: '#777777'
  },
  btn: {
    width: '85%',
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B3DBF',
    marginBottom: 5
  },
  labelBtn: {
    color: '#FFFFFF',
    fontSize: 20,
  }

})