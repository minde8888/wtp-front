import UserService from "../services/api/userService";
import { userConstants } from "../constants/userConstants";
import { employeeConstants } from "../constants/employeeConstants";
import { messageConstants } from "../constants/messageConstants";

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


export const getManagerProfile = (id) => (dispatch) => {
    return UserService.getManager(id).then(
        (data) => {
            data.data.$values.forEach(el => {
                dispatch({
                    type: userConstants.MANAGER_EMPLOYEE_UPDATE,
                    payload: el.employees.$values,
                });
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
                type: userConstants.MANAGER_DATA_ERROR,
                payload: error.response.data,
                userIsLoaded: false
            });
            console.log(message);
            return Promise.reject();
        }
    );
}

export const getEmployeeProfile = (id) => (dispatch) => {
    return UserService.getEmployee(id).then(
        (response) => {
            response.data.$values.forEach(el => {
                dispatch({
                    type: employeeConstants.EMPLOYEE_PROFILE,
                    payload: el
                });
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
                type: employeeConstants.EMPLOYEE_PROFILE_ERROR,
                payload: error.response.data,
            });
            console.log(message);
            return Promise.reject();
        }
    );
}

export const deleteUser = (id, role) => (dispatch) => {
    return UserService.deleted(id, role).then(
        () => {
            dispatch({
                type: userConstants.DELETED_EMPLOYEE,
                payload: id
            })
            let user = JSON.parse(localStorage.getItem('user'));
            const index = user.employees.$values.findIndex(i => i.id === id);
            user.employees.$values.splice(index, 1);
            localStorage.setItem('user', JSON.stringify(user));

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
                type: messageConstants.ERROR,
                payload: error.response.data,
            });
            console.log(message);
            return Promise.reject();
        }
    );
}
