import UserService from "../services/api/userService";
import { messageConstants } from "../constants/messageConstants";
import { deleteConstants } from "../constants/deleteConstants";

export const deleteUser = (id, role) => (dispatch) => {
    return UserService.deleted(id, role).then(
        async () => {
            dispatch({
               type: deleteConstants.DELETED_USER,
               isFeleted: true
            })
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
