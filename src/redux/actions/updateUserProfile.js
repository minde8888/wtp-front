import UserService from "../services/api/userService";

const USER_DATA = "USER_DATA",
    USER_DATA_ERROR = "USER_DATA_ERROR",
    GET_FILE = "GET_FILE"

export const updateprofile = (Id, obj) => (dispatch) => {

    return UserService.updateUserInfo(Id, obj).then(
        async (response) => {
            var data = JSON.parse(localStorage.getItem('user'));
            delete data.user
            data = {
                ...data,
                user: response.data
            }
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({
                type: USER_DATA,
                payload: response.data,
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
            });
            console.log(message);
            return Promise.reject();
        }
    );
}

export const newFile = (ImageFile) => ({
    type: GET_FILE,
    payload: ImageFile
})