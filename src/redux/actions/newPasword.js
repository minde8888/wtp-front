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
            console.log(error);
            var str = JSON.stringify(error.response.data);
            console.log(error);
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
                type: URL_ERROR,
                payload: mySubString,
            });
            return Promise.reject();
        };
}