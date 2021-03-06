import AuthService from "../services/api/authServices"

const PASSWORD_SEND = "PASSWORD_SEND",
    PASSWORD_SEND_ERROR = "PASSWORD_SEND_ERROR",
    CLEAR_PASSWORD_MESSAGE = "CLEAR_PASSWORD_MESSAGE"


export const getPassword = (email) => (dispatch) => {
    return AuthService.getPassword(email).then(
        () => {
            dispatch({
                type: PASSWORD_SEND,
            });
            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: PASSWORD_SEND_ERROR,
                payload: message,
            });
            return Promise.reject();
        }
    );
}

export const getNewPassword = (email, token, password) => (dispatch) => {

    AuthService.getNewPassword(email, token, password).then(
        (response) => {

            dispatch({
                type: PASSWORD_SEND,
                payload: response.data.message,
                send: true
            });
            return Promise.resolve();
        }).catch((response) => {
        const message = (response.response &&
                response.response.data &&
                response.response.data.message) ||
            response.message ||
            response.toString();
        dispatch({
            type: PASSWORD_SEND_ERROR,
            payload: message,
            send: false
        });
        return Promise.reject();
    })
}




export const clearPasswordMessage = () => ({
    type: CLEAR_PASSWORD_MESSAGE
});