import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

import { loginRequest } from '../../UserActions';

// Import Components
import UserLoginForm from '../../components/UserLoginForm'


class UserLoginPage extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(email, password) {
        this.props.dispatch(loginRequest(email, password));
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col md={{ size: 6, offset: 3 }}>
                            <UserLoginForm login={this.handleLogin} />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

// Retrieve data from store as props
function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(UserLoginPage);
