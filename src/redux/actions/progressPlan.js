import { progressPlanConstants } from "../constants/progressPlanConstants"
import { messageConstants } from "../constants/messageConstants";
import ProgressPlanService from "../services/api/progressPlanService";

export const getAllProgressPlans = () => (dispatch) => {

    return ProgressPlanService.allPlans().then(
        (data) => {
            dispatch({
                type: progressPlanConstants.PROGRESS_PLAN_DATA,
                data: data.data.$values,

            });
            localStorage.setItem('progress_plan', JSON.stringify(data.data.$values));
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
                type: messageConstants.ERROR,
                payload: error.response,
            });
            console.log(message);
            return Promise.reject();
        }
    );
}

export const addNewProgressPlan = (obj) => (dispatch) => {

    return ProgressPlanService.addProgressPlan(obj).then(

        (response) => {
            dispatch({
                type: progressPlanConstants.ADD_PROGRESS_PLAN,
                data: response.data,
                payload: true
            })
            dispatch({
                type: messageConstants.SET_MESSAGE,
                payload: "The plan was successfully created."
            });

            // var data = JSON.parse(localStorage.getItem('projects'));
            // data = [...data, response.data]
            // localStorage.setItem('projects', JSON.stringify(data));

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
                type: messageConstants.ERROR,
                payload: error.response.data,
            });
            console.log(message);
            return Promise.reject();
        }
    );
}

export const changeDate = (id, date, position) => (dispatch) => {
    dispatch({
        type: progressPlanConstants.RESIZE_DATE,
        payload: {
            date: date.toString(),
            id: id,
            position: position
        }
    })
    let obj = {
        progressPlanId: id,
        [position]: date.toString()
    }
    return ProgressPlanService.updateEventPosition(obj).then(() => {
    },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: messageConstants.ERROR,
                payload: message,
            });

            return Promise.reject();
        })
}


export const resize = (bool) => ({
    type: progressPlanConstants.RESIZE,
    payload: bool
})

export const addColor = (obj) => ({
    type: progressPlanConstants.COLOR,
    payload: obj
})

export const addDate = (date) => ({
    type: progressPlanConstants.DATE,
    payload: date,
})


