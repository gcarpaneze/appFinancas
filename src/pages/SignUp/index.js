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

const Logo = require('../../../assets/Logo.png')

import { AuthContext } from '../../context/AuthContext';

export default function SignUp() {

  const { signUp } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [apiLoading, setApiLoading] = useState(false)

  async function handleSignUp() {

    setApiLoading(true)

    if (name === '' || email === '' || password === '') return

    await signUp({ name, email, password })

    setApiLoading(false)
  }

  return (
    <SafeAreaView style={styles.container}>

      <Image source={Logo} style={{ marginBottom: 40 }} />

      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        keyboardType="default"
        placeholder='Seu nome'
        style={styles.input}
      />

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
        onPress={handleSignUp}>
        {apiLoading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.labelBtn}>Cadastrar</Text>
        )}
      </TouchableOpacity>

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