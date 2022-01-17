import UserService from "../services/api/userService";
import { userConstants } from "../constants/userConstants";


export const updateProfile = (Id, obj) => (dispatch) => {

    return UserService.updateUserInfo(Id, obj).then(
        async (response) => {           

            const user = {
                id: response.data.id,
                name: response.data.name,
                surname: response.data.surname,
                email: response.data.email,
                imageName: response.data.imageName,
                imageSrc: response.data.imageSrc,
                isActive: response.data.isActive,
                mobileNumber: response.data.phoneNumber,
                occupation: response.data.occupation,
                role: response.data.role,
                address: response.data.address,
                employees:response.$values
            }

            dispatch({
                type: userConstants.UPDATE_USER,
                data: user,
            });

            localStorage.setItem('user', JSON.stringify(user));
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
                type: userConstants.UPDATE_USER_ERROR,
                payload: message,
            });
            console.log(message);
            return Promise.reject();
        }
    );
}

export const newFile = (ImageFile, width, height) => ({
    type: userConstants.GET_FILE,
    payload: ImageFile,
    width:width,
    height:height
})