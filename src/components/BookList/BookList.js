import React, {Fragment} from "react";
import {Button, ListGroup, ListGroupItem} from 'reactstrap';
import Loader from '../Loader/Loader';
import './BookList.css'

class bookList extends React.Component {
  render() {
    const { onRemoveBook, onEditBook, Books, currentPage, itemsPerPage, loaded} = this.props;
    const startOffset = (currentPage - 1) * itemsPerPage;
    let startCount = 0;
    return (
      <Fragment>
        {loaded ? (
          <div className="search-list">
            <p>All Books:{Books.length}</p>
            <ListGroup>
              {Books.map((Book, index) => {
                return index >= startOffset && startCount < itemsPerPage ? ++startCount && (
                  <ListGroupItem key={index} className="text-center">
                    <img alt="book" src={Book.img}/>
                    <p>{Book.author}</p>
                    <p>{Book.title}</p>

                    <Button color="warning"
                            onClick={() => onEditBook(Book)}
                            style={{borderRadius:"1rem 0 0 1rem"}}> E d i t  </Button>
                    <Button
                      style={{borderRadius:"0 1rem 1rem 0"}}
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