import AuthService from "../services/api/authServices"

const URL_CHANGE = "URL_CHANGE",
    URL_ERROR = "URL_ERROR"

export const getNewPassword = (email, token, password) => (dispatch) => {
    return AuthService.getNewPassword(email, token, password)
        .then(
            async (response) => {
                dispatch({
                    type: URL_CHANGE,
                    payload: response.data,
                });
                return await Promise.resolve();
            }),
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: URL_ERROR,
                payload: message,
            });
            return Promise.reject();
        };
}