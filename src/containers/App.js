import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import * as selector from './../selectors'
import * as mainActions from '../actions/mainActions';
import Header from "../components/Header/Header";
import BookList from "../components/BookList/BookList";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 20
    };
  };

  componentDidMount() {
    this.props.getBook();
  }

  componentDidUpdate() {
    localStorage.setItem("Books", JSON.stringify(this.props.Books));
  }
  handleSearchBook = value => {
    this.props.searchBook(value);
  };
  handleRemoveMyBook = Book => {
    this.props.removeBook(Book);
  };
  handleAddBook= Book => {
    this.props.addBook(Book);
  };

  page = page => {
    this.setState({
      currentPage: page
    });
  };

  render() {
    const { loaded,searchValue,searchedUsers} = this.props;
    const {itemsPerPage, currentPage} = this.state;

    return (
      <Container>
        <Header />
        <Switch>
          <Route
            exact path="/"
            render={() => {
              return (
                <BookList
                  loaded={loaded}
                  Books={searchedUsers}
                  value={searchValue}
                  onInputChange={this.handleSearchBook}
                  onAddBook={this.handleAddBook}
                  onRemoveBook={this.handleRemoveMyBook}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  page={this.page}
                />
              );
            }}
          />

        </Switch>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loaded: selector.getLoadingStatus(state),
  Book: selector.getBook(state),
  Books: selector.getBooks(state),
  searchValue:selector.getSearchValue(state),
  searchedUsers: selector.getSearchedBook(state),
  myBooks: selector.getMyBooks(state),


});

function mapDispatchToProps(dispatch) {
  return {...bindActionCreators(mainActions, dispatch)}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));