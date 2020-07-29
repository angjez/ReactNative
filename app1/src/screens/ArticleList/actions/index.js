import {ADD_ARTICLE, DELETE_ARTICLE} from '../constants/action-types';

const addArticle = (payload) => {
  return {type: ADD_ARTICLE, payload};
};

const deleteArticle = (payload) => {
  return {type: DELETE_ARTICLE, payload};
};

export {addArticle, deleteArticle};
