import UserService from "../services/api/userService";
import { authConstants } from "../constants/authConstants";
import { updateUserConstants } from "../constants/updateUserConstants";


export const updateprofile = (Id, obj) => (dispatch) => {
    
    return UserService.updateUserInfo(Id, obj).then(
        async (response) => {
            const oldData = JSON.parse(localStorage.getItem('user'));
            localStorage.removeItem('user');

            const user = {
                id: response.data.id,
                name: response.data.name,
                surname: response.data.surname,
                email: response.data.email,
                imageName: response.data.imageName,
                imageSrc: response.data.imageSrc,
                isActine: response.data.isActive,
                mobileNumber: response.data.phoneNumber,
                occupation: response.data.occupation,
                role: response.data.role,
                address: response.data.address
            }

            const data = {
                user: user,
                employees: oldData.employees,
                token: oldData.token
            }
            localStorage.setItem('user', JSON.stringify(data));

            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                data: data,
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
                type: updateUserConstants.USER_DATA_ERROR,
                payload: message,
            });
            console.log(message);
            return Promise.reject();
        }
    );
}

export const newFile = (ImageFile) => ({
    type: updateUserConstants.GET_FILE,
    payload: ImageFile
})