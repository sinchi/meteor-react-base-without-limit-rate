import React from 'react';
import { Row, Col, Alert, FormGroup, FormControl, Button } from 'react-bootstrap';
import { handleRecoverPassword } from '../../modules/recover-password';

export class RecoverPassword extends React.Component {
  componentDidMount() {
    handleRecoverPassword({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return <Row>
      <Col xs={ 12 } sm={ 6 } md={ 4 }>
        <h4 className="page-header">Mot de passe oublié</h4>
        <Alert bsStyle="info">
          Saisir votre email içi pour recevoir ton lien de redéfinition de votre mot de passe
          {/* Enter your email address below to receive a link to reset your password. */}
        </Alert>
        <form ref="recoverPassword" className="recover-password" onSubmit={ this.handleSubmit }>
          <FormGroup>
            <FormControl
              type="email"
              ref="emailAddress"
              name="emailAddress"
              placeholder="Email Address"
            />
          </FormGroup>
          <Button type="submit" bsStyle="success">Envoyer Mot de passe</Button>
        </form>
      </Col>
    </Row>;
  }
}
