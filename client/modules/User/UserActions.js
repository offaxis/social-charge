import callApi from '../../util/apiCaller';

import { browserHistory } from 'react-router';

import { sendSocket } from '../App/AppActions';

// Export Constants
export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const CONNECTED_USER = 'CONNECTED_USER';
export const CONNECTED_USERS = 'CONNECTED_USERS';
export const DISCONNECTED_USER = 'DISCONNECTED_USER';


// Export Actions
export function registerRequest(email, password, name) {
    return (dispatch) => {
        return callApi('user/register', 'post', {email: email, password: password, name: name}).then(res => {
            console.log(res);
            if(res.user) {
                // dispatch(registerUser(res.user, res.token));
                dispatch(loginUser(res.user, res.token));
                dispatch(isLoggedIn());
            }
        });
    };
}

export function loginRequest(email, password) {
    return (dispatch) => {
        return callApi('user/login', 'post', {email: email, password: password}).then(res => {
            if(res.user) {
                dispatch(loginUser(res.user, res.token));
                dispatch(isLoggedIn());
            }
        });
    }
}

export function isLoggedIn() {
    console.log('isLoggedIn');
    return (dispatch) => {
        return callApi('user/getloggeduser').then(res => {
            if(res.user) {
                dispatch(loginUser(res.user, res.token));
                dispatch(getUserJoinedRoomsRequest(res.user));
                dispatch(sendSocket({type: 'userConnection', data: res.user}));
            } else {
                dispatch(logoutUser());
            }
        });
    };
}


export function registerUser(user) {
    return {
        type: REGISTER_USER,
        user: user
    };
}


export function loginUser(user, token) {
    token = token.replace('JWT ', '');
    return {
        type: LOGIN_USER,
        user: user,
        token: token
    };
}

export function logoutUser() {
    browserHistory.push('/');
    return {
        type: LOGOUT_USER
    };
}

export function userConnected(user) {
    return {
        type: CONNECTED_USER,
        user: user
    }
}

export function usersConnected(users) {
    return {
        type: CONNECTED_USERS,
        users: users
    }
}

export function userDisconnected(user) {
    return {
        type: DISCONNECTED_USER,
        user: user
    }
}
