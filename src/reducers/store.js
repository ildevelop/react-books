import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import * as actionTypes from '../reducers/constant'
import * as dotProp from 'dot-prop-immutable';

const initialState = {
  Books: [],
  Book: {},
  searchedValue: "",
  loaded: false
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_Book:
      return {...state, Book: state.Book + 1};
    case actionTypes.FETCH_Books_SUCCESS:
      console.log('actionStore', action.Books);
      return {...state, Books: action.Books, loaded: true};
    case actionTypes.FETCH_LOCAL_BookS_SUCCESS:
      return {...state, Books: action.Books, loaded: true};
    case actionTypes.FETCH_Books_FAILURE:
      console.log('ERRR', action);
      return {...state, Books: action.data, loaded: true};
    case actionTypes.SEARCH_Book:
      return {...state, searchedValue: action.value};
    case actionTypes.ADD_MY_Book:
      const searchedToAdd = state.Books.findIndex(Book => Book.title=== action.Book.title);
      return dotProp.set(state, `Books.${searchedToAdd}.isBook`, true);
    case actionTypes.REMOVE_MY_Book:
      const searchedToRemove = state.Books.findIndex(Book => Book.title === action.Book.title);
      return dotProp.set(state, `Books.${searchedToRemove}.isBook`, false);

    default:
      return state;
  }
};

const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store