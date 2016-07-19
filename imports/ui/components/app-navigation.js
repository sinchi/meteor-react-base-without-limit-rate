import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import { PublicNavigation } from './public-navigation';
import { AuthenticatedNavigation } from './authenticated-navigation';
import { Icon } from 'react-fa';

export class AppNavigation extends React.Component {
  renderNavigation(hasUser) {
    return hasUser ? <AuthenticatedNavigation /> : <PublicNavigation />;
  }

  render() {
    return <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/"><Icon name="star-o" size="lg" /> Annoncio</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        { this.renderNavigation(this.props.hasUser) }
      </Navbar.Collapse>
    </Navbar>;
  }
}

AppNavigation.propTypes = {
  hasUser: React.PropTypes.object,
};
