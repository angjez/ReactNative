import * as React from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Ionicons';

const TicTacToeScreen = () => {
  const [circleCoordinates, setCircleCoordinates] = useState([]);
  const [crossCoordinates, setCrossCoordinates] = useState([]);
  const [whoseMove, setWhoseMove] = useState();
  const [won, setWon] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const fields = [
    {
      coordinates: 'x0y0',
    },
    {
      coordinates: 'x0y1',
    },
    {
      coordinates: 'x0y2',
    },
    {
      coordinates: 'x1y0',
    },
    {
      coordinates: 'x1y1',
    },
    {
      coordinates: 'x1y2',
    },
    {
      coordinates: 'x2y0',
    },
    {
      coordinates: 'x2y1',
    },
    {
      coordinates: 'x2y2',
    },
  ];

  useEffect(() => {
    if (circleCoordinates.length === 0) {
      setWhoseMove('Circle');
    } else {
      circleCoordinates.length === 5 && crossCoordinates.length === 4
        ? (setModalVisible(true), setWon('Tie!'))
        : checkIfWon();
      whoseMove === 'Circle' ? setWhoseMove('Cross') : setWhoseMove('Circle');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [circleCoordinates, crossCoordinates]);

  const BoardDescriptor = () => {
    return won ? (
      <Text style={styles.textStyle}>{won}</Text>
    ) : (
      <Text style={styles.textStyle}>It's {whoseMove}'s move!</Text>
    );
  };

  const makeMove = (coordinates) => {
    whoseMove === 'Circle'
      ? setCircleCoordinates([...circleCoordinates, coordinates])
      : setCrossCoordinates([...crossCoordinates, coordinates]);
  };

  const fieldState = (coordinates) => {
    if (circleCoordinates.includes(coordinates)) {
      return 'ellipse-outline';
    } else if (crossCoordinates.includes(coordinates)) {
      return 'close-outline';
    } else {
      return null;
    }
  };

  const checkIfWon = () => {
    const coordinatesToCheck =
      whoseMove === 'Circle' ? circleCoordinates : crossCoordinates;
    if (
      //vertical
      (coordinatesToCheck.includes('x0y0') &&
        coordinatesToCheck.includes('x0y1') &&
        coordinatesToCheck.includes('x0y2')) ||
      (coordinatesToCheck.includes('x1y0') &&
        coordinatesToCheck.includes('x1y1') &&
        coordinatesToCheck.includes('x1y2')) ||
      (coordinatesToCheck.includes('x2y0') &&
        coordinatesToCheck.includes('x2y1') &&
        coordinatesToCheck.includes('x2y2')) ||
      //horizontal
      (coordinatesToCheck.includes('x0y0') &&
        coordinatesToCheck.includes('x1y0') &&
        coordinatesToCheck.includes('x2y0')) ||
      (coordinatesToCheck.includes('x0y1') &&
        coordinatesToCheck.includes('x1y1') &&
        coordinatesToCheck.includes('x2y1')) ||
      (coordinatesToCheck.includes('x0y2') &&
        coordinatesToCheck.includes('x1y2') &&
        coordinatesToCheck.includes('x2y2')) ||
      //across
      (coordinatesToCheck.includes('x0y0') &&
        coordinatesToCheck.includes('x1y1') &&
        coordinatesToCheck.includes('x2y2')) ||
      (coordinatesToCheck.includes('x0y2') &&
        coordinatesToCheck.includes('x1y1') &&
        coordinatesToCheck.includes('x2y0'))
    ) {
      setWon(`${whoseMove} won!`);
      setModalVisible(true);
      return true;
    }
    return false;
  };

  return (
    <View style={styles.viewStyle}>
      <View style={styles.boardView} pointerEvents={won ? 'none' : 'auto'}>
        <View style={styles.rowView}>
          <FlatList
            numColumns="3"
            scrollEnabled="false"
            keyExtractor={(field) => field.coordinates}
            data={fields}
            renderItem={({item}) => {
              return (
                <View style={styles.squareStyle}>
                  <Icon.Button
                    name={fieldState(item.coordinates)}
                    backgroundColor="transparent"
                    underlayColor="transparent"
                    height="100%"
                    size={50}
                    color="#aff706"
                    justifyContent="center"
                    onPress={() => {
                      fieldState(item.coordinates) == null && won === false
                        ? makeMove(item.coordinates)
                        : null;
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
      </View>
      <BoardDescriptor />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}>
        <View style={styles.centeredView}>
          <Icon.Button
            name="refresh-outline"
            backgroundColor="#7200a5"
            underlayColor="#a700f2"
            size={40}
            onPress={() => {
              setCircleCoordinates([]);
              setCrossCoordinates([]);
              setWon(false);
              setModalVisible(false);
            }}>
            Play again
          </Icon.Button>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    marginTop: 100,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
  },
  boardView: {
    height: Math.round(Dimensions.get('window').width) - 30,
    width: Math.round(Dimensions.get('window').width) - 30,
    borderWidth: 2,
    borderColor: '#aff706',
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  squareStyle: {
    flex: 1,
    height: (Math.round(Dimensions.get('window').width) - 30) / 3,
    width: (Math.round(Dimensions.get('window').width) - 30) / 3,
    borderWidth: 2,
    borderColor: '#aff706',
  },
  textStyle: {
    fontSize: 40,
    marginTop: 50,
    fontWeight: '300',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Math.round(Dimensions.get('window').height) - 200,
  },
});

export default TicTacToeScreen;
