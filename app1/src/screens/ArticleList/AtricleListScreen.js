import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import store from "./store/index.js";
import { Provider, connect } from 'react-redux';
import { addArticle } from "./actions/index.js";

const ArticleListScreen = () => {

    return (
        <Provider store={store}>
            <View style={styles.viewStyle}>
            </View>
        </Provider>
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
});

export default ArticleListScreen;