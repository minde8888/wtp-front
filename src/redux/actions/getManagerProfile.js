import UserService from "../services/api/userService";
import { managerConstants } from "../constants/managerConstatnts";
import { authConstants } from "../constants/authConstants";

export const getManagerProfile = (id) => (dispatch) => {
    return UserService.getManager(id).then(
        async (response) => {
            const oldData = JSON.parse(localStorage.getItem('user'));
            localStorage.removeItem('user');
            response.data.$values.forEach(el => {
                const user = {
                    id: el.id,
                    name: el.name,
                    surname: el.surname,
                    email: el.email,
                    imageName: el.imageName,
                    imageSrc: el.imageSrc,
                    isActine: el.isActive,
                    mobileNumber: el.phoneNumber,
                    occupation: el.occupation,
                    role: el.role,
                    address: el.address
                }
                const data = {
                    user: user,
                    employees: el.employees.$values,
                    token: oldData.token
                }
                localStorage.setItem('user', JSON.stringify(data));

                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    data: data
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
                type: managerConstants.MANAGER_DATA_ERROR,
                payload: error.response.data,
                userIsLoadied: false
            });
            console.log(message);
            return Promise.reject();
        }
    );
}