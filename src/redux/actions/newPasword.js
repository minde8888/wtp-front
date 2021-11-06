import AuthService from "../services/api/authServices"

const PASSWORS_SEND = "PASSWORS_SEND",
PASSWORS_SEND_ERROR = "PASSWORS_SEND_ERROR",
CLEAR_PASSWORS_MESSAGE = "CLEAR_PASSWORS_MESSAGE"


export const getPassword = (email) => (dispatch) => {
    return AuthService.getPassword(email).then(
        async (response) => {
            console.log(response);
            dispatch({
                type: PASSWORS_SEND,
            });
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: PASSWORS_SEND_ERROR,
                payload: message,
            });
        }
    );
}

export const getNewPassword = (email, token, password) => (dispatch) => {

    return AuthService.getNewPassword(email, token, password)
        .then(
            async (response) => {
                if (response.status === 200) {
                    dispatch({
                        type: PASSWORS_SEND,
                        payload: response.data.message,
                        send: true
                    });
                    return await Promise.resolve();
                }

                const message =
                    (response.response &&
                        response.response.data &&
                        response.response.data.message) ||
                    response.message ||
                    response.toString();

                dispatch({
                    type: PASSWORS_SEND_ERROR,
                    payload: message,
                    send: false
                });
                return Promise.reject();
            })
}

export const clearPasswordMessage = () => ({
    type: CLEAR_PASSWORS_MESSAGE
  });