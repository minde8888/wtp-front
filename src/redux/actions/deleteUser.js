import UserService from "../services/api/userService";
import { messageConstants } from "../constants/messageConstants";
import { deleteConstants } from "../constants/deleteConstants";
import { authConstants } from "../constants/authConstants";

export const deleteUser = (id, role) => (dispatch) => {
    return UserService.deleted(id, role).then(
        async () => {

            dispatch({
                type: deleteConstants.DELETED_USER,
                isFeleted: true
            })
            var data = JSON.parse(localStorage.getItem('user'));
            const employees = data.employees.filter(item => item.id !== id);

            var emp = {
                employees: employees
            }
            delete data.employees
            data = { ...data, ...emp }

            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                data: data,
            });
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
