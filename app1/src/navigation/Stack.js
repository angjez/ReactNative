import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen.js'
import TicTacToeScreen from '../screens/TicTacToe/TicTacToeScreen.js'

const Stack = createStackNavigator();

const Containter = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
          <Stack.Screen name='Home' component={HomeScreen}/>
          <Stack.Screen name='TicTacToe' component={TicTacToeScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default Containter;