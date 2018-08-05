import React from "react";
// import { NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  NavLink,
} from 'reactstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {onEditBook} = this.props;
    return (
      <Navbar color="dark" expand="md">
        <NavbarBrand href="/">Books</NavbarBrand>
        <Collapse isOpen={true} navbar>
          <Nav className="ml-auto" navbar>
            <Button color="success" onClick={() => onEditBook({})}>Add new book</Button>
            <NavItem>
              <NavLink href="https://www.linkedin.com/in/ilya-radu-0770b5b8/">linkedin</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/ildevelop/react-books">GitHub</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  };
}

export default Header;