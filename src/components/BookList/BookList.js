import React, {Fragment} from "react";
import {Button, ListGroup, ListGroupItem, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import Loader from '../Loader/Loader';
import './BookList.scss'

class bookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    const {value, onRemoveBook, onEditBook, Books, currentPage, itemsPerPage, onInputChange, loaded} = this.props;
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
                  <ListGroupItem key={index} className="text-center" onClick={(value) => {
                    console.log("data", value);
                  }}>
                    <img alt="book" src={`https://placem.at/things?w=200&h=200&random=1&t=${index + 1000}`}/>
                    <p>
                      {Book.title}
                    </p>
                    <p>{Book.author}</p>

                    <Button color="warning"
                            onClick={() => onEditBook(Book)}
                            style={{marginBottom: "10px",borderRadius:"1rem 0 0 1rem"}}> E d i t  </Button>
                    <Button
                      style={{marginBottom: "10px",borderRadius:"0 1rem 1rem 0"}}
                      color="danger"
                      onClick={() => onRemoveBook(Book)}>
                      D e l e t e
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