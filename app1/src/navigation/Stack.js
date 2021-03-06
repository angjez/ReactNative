import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen.js';
import WeatherScreen from '../screens/Weather/WeatherScreen.js';
import TicTacToeScreen from '../screens/TicTacToe/TicTacToeScreen.js';
import SearchBarScreen from '../screens/SearchBar/SearchBarScreen.js';
import ArticleListScreen from '../screens/ArticleList/AtricleListScreen.js';
import PressableScreen from '../screens/Pressable/PressableScreen.js';

const Stack = createStackNavigator();

const Containter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TicTacToe" component={TicTacToeScreen} />
        <Stack.Screen name="Weather" component={WeatherScreen} />
        <Stack.Screen name="SearchBar" component={SearchBarScreen} />
        <Stack.Screen name="ArticleList" component={ArticleListScreen} />
        <Stack.Screen name="Pressable" component={PressableScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Containter;
