import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import * as actionTypes from '../reducers/constant'

const initialState = {
  Books: [],
  searchedValue: "",
  loaded: false,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_Books_SUCCESS:
      return {...state, Books: action.Books, loaded: true};
    case actionTypes.SEARCH_Book:
      return {...state, searchedValue: action.value};
    case actionTypes.REMOVE_MY_Book:
      const searchedToRemove = state.Books.filter(book => book.id !== action.payload.id);
      return {...state,Books:searchedToRemove} ;
    case actionTypes.EDIT_MY_BOOK:
      const newNooks = state.Books.filter(book => book.id !== action.payload.id);
      newNooks.push(action.payload);
      return {...state,Books:newNooks } ;
    case actionTypes.ADD_NEW_BOOK:
      let newBooks = state.Books;
      newBooks.push(action.payload);
      return {...state,Books:newBooks } ;

    default:
      return state;
  }
};

const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store