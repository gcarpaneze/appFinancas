import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Modal,
  Alert
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { format } from 'date-fns'

import ItemList from '../../components/ItemList';
import CalendarModal from '../../components/CalendarModal';

import { api } from '../../services/api';

export default function Home() {

  const isFocused = useIsFocused()

  const [dateMovements, setDateMoviments] = useState(format(new Date, 'dd/MM/yyyy'))
  const [balance, setBalance] = useState({});
  const [revenue, setRevenue] = useState({});
  const [expenses, setExpenses] = useState({});
  const [moviments, setMoviments] = useState([])
  const [updateList, setUpdateList] = useState(true)

  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {

    let isActive = true;

    async function getBalance() {

      try {

        const balances = await api.get('/balance', {
          params: {
            date: dateMovements
          }
        })



        const movimentsOfDay = await api.get('/receives', {
          params: {
            date: dateMovements
          }
        })

        if (isActive) {
          setBalance(balances.data[0].saldo)
          setRevenue(balances.data[1].saldo)
          setExpenses(balances.data[2].saldo)
          setMoviments(movimentsOfDay.data)
        }

      } catch (error) {
        console.log(error)
      }
    };

    getBalance();

    return () => isActive = false;

  }, [dateMovements, isFocused, updateList])

  function filterDateMovements(dateSelected) {

    setDateMoviments(dateSelected);
  }

  function handleDeleteMoviment(item_id) {

    Alert.alert("Atenção!",
      "Deseja remover essa transação?",
      [
        {
          text: 'Cancelar',
          onPress: () => { return },
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: async () => {
            try {

              await api.delete('/receives/delete', {
                params: {
                  item_id: item_id
                }
              })

              setUpdateList(!updateList)

            } catch (error) {
              console.log(error)
            }

          },
          style: 'default'
        }
      ]
    )

  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ height: '25%', marginBottom: 10, marginTop: 15 }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            paddingHorizontal: 15,
          }}
        >
          <View style={[styles.ScrowViewItem, { backgroundColor: '#3B3DBF' }]}>
            <Text style={styles.labelScrowView}>Saldo atual</Text>
            <Text style={styles.labelAmountScrowView}>R$ {Number(balance).toFixed(2)}</Text>
          </View>

          <View style={[styles.ScrowViewItem, { backgroundColor: '#00B94A' }]}>
            <Text style={styles.labelScrowView}>Entradas de hoje</Text>
            <Text style={styles.labelAmountScrowView}>R$ {Number(revenue).toFixed(2)}</Text>
          </View>

          <View style={[styles.ScrowViewItem, { backgroundColor: '#EF463A' }]}>
            <Text style={styles.labelScrowView}>Saídas de hoje</Text>
            <Text style={styles.labelAmountScrowView}>R$ {Number(expenses).toFixed(2)}</Text>
          </View>

        </ScrollView>
      </View>


      <View style={styles.containerTransactions}>

        <View style={styles.containerTitle}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon name="calendar-o" size={20} color="#171717" />
          </TouchableOpacity>
          <Text style={styles.title}>Últimas movimentações</Text>
        </View>

        <View style={{ width: '100%' }}>
          <FlatList
            data={moviments}
            renderItem={({ item }) => <ItemList data={item} deleteItem={() => handleDeleteMoviment(item.id)} />}
          />
        </View>

      </View>

      <Modal visible={modalVisible} transparent={true} animationType='fade'>
        <CalendarModal
          setVisible={() => setModalVisible(false)}
          handleFilter={filterDateMovements}
        />
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1
  },
  ScrowViewItem: {
    width: 300,
    height: '100%',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
    marginRight: 10
  },
  labelScrowView: {
    color: '#FFF',
    fontSize: 20
  },
  labelAmountScrowView: {
    color: '#FFF',
    fontSize: 40
  },
  containerTransactions: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 15
  },
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  title: {
    color: '#171717',
    fontSize: 18,
    marginLeft: 15
  }

})