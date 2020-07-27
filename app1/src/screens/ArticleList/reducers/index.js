import * as React from 'react';
import { ADD_ARTICLE, DELETE_ARTICLE } from "../constants/action-types.js";

const initialState = {
  articles: []
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_ARTICLE) {
      return Object.assign({}, state, {
        articles: state.articles.concat(action.payload)
      });
    } else if (action.type == DELETE_ARTICLE) {
        return Object.assign({}, state, {
            articles: state.articles.filter(item => !action.payload.includes(item))
        });
    
    }
    return state;
  }

export {rootReducer, initialState};