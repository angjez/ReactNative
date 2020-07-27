import * as React from 'react';
import { ADD_ARTICLE } from "../constants/action-types.js";

const initialState = {
  articles: []
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_ARTICLE) {
      return Object.assign({}, state, {
        articles: state.articles.concat(action.payload)
      });
    }
    return state;
  }

export {rootReducer, initialState};