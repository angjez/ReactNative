import * as React from 'react';
import {StyleSheet, View} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const IconColoredButton = ({name, iconName, color, routeName, navigation}) => {
  return (
    <View style={styles.buttonStyle}>
      <Icon.Button
        onPress={() => {
          navigation.navigate(routeName);
        }}
        name={iconName}
        backgroundColor={color}>
        {name}
      </Icon.Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginBottom: 15,
  },
});

export default IconColoredButton;
