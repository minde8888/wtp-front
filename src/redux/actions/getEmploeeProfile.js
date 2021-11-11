import UserService from "../services/api/userService";

const EMPLOYEE_DATA = "EMPLOYEE_DATA",
    EMPLOYEE_DATA_ERROR = "EMPLOYEE_DATA_ERROR"

export const getEmploeeProfile = (id) => (dispatch) => {
    return UserService.getEmployee(id).then(
        async (response) => {

            response.data.$values.forEach(el => {
                dispatch({
                    type: EMPLOYEE_DATA,
                    data: el
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
                payload: message,
            });
            console.log(error);
            return Promise.reject();
        }
    );
}

