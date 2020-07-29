import * as React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useState, useEffect} from 'react';

const PressableScreen = () => {
  return (
    <View style={styles.viewStyle}>
      {/* <Pressable
        onPress={() => {
          console.log('pressed');
        }}>
        <Text>I'm pressable!</Text>
      </Pressable> */}
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
  text: {
    fontSize: 16,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
});

export default PressableScreen;
