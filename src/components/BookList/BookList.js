import React, {Fragment} from "react";
import { Button, ListGroup, ListGroupItem, Input ,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Loader from '../Loader/Loader';
// import Pagination from "../Pagination/index";
import './BookList.scss'

class bookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const {value, onRemoveBook, onAddBook, Books, currentPage, itemsPerPage, onInputChange, loaded} = this.props;
    const startOffset = (currentPage - 1) * itemsPerPage;
    let startCount = 0;

    return (
      <Fragment>
        {loaded ? (
          <div className="search-list">
            <p>last {Books.length} Book</p>
            <Input
              type="text"
              placeholder="Please, enter name of book or author name"
              value={value}
              onChange={({target}) => onInputChange(target.value)}
            />
            <ListGroup>
              {Books.map((Book, index) => {
                return index >= startOffset && startCount < itemsPerPage ? ++startCount && (
                  <ListGroupItem
                    key={index}
                    className="text-center">
                    <img

                      src={`https://placem.at/things?w=150&h=100&random=1&t=${Math.random() * 10000}`}
                    />
                    <p>
                      {Book.title}
                    </p>

                    <h3>Author Name:</h3>
                    <p>{Book.author}</p>

                    <h3>Published Date:</h3>
                    <p>{Book.date}</p>
                    <Button color="danger" onClick={this.toggle}>Edit</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                      <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                      <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                    {!Book.isBook ? (
                      <Button
                        style={{marginBottom: "10px"}}
                        color="success"
                        onClick={() => onAddBook(Book)}>
                        Add To List
                      </Button>
                    ) : (
                      <Button
                        style={{marginBottom: "10px"}}
                        color="danger"
                        onClick={() => onRemoveBook(Book)}>
                        Remove From Friend List
                      </Button>
                    )}
                  </ListGroupItem>
                ) : (
                  null
                );
              })}
            </ListGroup>

          </div>
        ) : <Loader/>}
      </Fragment>
    );
  }
  ;
}

export default bookList;