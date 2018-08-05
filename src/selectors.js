import { createSelector } from 'reselect';

export const getBooks = state => state.Books;
export const getBook = state => state.Book;
export const getSearchValue = state => state.searchedValue;
export const getLoadingStatus = state => state.loaded;

export const getSearchedBook= createSelector(getBooks, getSearchValue, (Books, searchValue) => {
  return Books.filter(Book => Book.title.includes(searchValue) || Book.author.includes(searchValue));
});



