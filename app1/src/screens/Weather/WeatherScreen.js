import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

import key from './APIKey.js';
import Geolocation from '@react-native-community/geolocation';

const WeatherScreen = () => {
    const [todaysWeather, setTodaysWeather] = useState([])
    const [forecast, setForecast] = useState([])

    useEffect (() => {
        Geolocation.getCurrentPosition(info => {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${info.coords.latitude}&lon=${info.coords.longitude}&exclude={part}&appid=${key}`)
            .then(res => res.json())
            .then(json => {
                const today = []
                const fore = []
                const date = new Date()
                const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' }) 
                const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(date) 
                json.list.forEach((weather) => {
                    (weather.dt_txt.includes(`${year}-${month}-${day}`))
                    ? today.push(weather)
                    : fore.push(weather)
                })
                setForecast(fore)
                setTodaysWeather(today)
            });
        });
    }, [])

    return (
        <View style={styles.viewStyle}>
            <Text>{todaysWeather[0].main.temp}</Text>
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
