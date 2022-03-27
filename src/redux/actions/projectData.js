import ProjectService from "../services/api/projectService";
import {
    projectConstants
} from "../constants/projectConstants";
import {
    messageConstants
} from "../constants/messageConstants";


export const getAllProjects = () => (dispatch) => {

    return ProjectService.allProjects().then(
        async (data) => {
            dispatch({
                type: projectConstants.PROJECT_DATA,
                data: data.data.$values,
            });
            localStorage.setItem('projects', JSON.stringify(data.data.$values));
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
                payload: message,
            });
            return Promise.reject();
        }
    );
}

export const addNewProject = (obj) => (dispatch) => {

    return ProjectService.addProject(obj).then(

        (response) => {
            dispatch({
                type: projectConstants.ADD_PROJECT,
                payload: true,
                data: response.data
            })
            dispatch({
                type: messageConstants.SET_MESSAGE,
                payload: "The project was successfully created."
            });

            var data = JSON.parse(localStorage.getItem('projects'));
            data = [...data, response.data]
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

export const updateProject = (obj) => (dispatch) => {

    return ProjectService.updateProjectTable(obj).then(

        (data) => {
            dispatch({
                type: messageConstants.SET_MESSAGE,
                payload: "The project was successfully updated."
            });
            dispatch({
                type: projectConstants.UPDATE_PROJECT_TABLE,
                payload: data.data,
                isLoaded: true
            });
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
                type: projectConstants.UPDATE_PROJECT_TABLE,
                isLoaded: false
            });
            dispatch({
                type: messageConstants.ERROR,
                payload: message,
            });


            return Promise.reject();
        }
    );
}

export const edit = (id) => ({
    type: projectConstants.EDIT_MODUS,
    isSelectedId: id
})

export const projectIdToDelete = (obj) => ({
    type: projectConstants.DELETE_PROJECT_ID,
    payload: obj
})

export const projectOnChanges = (obj, id) => ({
    type: projectConstants.PROJECT_TABLE_ONCHANGE,
    payload: obj,
    id: id
})

export const projectToDelete = (obj) => (dispatch) => {

    return ProjectService.removeProject(obj).then(
        () => {
            dispatch({
                type: projectConstants.PROJECT_REMOVED,
                payload: obj

            });

            var data = JSON.parse(localStorage.getItem('projects'));
            for (const key in obj) {
                data = data.filter(i => i.projectId !== obj[key])
            }
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
                type: messageConstants.SET_MESSAGE,
                payload: error.response.data,
            });
            console.log(message);
            return Promise.reject();
        }
    )
}