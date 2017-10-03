// Import Actions
import { LOGIN_USER, LOGOUT_USER, CONNECTED_USER, CONNECTED_USERS, DISCONNECTED_USER, REGISTER_USER } from './UserActions';

import storage from '../../util/storage';

// Initial State
const initialState = {
    user: {
        token: null,
    },
    data: []
};

const UserReducer = (state = initialState, action) => {

    switch (action.type) {

        case LOGIN_USER:
            if( storage ) {
                // Save token in local storage
                console.log('stored Token', action.token);
                storage.setItem('jwtToken', action.token);
            }
            action.user.token = action.token;
            action.user.connected = 1;
            console.log(Object.assign({}, state.user, action.user));
            return {
                ...state,
                user: Object.assign({}, state.user, action.user)
            };

        case LOGOUT_USER:
            if( storage ) {
                storage.removeItem('jwtToken');
            }
            return {
                ...state,
                user: null
            };

        case CONNECTED_USER:
            return {
                ...state,
                data: [...state.data, action.user]
            };

        case CONNECTED_USERS:
            return {
                ...state,
                data: action.users
            }

        case DISCONNECTED_USER:
            const newData = state.data.filter(user => user.cuid != action.user.cuid);
            return {
                ...state,
                data: newData
            };

        default:
            return state;
    }
};



export default UserReducer;
