import AddService from "../../redux/services/api/addService"

const IN_PROGRESS = "IN_PROGRESS",
    ADD_SUCCESS = "ADD_SUCCESS",
    ADD_FAIL = "ADD_FAIL"

export const addUser = (obj) => (dispatch) => {
    return AddService.upload(obj, (event) => {
        dispatch({
            type: IN_PROGRESS,
            progress: Math.round((100 * event.loaded) / event.total),
        });
    })
        .then((response) => {
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
                progress: 0,
            });
            return Promise.reject();
        };
}