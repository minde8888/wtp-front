import { progressPlanConstants } from "../constants/progressPlanConstants"
import { messageConstants } from "../constants/messageConstants";
import { projectConstants } from "../constants/projectConstants";
import ProgressPlanService from "../services/api/progressPlanService";

export const getAllProgressPlans = () => (dispatch) => { //admin

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
                payload: message,
            });
            return Promise.reject();
        }
    );
}

export const addNewProgressPlan = (obj) => (dispatch) => {

    return ProgressPlanService.addProgressPlan(obj).then(

        (response) => {
            dispatch({
                type: projectConstants.ADD_PROGRESS,
                data: response.data,
                payload: true
            })
            dispatch({
                type: messageConstants.SET_MESSAGE,
                payload: "The plan was successfully created."
            });

            const data = JSON.parse(localStorage.getItem('projects'));
            const currentProjectIndex = data.findIndex((e) => e.projectId === response.data.projectId)
            const progressAdd = [...data[currentProjectIndex].progressPlan.$values, response.data]
            data[currentProjectIndex].progressPlan.$values = progressAdd
            localStorage.setItem('projects', JSON.stringify(data));

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

export const changeDate = (resizeId, date, position, projectId) => (dispatch) => {
    dispatch({
        type: projectConstants.RESIZE_PROGRESS_DATE,
        payload: {
            date: date.toString(),
            resizeId: resizeId,
            projectId: projectId,
            position: position
        }
    })
    let obj = {
        progressPlanId: resizeId,
        [position]: date.toString()
    }
    const data = JSON.parse(localStorage.getItem('projects'));
    const index = data.findIndex(p => p.projectId === projectId);
    const resizeIndex = data[index].progressPlan.$values.findIndex(p => p.progressPlanId === resizeId);
    const resizeProgress = data[index].progressPlan.$values[resizeIndex];
    const updatedResize = { ...resizeProgress, ...{ [position]: date } }
    data[index].progressPlan.$values.splice(resizeIndex, 1, updatedResize);
    localStorage.setItem('projects', JSON.stringify(data));

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

export const draggableDate = (elementId, date, index, projectId) => (dispatch) => {
    dispatch({
        type: projectConstants.DRAGGABLE_PROGRESS_DATE,
        payload: {
            start: date.start.toString(),
            end: date.end.toString(),
            elementId: elementId,
            projectId: projectId,
            index: index
        }
    })
    let obj = {
        progressPlanId: elementId,
        start: date.start.toString(),
        end: date.end.toString(),
        index: index
    }
    const data = JSON.parse(localStorage.getItem('projects'));
    const projectIndex = data.findIndex(p => p.projectId === projectId);
    const dragIndex = data[projectIndex].progressPlan.$values.findIndex(p => p.progressPlanId === elementId);
    const dargProgress = data[projectIndex].progressPlan.$values[dragIndex];
    const updatedDrag = { ...dargProgress, ...obj }
    data[projectIndex].progressPlan.$values.splice(dragIndex, 1, updatedDrag);
    localStorage.setItem('projects', JSON.stringify(data));

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

export const prevMonth = (a) => ({
    type: progressPlanConstants.ADD_MONTH,
    payload: a
})

export const nextMonth = (b) => ({
    type: progressPlanConstants.MINUS_MONTH,
    payload: b
})

export const sendId = (id) => ({
    type: progressPlanConstants.EVENT_ID,
    payload: id
})
