import * as React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';

const SearchBarScreen = () => {
    const [rates, setRates] = useState([])
    const [searchValue, onChangeText] = React.useState('Search exchange rates');

    useEffect (() => {
        fetch('https://api.exchangeratesapi.io/latest')
        .then(res => res.json())
        .then(json => {
            console.log(json.rates)
            setRates(Object.entries(json.rates))
            });
    }, [])

    const QueryResult = ({item}) => {
        if (searchValue=='Search exchange rates' || item[0].includes(searchValue)) {
            return <Text style={styles.textStyle}>{item[0]} {item[1]}</Text>
        }
        return null
    }

    return (
        <View style={styles.viewStyle}>
            <TextInput
                style={styles.searchStyle}
                onChangeText={text => onChangeText(text)}
                value={searchValue}
            />
            <FlatList
                keyExtractor = {rate => rate[0]}
                data = {rates}
                renderItem = {({item}) => {
                    console.log(item)
                    return (
                        <View>
                            <QueryResult item={item}/>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        marginTop: 100,
        marginLeft: 20,
        marginRight: 20,
    },
    searchStyle: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        margin: 5,
    },
    textStyle: {
        margin: 5,
        fontSize: 16,
    }
});

export default SearchBarScreen;
