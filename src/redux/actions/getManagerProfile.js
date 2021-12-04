import UserService from "../services/api/userService";
import { managerConstants } from "../constants/managerConstatnts";

export const getManagerProfile = (id) => (dispatch) => {
    return UserService.getManager(id).then(
        async (response) => {
            console.log(response);
            //     response.data.$values.forEach(el => {
            //         dispatch({
            //             type: EMPLOYEE_DATA,
            //             payload: el,
            //             userIsLoadied: true
            //         });
            // });

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