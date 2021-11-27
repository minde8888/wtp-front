import UserService from "../services/api/userService";

const EMPLOYEE_DATA = "EMPLOYEE_DATA",
    EMPLOYEE_DATA_ERROR = "EMPLOYEE_DATA_ERROR"

export const getEmploeeProfile = (id) => (dispatch) => {
    return UserService.getEmployee(id).then(
        async (response) => {

            response.data.$values.forEach(el => {
                dispatch({
                    type: EMPLOYEE_DATA,
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
                type: EMPLOYEE_DATA_ERROR,
                payload: error.response.data,
                userIsLoadied: false
            });
            console.log(message);
            return Promise.reject();
        }
    );
}

