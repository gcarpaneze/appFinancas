import React, { useState } from 'react';
import {
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars'

import { ptBR } from './localeConfigCalendar'

LocaleConfig.locales['pt-br'] = ptBR
LocaleConfig.defaultLocale = 'pt-br'

export default function CalendarModal({ setVisible, handleFilter }) {

    const [dateNow, setDateNow] = useState(new Date())
    const [markeddates, setMarketdates] = useState({})

    function handleOnDayPress(date){
        
        let markedDay = {};
        
        markedDay[date.dateString] = {
            selected: true,
            selectedColor: '#3b3dbf',
            textColor: '#FFF'
        }
        
        setMarketdates(markedDay)

        const day = String(date.day).length == 1 ? `0${date.day}` : String(date.day);
        const month = String(date.month).length == 1 ? `0${date.month}` : String(date.month);
        const year = String(date.year);
        const dateFormated = day + '/' + month + '/' + year;
        
        setDateNow(dateFormated);
      }
    
    
      function handleFilterDate(){
        handleFilter(dateNow);
        setVisible();
      }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={setVisible} >
                <View style={{ flex: 1 }}></View>
            </TouchableWithoutFeedback>

            <View style={styles.modalContent}>

            <Calendar
                    onDayPress={handleOnDayPress}
                    enableSwipeMonths={true}
                    markedDates={markeddates}
                    theme={{
                        todayTextColor: '#ff0000',
                        selectedDayBackgroundColor: '#3b3dbf',
                        selectedDayTextColor: '#FFF',
                    }}
                    style={{
                        width: 400,
                        height: 350
                    }}
                />

                <TouchableOpacity style={styles.btn} onPress={handleFilterDate}>
                    <Text style={styles.btnLabel}>Filtrar</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(34,34,34, 0.4)'
    },
    modalContent: {
        flex: 2,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        width: '85%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3B3DBF',
        borderRadius: 4,
    },
    btnLabel: {
        fontSize: 20,
        color: '#fff'
    }

})