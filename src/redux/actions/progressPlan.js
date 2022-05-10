import {
    progressPlanConstants
} from "../constants/progressPlanConstants"
import {
    messageConstants
} from "../constants/messageConstants";
import {
    projectConstants
} from "../constants/projectConstants";
import ProgressPlanService from "../services/api/progressPlanService";

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
            return message(error, dispatch)
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
    const updatedResize = {
        ...resizeProgress,
        ...{
            [position]: date
        }
    }
    data[index].progressPlan.$values.splice(resizeIndex, 1, updatedResize);
    localStorage.setItem('projects', JSON.stringify(data));

    return ProgressPlanService.updateEventPosition(obj).then(() => {
            return Promise.resolve();
        },
        (error) => {
            return message(error, dispatch)
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
    const updatedDrag = {
        ...dargProgress,
        ...obj
    }
    data[projectIndex].progressPlan.$values.splice(dragIndex, 1, updatedDrag);
    localStorage.setItem('projects', JSON.stringify(data));

    return ProgressPlanService.updateEventPosition(obj).then(() => {
            return Promise.resolve();
        },
        (error) => {
            return message(error, dispatch)
        })
}

export const updateProgressPlan = (obj) => (dispatch) => {

    const data = JSON.parse(localStorage.getItem('projects'));
    const projectIndex = data.findIndex(p => p.projectId === obj.projectId);
    const progressIndex = data[projectIndex].progressPlan.$values.findIndex(p => p.progressPlanId === obj.progressPlanId);
    data[projectIndex].progressPlan.$values.splice(progressIndex, 1, obj);
    localStorage.setItem('projects', JSON.stringify(data));

    return ProgressPlanService.updateEventPosition(obj).then(() => {

            dispatch({
                type: progressPlanConstants.COLOR_CLEANUP_AFTER_UPDATE
            })
            dispatch({
                type: progressPlanConstants.TITLE_CLEANUP_AFTER_UPDATE
            })

            return Promise.resolve();
        },
        (error) => {
            return message(error, dispatch)
        })
}

export const addEmployeeToProgress = (obj) => (dispatch) => {
    dispatch({
        type: progressPlanConstants.ADD_EMPLOYEE_ID,
        payload:[],
        employeeIsChanged: false
    })
    return ProgressPlanService.updateEventPosition(obj).then((response) => {
            dispatch({
                type: progressPlanConstants.ADD_EMPLOYEE,
                payload: response.data
            })

        },
        (error) => {
            return message(error, dispatch)
        })
}

export const removeProgress = (progressId, projectId) => (dispatch) => {

    const data = JSON.parse(localStorage.getItem('projects'));
    const projectIndex = data.findIndex(p => p.projectId === projectId);

    if (data[projectIndex].progressPlan.$values.length > 1) {
        const progressIndex = data[projectIndex].progressPlan.$values.findIndex(p => p.progressPlanId === progressId);
        data[projectIndex].progressPlan.$values.splice(progressIndex, 1)
        localStorage.setItem('projects', JSON.stringify(data));
        dispatch({
            type: progressPlanConstants.DELETE_PROGRESS,
            payload: {
                progressId,
                projectId
            }
        })
        return ProgressPlanService.removeProgressPlan(progressId).then(() => {
                return Promise.resolve();
            },
            (error) => {
                return message(error, dispatch)
            })
    } else {
        dispatch({
            type: messageConstants.ERROR,
            payload: "Can't delete last one !!!",
        });
    }
}

export const resize = (bool) => ({
    type: progressPlanConstants.RESIZE,
    payload: bool
})

export const addColor = (objColor, objId) => ({
    type: progressPlanConstants.COLOR,
    payload: {
        objColor,
        objId
    },
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

export const progressData = (id) => ({
    type: progressPlanConstants.EVENT_ID,
    payload: {
        id: id
    }
})


export const employeeIdProgress = (id) => ({
    type: progressPlanConstants.ADD_EMPLOYEE_ID,
    payload: id,
    employeeIsChanged: true
})

export const removeIdProgress = (id) => ({
    type: progressPlanConstants.ADD_EMPLOYEE_ID_REMOVE,
    payload: id,
    employeeIsChanged: true
})

export const titleOnChange = (title, eId, pId) => ({
    type: progressPlanConstants.CHANGE_TITLE,
    payload: {
        title: title,
        progressId: eId,
        projectId: pId
    }
})

const message = (error, dispatch) => {
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