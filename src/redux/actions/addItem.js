import AddService from "../services/api/addService"

const ADD_SUCCESS = "ADD_SUCCESS",
    ADD_FAIL = "ADD_FAIL"

export const addItem = (obj) => (dispatch) => {
    return AddService.upload(obj)
        .then(
            async (response) => {
                dispatch({
                    type: ADD_SUCCESS,
                    payload: response.data.message,
                });
                return await Promise.resolve();
            }),
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: ADD_FAIL,
                payload: message,
            });
            return Promise.reject();
        };
}