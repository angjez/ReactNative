import * as React from 'react';
import { View, Text, StyleSheet, Modal, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import store from "./store/index.js";
import { Provider } from 'react-redux';
import { addArticle } from "./actions/index.js";

import Icon from 'react-native-vector-icons/Ionicons';

const ArticleListScreen = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [inputValue, onChangeText] = useState()

    return (
        <Provider store={store}>
            <View style={styles.viewStyle}>
                <FlatList
                    keyExtractor = {article => article}
                    data = {store.getState().articles}
                    renderItem = {({item}) => {
                        console.log(item)
                        return (
                            <View style={styles.itemStyle}> 
                                <Text style={styles.itemTextStyle}>{item}</Text>
                                <Icon.Button
                                onPress={() => {console.log('click')}}
                                name='close-outline'
                                backgroundColor='transparent'
                                underlayColor='transparent'
                                color='#b7003d'
                                >
                                </Icon.Button>
                            </View>
                        );
                    }}
                />
                <View style={{alignItems: 'center'}}>
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                    >
                        <View style={styles.modalViewStyle}>
                            <TextInput
                            style={styles.inputStyle}
                            onChangeText={text => onChangeText(text)}
                            value={inputValue}
                            />
                            <Icon.Button
                                onPress={() => {
                                    if(inputValue) {store.dispatch(addArticle(inputValue))}
                                    setModalVisible(false)
                                }}
                                name='checkmark-outline'
                                backgroundColor='transparent'
                                underlayColor='transparent'
                                color='#b7003d'
                            />
                            <Icon.Button
                                onPress={() => {
                                    setModalVisible(false)
                                    onChangeText('')
                                }}
                                name='close-outline'
                                backgroundColor='transparent'
                                underlayColor='transparent'
                                color='#b7003d'
                            />
                        </View>
                    </Modal>
                    <Icon.Button
                    onPress={() => {setModalVisible(true)}}
                    name='add-outline'
                    backgroundColor='#00bd8c'
                    >
                    Add article
                    </Icon.Button>
                </View>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        justifyContent: 'space-between',
        margin: 20,
        marginTop: 100,
    },
    itemStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomColor: '#00bd8c',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    itemTextStyle: {
        fontSize: 16,
        marginTop: 10,
        fontWeight: '300',
    },
    inputStyle: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        margin: 5,
        flex: 0.9,
    },
    modalViewStyle: {
        flex: 1,
        marginTop: 800,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20,
        backgroundColor: "white",
    },
});

export default ArticleListScreen;