import * as React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Notifications} from 'react-native-notifications';
import {SvgUri} from 'react-native-svg';

const PressableScreen = () => {
  return (
    <View style={styles.viewStyle}>
      <Pressable
        onPress={() => {
          Notifications.postLocalNotification(
            {
              body: 'Short press detected',
              title: 'Button pressed!',
              sound: 'chime.aiff',
            },
            1,
          );
        }}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'grey' : '#aff706',
            marginBottom: 40,
          },
          styles.wrapperCustom,
        ]}>
        {({pressed}) => (
          <Text style={styles.text}>{pressed ? 'Pressed!' : 'Press Me'}</Text>
        )}
      </Pressable>
      <Pressable
        onLongPress={() => {
          Notifications.postLocalNotification(
            {
              body: 'Long press detected',
              title: 'Button pressed!',
              sound: 'chime.aiff',
            },
            1,
          );
        }}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'grey' : '#aff706',
          },
          styles.wrapperCustom,
        ]}>
        {({pressed}) => (
          <Text style={styles.text}>{pressed ? 'Pressed!' : 'Long press'}</Text>
        )}
      </Pressable>
      <SvgUri width="100%" height="100%" uri="https://svgshare.com/i/NJe.svg" />
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    marginTop: 150,
    marginLeft: 20,
    marginRight: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
    height: 60,
    justifyContent: 'center',
  },
});

export default PressableScreen;
