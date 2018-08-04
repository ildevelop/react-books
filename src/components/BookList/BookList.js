import React, {Fragment} from "react";
import { Button, ListGroup, ListGroupItem, Input ,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Loader from '../Loader/Loader';
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
    const {value, onRemoveBook, Books, currentPage, itemsPerPage, onInputChange, loaded} = this.props;
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
                  <ListGroupItem key={index} className="text-center">
                    <img alt="book" src={`https://placem.at/things?w=200&h=200&random=1&t=${index +1000}`}/>
                    <p>
                      {Book.title}
                    </p>
                    <p>{Book.author}</p>
                    <Button color="warning" onClick={this.toggle}>Edit</Button>

                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                      <ModalHeader toggle={this.toggle}>Edit book</ModalHeader>
                      <ModalBody>
                        <p>
                          {Book.title}
                        </p>

                        <h3>Author Name:</h3>
                        <p>{Book.author}</p>

                        <h3>Published Date:</h3>
                        <p>{Book.date}</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                    <Button
                      style={{marginBottom: "10px"}}
                      color="danger"
                      onClick={() => onRemoveBook(Book)}>
                      Delete
                    </Button>
                  </ListGroupItem>
                ) : <Loader/>
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