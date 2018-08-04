import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import * as selector from './../selectors'
import * as mainActions from '../actions/mainActions';
import Header from "../components/Header/Header";
import BookList from "../components/BookList/BookList";
import { Button, Input,Label ,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 20,
      modal: false,
      author:"",
      title:"",
      id:null,
      date: new Date()
    };
    this.toggle = this.toggle.bind(this);

  };
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    this.props.getBook();
  }

  handleSearchBook = value => {
    this.props.searchBook(value);
  };
  handleRemoveMyBook = Book => {
    this.props.removeBook(Book);
  };
  onEditBook= Book => {
    console.log('onEditBook',Book);
    this.setState({
      author:Book.author,
      title:Book.title,
      date:Book.date,
      id:Book.id,
      img:Book.img,
      modal: !this.state.modal
    })
  };

  onUpdate(){
    this.props.editBook({author:this.state.author,title:this.state.title,date:this.state.date,id:this.state.id,img:this.state.img});
    this.toggle()
  }
  page = page => {
    this.setState({
      currentPage: page
    });
  };

  render() {
    const { loaded,searchValue,searchedUsers} = this.props;
    const {itemsPerPage, currentPage,author,title,date} = this.state;

    return (
      <div>
        <Header />
        <Container>

          <BookList
            loaded={loaded}
            Books={searchedUsers}
            value={searchValue}
            onInputChange={this.handleSearchBook}
            onEditBook={this.onEditBook}
            onRemoveBook={this.handleRemoveMyBook}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            page={this.page}
          />
          <Modal isOpen={this.state.modal} toggle={this.toggle} >
            <ModalHeader toggle={this.toggle}>Edit book</ModalHeader>
            <ModalBody>
              <Label for="exampleEmail">Author Name:</Label>
              <Input type="text"  placeholder="title of your book" value={author}
                     onChange={(value) => {
                       this.setState({author:value.target.value})
                       console.log("value",value.target.value);}} />


              <Label for="exampleEmail">Title</Label>
              <Input type="text"  placeholder="title of your book" value={title}
                     onChange={(value) => {
                       this.setState({title:value.target.value})
                console.log("value",value.target.value);}} />

              <Label for="exampleEmail">Published Date:</Label>
              <Input type="date"  placeholder="title of your book" value={date}
                     onChange={(value) => {
                       this.setState({date:value.target.value})
                       console.log("value",value.target.value);}} />

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Cancel</Button>
              <Button color="success" onClick={this.onUpdate.bind(this)}>Edit</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>

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