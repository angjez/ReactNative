import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import IconColoredButton from '../components/IconColoredButton.js'

const HomeScreen = ({ navigation }) => {
    const buttons = [
        {
            name: 'Tic tac toe',
            iconName: 'game-controller-outline',
            routeName: 'TicTacToe'
        },
        {
            name: 'TODO list',
            iconName: 'list',
            routeName: ''
        },
        {
            name: 'Weather',
            iconName: 'sunny-outline',
            routeName: 'Weather'
        },
        {
            name: 'Timer',
            iconName: 'timer-outline',
            routeName: ''
        },
        {
            name: 'SearchBar',
            iconName: 'search-outline',
            routeName: 'SearchBar'
        },
    ]

    return (
        <View style={styles.viewStyle}>
            <FlatList
                keyExtractor = {item => item.name}
                data = {buttons}
                renderItem = {({item, index}) => {
                    return (
                        <IconColoredButton 
                        name={item.name} 
                        iconName={item.iconName} 
                        color={`rgba(114,0,165, ${1-index*buttons.length*0.03})`} 
                        routeName={item.routeName} 
                        navigation = {navigation}
                        />
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
    }
});

export default HomeScreen;
