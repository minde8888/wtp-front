import UserService from "../services/api/userService";
import { userConstants } from "../constants/userConstants";

export const getAllProjects = () => (dispatch) => {
    return UserService.getManager().then(
        async (data) => {
            data.data.$values.forEach(el => {
                  dispatch({
                    type: userConstants.MANAGER_EMPLOYEE_UPDATE,
                    payload: el.employees.$values,
                });
                localStorage.setItem('employees', JSON.stringify(el.employees.$values));
            });

            return await Promise.resolve();
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
                userIsLoadied: false
            });
            console.log(message);
            return Promise.reject();
        }
    );
}