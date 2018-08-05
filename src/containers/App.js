import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Container} from 'reactstrap';
import * as selector from './../selectors'
import * as mainActions from '../actions/mainActions';
import Header from "../components/Header/Header";
import BookList from "../components/BookList/BookList";
import {Button, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 20,
      modal: false,
      modal2: false,
      author: "",
      title: "",
      id: null,
      newBook: null,
      img: null,
      date: "",
      deleteBook:{}
    };
    this.toggle = this.toggle.bind(this);
    this.modalDeleteBook = this.modalDeleteBook.bind(this);
    this.toggle2 = this.toggle2.bind(this);

  };

  toggle() {
    this.setState({
      modal: !this.state.modal,
      author: "",
      title: "",
      id: null,
      newBook: null,
      img: null,
      date: ""
    });
  }

  toggle2() {
    this.setState({
      modal2: !this.state.modal2
    })
  }

  componentWillMount() {
    this.props.getBook();
  }

  handleSearchBook = value => {
    this.props.searchBook(value);
  };
  handleRemoveMyBook = Book => {
    this.setState({deleteBook:Book});
    this.toggle2();
  };

  modalDeleteBook = () =>{
    this.props.removeBook(this.state.deleteBook);
    this.setState({deleteBook:{}, modal2: !this.state.modal2});

  }
  onEditBook = Book => {
    if (Book.id) {
      this.setState({
        author: Book.author,
        title: Book.title,
        date: Book.date,
        id: Book.id,
        img: Book.img,
        modal: !this.state.modal,
      })
    } else this.setState({modal: !this.state.modal, newBook: true})

  };

  onUpdate() {
    this.props.editBook({
      author: this.state.author,
      title: this.state.title,
      date: this.state.date,
      id: this.state.id,
      img: this.state.img,
      newBook: this.state.newBook
    });
    this.toggle()
  }

  page = page => {
    this.setState({
      currentPage: page,
    });
  };

  render() {
    const {loaded, Books} = this.props;
    const {itemsPerPage, currentPage, author, title, date} = this.state;
    return (
      <div>
        <Header onEditBook={this.onEditBook}/>
        <Container>
          <BookList
            loaded={loaded}
            Books={Books}
            onInputChange={this.handleSearchBook}
            onEditBook={this.onEditBook}
            onRemoveBook={this.handleRemoveMyBook}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            page={this.page}
          />
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>{this.state.id ? "Edit book" : "Add new book"}</ModalHeader>
            <ModalBody>
              <Label for="exampleEmail">Author Name:</Label>
              <Input type="text" placeholder="title of your book" value={author}
                     onChange={(value) => {
                       this.setState({author: value.target.value})
                     }}/>
              <Label for="exampleEmail">Title</Label>
              <Input type="text" placeholder="title of your book" value={title}
                     onChange={(value) => {
                       this.setState({title: value.target.value})
                     }}/>

              <Label for="exampleEmail">Published Date:</Label>
              <Input type="date" placeholder="title of your book" value={date}
                     onChange={(value) => {
                       this.setState({date: value.target.value})
                     }}/>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Cancel</Button>
              {
                this.state.id ? <Button color="success" onClick={this.onUpdate.bind(this)}>Edit</Button> :
                  <Button color="success" onClick={this.onUpdate.bind(this)}>Add</Button>
              }
            </ModalFooter>
          </Modal>
          <Modal isOpen={this.state.modal2} toggle={this.toggle2}>
            <ModalHeader toggle={this.toggle2}>Are you sure want to delete this?</ModalHeader>
            <ModalBody>{this.state.deleteBook.title}</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle2}>Cancel</Button>
              <Button color="danger" onClick={this.modalDeleteBook}>Yes delete!</Button>
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
  searchValue: selector.getSearchValue(state),
  searchedUsers: selector.getSearchedBook(state),
  counter: state.countBooks

});

function mapDispatchToProps(dispatch) {
  return {...bindActionCreators(mainActions, dispatch)}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));