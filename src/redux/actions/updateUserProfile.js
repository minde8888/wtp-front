import UserService from "../services/api/userService";
import { userConstants } from "../constants/userConstants";


export const updateProfile = (Id, obj) => (dispatch) => {

    return UserService.updateUserInfo(Id, obj).then(
        (response) => {
            console.log(response.data);

            dispatch({
                type: userConstants.UPDATE_USER,
                payload: {
                    data: response.data,
                }

            });

            localStorage.setItem('user', JSON.stringify(response.data));
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
                type: userConstants.UPDATE_USER_ERROR,
                payload: message,
            });
            console.log(message);
            return Promise.reject();
        }
    );
}

export const newFile = (ImageFile, width, height) => ({
    type: userConstants.GET_FILE,
    payload: ImageFile,
    width: width,
    height: height
})