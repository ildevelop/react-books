import * as mainConstanst from '../reducers/constant'

const mockApiData = require('./../data');
const books = (state) => state.books || [];
const formatTitle = (title) => title && title.replace(/\W/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase().split(' ')
  .map((word) => word && (word[0].toUpperCase() + word.slice(1))).join(' ') || '';

export const getBook = () => async dispatch => {
  dispatch({type: mainConstanst.FETCH_Books_START});
  let newBooks = mockApiData.map(book => ({
    author: book.author,
    date: book.date,
    title: formatTitle(book.title)

  }));
  setTimeout(() => {
    dispatch({
      type: mainConstanst.FETCH_Books_SUCCESS,
      Books: newBooks
    });
  }, 1000)


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
    payload: Book
  };
};
export const editBook = Book => {
  return {
    type: mainConstanst.REMOVE_MY_Book,
    payload: Book
  };
};
export const addBook = Book => {
  return {
    type: mainConstanst.ADD_MY_Book,
    Book
  };
};

