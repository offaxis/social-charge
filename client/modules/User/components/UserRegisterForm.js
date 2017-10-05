import React, { PropTypes, Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { Row, Col, Card, CardHeader, CardBlock, ButtonGroup, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

export class UserRegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            lastname: '',
            firstname: '',
            errorFields: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState(
            {[name] : value}
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.email && this.state.password && this.state.lastname && this.state.firstname) {
            this.props.register({email: this.state.email, password: this.state.password, lastname: this.state.lastname, firstname: this.state.firstname});
        } else {
            let errorFields = [];
            if(!this.state.email) {
                errorFields.push('email');
            }
            if(!this.state.password) {
                errorFields.push('password');
            }
            if(!this.state.lastname) {
                errorFields.push('lastname');
            }
            if(!this.state.firstname) {
                errorFields.push('firstname');
            }
            this.setState({
                errorFields: errorFields
            });
            displayErrors('error', 'Veuillez remplir tous les champs !');
        }
    }


    hasErrorField(name) {
        return this.state.errorFields.indexOf(name) !== -1;
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader><FormattedMessage id="userRegister" /></CardHeader>
                    <CardBlock>
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col sm="6" className={this.hasErrorField('firstname') ? 'has-danger' : ''}>
                                    <FormGroup>
                                        <Label for="firstnameField">Prénom</Label>
                                        <Input type="text" name="firstname" id="firstnameField" className={this.hasErrorField('firstname') ? 'form-control-danger' : ''} onChange={this.handleChange}  value={this.state.firstname} />
                                    </FormGroup>
                                </Col>
                                <Col sm="6" className={this.hasErrorField('lastname') ? 'has-danger' : ''}>
                                    <FormGroup>
                                        <Label for="lastnameField">Nom</Label>
                                        <Input type="text" name="lastname" id="lastnameField" className={this.hasErrorField('lastname') ? 'form-control-danger' : ''} onChange={this.handleChange}  value={this.state.lastname} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Row>
                                    <Col sm="6" className={this.hasErrorField('email') ? 'has-danger' : ''}>
                                        <Label for="emailField">Email</Label>
                                        <Input type="text" name="email" id="emailField" className={this.hasErrorField('email') ? 'form-control-danger' : ''} onChange={this.handleChange} placeholder={this.props.intl.messages.userEmail} value={this.state.email} />
                                    </Col>
                                    <Col sm="6" className={this.hasErrorField('password') ? 'has-danger' : ''}>
                                        <Label for="passwordField"><FormattedMessage id="userPassword" /></Label>
                                        <Input type="password" name="password" id="passwordField" className={this.hasErrorField('password') ? 'form-control-danger' : ''} onChange={this.handleChange} placeholder={this.props.intl.messages.userPassword} value={this.state.password} />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <ButtonGroup className="btn-block">
                                    <Button color="secondary" outline tag={Link} to="/">Retour</Button>
                                    <Button  color="success" block disabled={!this.state.email || !this.state.password || !this.state.lastname || !this.state.firstname}><FontAwesome name="check" /> Valider</Button>
                                </ButtonGroup>
                            </FormGroup>
                        </Form>
                    </CardBlock>
                </Card>
            </div>
        );
    }
}


export default injectIntl(UserRegisterForm);
