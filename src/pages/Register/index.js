import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Keyboard
} from 'react-native';
import { format } from 'date-fns'

import { api } from '../../services/api'

export default function Register() {

  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('');
  const [apiLoading, setApiLoading] = useState(false)

  async function handleRegister() {

    setApiLoading(true)

    Keyboard.dismiss()

    if (description === '' || value === '' || type === '') return

    const date = format(new Date(), 'dd/MM/yyyy')

    try {
      await api.post('/receive', {
        description,
        value: Number(value),
        type,
        date
      })

      setDescription('')
      setValue('')
      setType('')

      setApiLoading(false)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Registrar</Text>

      <View style={styles.containerInputs}>
        <TextInput
          value={description}
          onChangeText={text => setDescription(text)}
          keyboardType="default"
          placeholder='Descrição'
          style={styles.input}
        />

        <TextInput
          value={value}
          onChangeText={text => setValue(text)}
          keyboardType="number-pad"
          placeholder='R$ 0,00'
          style={styles.input}
        />
      </View>

      <View style={styles.containerOperations}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={type === 'receita' ?
            [styles.btnOperations,
            { backgroundColor: '#fff', borderColor: "#3B3DBF", borderWidth: 2, marginRight: 5 }]
            :
            [styles.btnOperations,
            { backgroundColor: '#E7E7E7', marginRight: 5 }]
          }
          onPress={() => { setType('receita') }}
        >
          <Text style={styles.btnOperationsLabel}>Receita</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={type === 'despesa' ?
            [styles.btnOperations, { backgroundColor: '#fff', borderColor: "#3B3DBF", borderWidth: 2 }]
            :
            [styles.btnOperations, { backgroundColor: '#E7E7E7' }]
          }
          onPress={() => { setType('despesa') }}
        >
          <Text style={styles.btnOperationsLabel}>Despesa</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.btnRegister}
        onPress={handleRegister}
      >
        {apiLoading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.btnRegisterLabel}>Registrar</Text>
        )}
      </TouchableOpacity>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FF',
    paddingTop: 50,
    paddingHorizontal: '5%'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#000",
    marginBottom: 15
  },
  containerInputs: {
    alignItems: 'center'
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
    color: '#777777'
  },
  containerOperations: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnOperations: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 4,
  },
  btnOperationsLabel: {
    color: '#000',
    fontSize: 20
  },
  btnRegister: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#00B94A',
    borderRadius: 4,
  },
  btnRegisterLabel: {
    color: '#fff',
    fontSize: 20
  }
})