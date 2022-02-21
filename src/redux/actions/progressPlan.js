import { progressPlanConstants } from "../constants/progressPlanConstants"
import { messageConstants } from "../constants/messageConstants";
import ProgressPlanService from "../services/api/progressPlanService";

export const resize = (bool) => ({
    type: progressPlanConstants.RESIZE,
    payload: bool
})

export const getAllProgressPlans = () => (dispatch) => {

    return ProgressPlanService.allPlans().then(
        async (data) => {
            dispatch({
                type: progressPlanConstants.PROGRESS_PLAN_DATA,
                payload: data.data.$values,
            });
            localStorage.setItem('progress_plan', JSON.stringify(data.data.$values));
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
                payload: response.data
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