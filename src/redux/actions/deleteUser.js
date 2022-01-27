import UserService from "../services/api/userService";
import { messageConstants } from "../constants/messageConstants";
import { userConstants } from "../constants/userConstants";

export const deleteUser = (id, role) => (dispatch) => {
    return UserService.deleted(id, role).then(
         () => {
            dispatch({
                type: userConstants.DELETED_EMPLOYEE,
                payload: id
            })            
            var data = JSON.parse(localStorage.getItem('employees'));
            const employees = data.filter(item => item.id !== id);
            localStorage.setItem('employees', JSON.stringify(employees));

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
                type: messageConstants.SET_MESSAGE,
                payload: error.response.data,
            });
            console.log(message);
            return Promise.reject();
        }
    );
}
