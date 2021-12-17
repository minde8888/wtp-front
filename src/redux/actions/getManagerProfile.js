import UserService from "../services/api/userService";
import { managerConstants } from "../constants/managerConstatnts";
import { userConstants } from "../constants/userConstants";

export const getManagerProfile = (id) => (dispatch) => {
    return UserService.getManager(id).then(
        async (data) => {
            data.data.$values.forEach(el => {
                  dispatch({
                    type: userConstants.MANAGER_EMPLOYEE_UPDTE,
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
                type: managerConstants.MANAGER_DATA_ERROR,
                payload: error.response.data,
                userIsLoadied: false
            });
            console.log(message);
            return Promise.reject();
        }
    );
}