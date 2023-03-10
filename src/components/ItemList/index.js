import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ItemList({ data, deleteItem }) {

    const { type, value } = data

    return (
        <TouchableOpacity
         activeOpacity={0.6}
         style={styles.container}
         onPress={deleteItem}
         >
            <View
                style={type === 'despesa' ?
                    [styles.tagType, { backgroundColor: '#EF463A' }] :
                    [styles.tagType, { backgroundColor: '#00B94A' }]
                }
            >
                {type === 'despesa' ? (
                    <Icon name="arrow-down" size={14} color="#FFF"/>
                ) : (
                    <Icon name="arrow-up" size={14} color="#FFF"/>
                )}
                <Text style={styles.labelType}>{type}</Text>
            </View>


            <Text style={styles.labelAmount}> R$ {Number(value).toFixed(2)}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        backgroundColor: '#F0F3FF',
        marginBottom: 10,
        padding: 10,
        borderRadius: 4,
    },
    tagType: {
        flexDirection: 'row',
        padding: 4,
        borderRadius: 4,
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelType: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 14
    },
    labelAmount: {
        fontSize: 24,
        color: '#000'
    }

})

