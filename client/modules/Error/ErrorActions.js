
import Alert from 'react-s-alert';

// export const TRIGGER_ERROR = 'TRIGGER_ERROR';

// Set in App.js
// const position = 'top-right';
// const effect = 'flip';
// const timeout = 3000;


export function displayErrors(type, message) {
    // console.log(type, message);
    // return {
    //     type: TRIGGER_ERROR,
    //     error: {
    //         type: type,
    //         message: message
    //     }
    // }
    switch(type) {
        case 'error':
            Alert.error(message);
            break;

        case 'warning':
            Alert.warning(message);
            break;

        case 'info':
            Alert.info(message);
            break;

        case 'success':
            Alert.success(message);
            break;


        default:
            alert(type + ' : ' + message);
    }
}
