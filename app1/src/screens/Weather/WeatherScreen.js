import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import key from './APIKey.js';

const chooseIcon = (description) => {
    switch (description) {
        case 'Clear':
            return 'sunny-outline'
        case 'Clouds':
            return 'cloudy-outline'
        case 'Rain':
            return 'rainy-outline'
        default:
            return 'hourglass-outline'
    }
}

const TemperatureWithIcon = ({currentWeather, icon}) => {
    return (
        <View flexDirection='row'>
            <Icon name={icon} size={60} color='white'/>
            <Text style={styles.temperatureTextStyle}>{currentWeather ? `${Math.round(currentWeather.main.temp - 273.15)}°C` : 'Loading'}</Text>
        </View>
    );
}

const WeatherScreen = () => {
    const [todaysWeather, setTodaysWeather] = useState([])
    const [forecast, setForecast] = useState([])
    const [city, setCity] = useState()
    const [icon, setIcon] = useState()

    useEffect (() => {
        Geolocation.getCurrentPosition(info => {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${info.coords.latitude}&lon=${info.coords.longitude}&exclude={part}&appid=${key}`)
            .then(res => res.json())
            .then(json => {
                setCity(json.city.name)
                const today = []
                const fore = []
                const date = new Date()
                const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' }) 
                const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(date) 
                json.list.forEach((weather) => {
                    (weather.dt_txt.includes(`${year}-${month}-${day}`))
                    ? today.push(weather)
                    : fore.push(weather)
                })
                setForecast(fore)
                setTodaysWeather(today)
                setIcon(chooseIcon(today[0].weather[0].main))
            });
        });
    }, [])

    return (
        < LinearGradient 
        flex={1}
        colors={['#00859b', '#00bee3', '#44d2ef']}
        style={styles.linearGradient} >
            <View style={styles.viewStyle}>
                <TemperatureWithIcon currentWeather={todaysWeather[0]} icon={icon}/>
                <Text style={styles.cityTextStyle}>{city}</Text>
                <Text style={styles.descriptionTextStyle}>{todaysWeather[0] ? todaysWeather[0].weather[0].main : 'Loading'}</Text>
                <View style={styles.separatorStyle}/>
                <FlatList
                    horizontal={true}
                    key={todaysWeather.length}
                    scrollEnabled='true'
                    keyExtractor = {todaysWeather => todaysWeather.dt_txt}
                    data = {todaysWeather}
                    renderItem = {({item}) => {
                        return (
                            <View style={styles.flatlistItemViewStyle}>
                                <Text style={styles.flatListTextStyle}>{item.dt_txt[11]==0 ? item.dt_txt.substring(12, 13) : item.dt_txt.substring(11, 13)}</Text>
                                <Icon name={chooseIcon(item.weather[0].main)} size={15} color='white'/>
                                <Text style={styles.flatListTextStyle}>{`${Math.round(item.main.temp - 273.15)}°C`}</Text>
                            </View>
                        );
                    }}
                />
                <View style={styles.separatorStyle}/>
                <Text>Forecast</Text>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        marginTop: 100,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
    },
    separatorStyle: {
        margin: 5,
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignSelf: 'stretch',
    },
    temperatureTextStyle: {
        color: 'white',
        fontSize: 60,
        marginLeft: 10,
    },
    cityTextStyle: {
        color: 'white',
        fontSize: 30,
        fontWeight: '200',
    },
    descriptionTextStyle: {
        color: 'white',
        fontSize: 20,
    },
    flatlistItemViewStyle: {
        alignItems: 'center',
        padding: 15,
    },
    flatListTextStyle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '200',
    }
});

export default WeatherScreen;
