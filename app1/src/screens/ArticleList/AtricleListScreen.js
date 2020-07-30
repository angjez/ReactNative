import * as React from 'react';
import {View, Text, StyleSheet, Modal, TextInput} from 'react-native';
import {useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {SvgUri} from 'react-native-svg';
import store from './store/index.js';
import {Provider} from 'react-redux';
import {addArticle, deleteArticle} from './actions/index.js';

import Icon from 'react-native-vector-icons/Ionicons';

const NoArticles = ({articles}) => {
  if (articles.length === 0) {
    return (
      <>
        <Text style={styles.headerStyle}>
          No articles yet, go ahead and add some!
        </Text>
        <SvgUri
          width="100%"
          height="50%"
          uri="https://svgshare.com/i/NMP.svg"
        />
      </>
    );
  }
  return null;
};

const ArticleListScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, onChangeText] = useState();
  const [articles, setArticles] = useState(store.getState().articles);

  return (
    <Provider store={store}>
      <View style={styles.viewStyle}>
        <NoArticles articles={articles} />
        <FlatList
          keyExtractor={(article) => article}
          data={articles}
          renderItem={({item}) => {
            return (
              <View style={styles.itemStyle}>
                <Text style={styles.itemTextStyle}>{item}</Text>
                <Icon.Button
                  onPress={() => {
                    store.dispatch(deleteArticle(item));
                    setArticles(store.getState().articles);
                  }}
                  name="close-outline"
                  backgroundColor="transparent"
                  underlayColor="transparent"
                  color="#7200a5"
                />
              </View>
            );
          }}
        />
        <View style={{alignItems: 'center'}}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.modalViewStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => onChangeText(text)}
                value={inputValue}
              />
              <Icon.Button
                onPress={() => {
                  if (inputValue) {
                    store.dispatch(addArticle(inputValue));
                    setArticles(store.getState().articles);
                  }
                  setModalVisible(false);
                  onChangeText('');
                }}
                name="checkmark-outline"
                backgroundColor="transparent"
                underlayColor="transparent"
                color="#7200a5"
              />
              <Icon.Button
                onPress={() => {
                  setModalVisible(false);
                  onChangeText('');
                }}
                name="close-outline"
                backgroundColor="transparent"
                underlayColor="transparent"
                color="#7200a5"
              />
            </View>
          </Modal>
          <Icon.Button
            onPress={() => {
              setModalVisible(true);
            }}
            name="add-outline"
            backgroundColor="#7200a5">
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
    borderBottomColor: '#aff706',
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
    backgroundColor: 'white',
  },
  headerStyle: {
    fontSize: 40,
    marginTop: 50,
    fontWeight: '300',
  },
});

export default ArticleListScreen;
