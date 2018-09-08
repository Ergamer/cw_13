import React from 'react';
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

import UserMenu from "./Menus/UserMenu";
import AnonymousMenu from "./Menus/AnonymousMenu";

const Toolbar = ({user, logout}) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <LinkContainer to="/places" exact><a>Cafes</a></LinkContainer>
      </Navbar.Brand>
        <Nav>
            <LinkContainer to="/new-place" exact>
                <NavItem>Add new place</NavItem>
            </LinkContainer>
        </Nav>
    </Navbar.Header>
    <Navbar.Collapse>
      {user ? <UserMenu user={user} logout={logout} /> : <AnonymousMenu/>}
    </Navbar.Collapse>
  </Navbar>
);

export default Toolbar;