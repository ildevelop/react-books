import * as mainConstanst from '../reducers/constant'

const mockApiData = require('./../data');
const formatTitle = (title) => title && title.replace(/\W/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase().split(' ')
  .map((word) => word && (word[0].toUpperCase() + word.slice(1))).join(' ') || '';

export const getBook = () => async dispatch => {
  dispatch({type: mainConstanst.FETCH_Books_START});
  let newBooks = mockApiData.map(book => ({
    author: book.author,
    date: book.date,
    title: formatTitle(book.title),
    id:book.id,
    img:"https://placem.at/things?w=200&h=200&random="+book.id

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
  let newTitle = formatTitle(Book.title);
  if(Book.newBook){
    return {
      type: mainConstanst.ADD_NEW_BOOK,
      payload: {
        author: Book.author,
        title: newTitle,
        date: Book.date,
        id: Book.date,
        img: "https://placem.at/things?w=200&h=200&random="+Book.date,
      }
    };
  }else{
    return {
      type: mainConstanst.EDIT_MY_BOOK,
      payload: {
        author: Book.author,
        title: newTitle,
        date: Book.date,
        id: Book.id,
        img: Book.img,
      }
    };
  }

};


