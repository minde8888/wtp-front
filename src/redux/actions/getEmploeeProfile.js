import UserService from "../services/api/userService";
import { employeeConstants } from "../constants/employeeConstants";

export const getEmploeeProfile = (id) => (dispatch) => {
    return UserService.getEmployee(id).then(
        async (response) => {

            response.data.$values.forEach(el => {
                dispatch({
                    type: employeeConstants.EMPLOYEE_DATA,
                    payload: el,
                    userIsLoadied: true
                });
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
                type: employeeConstants.EMPLOYEE_DATA_ERROR,
                payload: error.response.data,
                userIsLoadied: false
            });
            console.log(message);
            return Promise.reject();
        }
    );
}

