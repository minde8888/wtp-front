import AuthService from "../services/api/authServices"

const PASSWORS_SEND = "PASSWORS_SEND",
    SET_MESSAGE = "SET_MESSAGE",
    SEND_EMAIL = "SEND_EMAIL",
    SEND_FEIL = "SEND_FEIL"

export const getPassword = (email) => (dispatch) => {
    return AuthService.getPassword(email).then(
        async (response) => {
            dispatch({
                type: SEND_EMAIL,
            });
        },
        (error) => {
            var str = JSON.stringify(error.response.data);

            var mySubString = str.substring(
                str.indexOf("[") + 2,
                str.lastIndexOf("]") - 1
            );

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            console.log(message);
            dispatch({
                type: SEND_FEIL,
                payload: mySubString,
            });
        }
    );
}

export const getNewPassword = (email, token, password) => (dispatch) => {

    return AuthService.getNewPassword(email, token, password)
        .then(
            async (response) => {
                
                if (response.status === 200) {
                    console.log(response);
                    dispatch({
                        type: PASSWORS_SEND,
                        payload: response.data.message,
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
                    type: SET_MESSAGE,
                    payload: message,
                });
                return Promise.reject();
            })
}