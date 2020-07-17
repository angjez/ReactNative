import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import IconColoredButton from '../components/IconColoredButton.js'

const HomeScreen = () => {
    const buttons = [
        {
            name: 'Tic tac toe',
            iconName: 'game-controller-outline',
            routeName: ''
        },
        {
            name: 'TODO list',
            iconName: 'list',
            routeName: ''
        },
        {
            name: 'Weather',
            iconName: 'sunny-outline',
            routeName: ''
        },
        {
            name: 'Timer',
            iconName: 'timer-outline',
            routeName: ''
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
                        color={`rgba(0,145,89, ${1-index*buttons.length*0.05})`} 
                        routeName={''} 
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
