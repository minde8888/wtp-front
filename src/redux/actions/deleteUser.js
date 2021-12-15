import UserService from "../services/api/userService";
import { messageConstants } from "../constants/messageConstants";
import { userConstants } from "../constants/userConstants";

export const deleteUser = (id, role) => (dispatch) => {
    return UserService.deleted(id, role).then(
        async () => {
            dispatch({
                type: userConstants.DELETED_EMPLOYEE,
                payload:id
            })
            var data = JSON.parse(localStorage.getItem('employees'));
            const employees = data.filter(item => item.id !== id);

            var emp = {
                employees: employees
            }
            delete emp.employees
            data = { ...emp }

            localStorage.setItem('user', JSON.stringify(data));

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
                type: messageConstants.SET_MESSAGE,
                payload: error.response.data,
            });
            console.log(message);
            return Promise.reject();
        }
    );
}
