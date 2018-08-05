import React, {Fragment} from "react";
import {Button, ListGroup, ListGroupItem} from 'reactstrap';
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
            <p>All Books:{Books.length}</p>
            {/*<Input*/}
              {/*type="text"*/}
              {/*placeholder="Please, enter name of book or author name"*/}
              {/*value={value}*/}
              {/*onChange={({target}) => onInputChange(target.value)}*/}
            {/*/>*/}
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