import * as mainConstanst from '../reducers/constant'

const mockApiData = require('./../data');

export const getBook = () => async dispatch => {
  dispatch({type: mainConstanst.FETCH_Books_START});
  setTimeout(() =>{
    dispatch({
      type: mainConstanst.FETCH_Books_SUCCESS,
      Books: mockApiData
    });
  },1000)


};
export const searchBook = value => {
  return {
    type: mainConstanst.SEARCH_Book,
    value
  };
};
export const removeBook = Book => {
  return {
    type: mainConstanst.REMOVE_MY_Book,
    Book
  };
};
export const addBook = Book => {
  return {
    type: mainConstanst.ADD_MY_Book,
    Book
  };
};

