import UserService from "../services/api/userService";

const USER_DATA = "USER_DATA",
    USER_DATA_ERROR = "USER_DATA_ERROR",
    GET_FILE = "GET_FILE"

export const updateprofile = (obj) => (dispatch) => {

    return UserService.updateUserInfo(obj).then(
        async (response) => {
            console.log(response);
            response.data.$values.forEach(el => {
                dispatch({
                    type: USER_DATA,
                    payload: el,
                    userIsLoadied: true
                });
            });

            return await response;
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: USER_DATA_ERROR,
                payload: message,
                userIsLoadied: false
            });
            console.log(message);
            return Promise.reject();
        }
    );
}

export const newFile = (file) => ({
    type: GET_FILE,
    payload: file
})