import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import key from './APIKey.js';
import Geolocation from '@react-native-community/geolocation';

const WeatherScreen = () => {
    Geolocation.getCurrentPosition(info => {
        console.log(info)
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={${key}}`)
        .then(res => res.json())
        .then(json => {
          console.log(json);
        });
    });

    return (
        <View style={styles.viewStyle}>

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

export default WeatherScreen;
