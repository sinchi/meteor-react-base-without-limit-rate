import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

export const PublicNavigation = () => (
  <Nav pullRight>
    <LinkContainer to="signup">
      <NavItem eventKey={ 1 } href="/signup">Créer un compte</NavItem>
    </LinkContainer>
    <LinkContainer to="login">
      <NavItem eventKey={ 2 } href="/login">Connexion</NavItem>
    </LinkContainer>
  </Nav>
);
