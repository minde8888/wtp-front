import ProjectService from "../services/api/projectService";
import { projectConstants } from "../constants/projectConstants";
import { messageConstants } from "../constants/messageConstants";

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
                payload: error.response.data,
            });
            console.log(message);
            return Promise.reject();
        }
    );
}

export const addNewProject = (obj) => (dispatch) => {

    return ProjectService.addProject(obj).then(

        async (response) => {
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
            var key = data.length
            data[key] = response.data
            localStorage.setItem('projects', JSON.stringify(data));

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
                payload: error.response.data,
            });
            console.log(message);
            return Promise.reject();
        }
    );
}

export const updateProject = (obj) => (dispatch) => {

    return ProjectService.updateProjectTable(obj).then(

        async (data) => {
            dispatch({
                type: messageConstants.SET_MESSAGE,
                payload: "The project was successfully updated."
            });
            dispatch({
                type: projectConstants.UPDATE_PROJECT_TABLE,
                payload: data.data.$values
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
                type: messageConstants.ERROR,
                payload: error.response.data,
            });
            console.log(message);
            return Promise.reject();
        }
    );
}

export const edit = (id) => ({
    type: projectConstants.EDIT_MODUS,
    isSelected: id
})

export const projectIdToDelete = (id) => ({
    type: projectConstants.DELETE_PROJECT,
    payload: id
})

export const projectToDelete = (id) => (dispatch) => {

    return ProjectService.removeProject(id).then(
        async () => {
            dispatch({
                type: projectConstants.DELETE_PROJECT,
                payload: id
            })
            // var data = JSON.parse(localStorage.getItem('employees'));
            // const employees = data.filter(item => item.id !== id);
            // localStorage.setItem('employees', JSON.stringify(employees));

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
                type: messageConstants.SET_MESSAGE,
                payload: error.response.data,
            });
            console.log(message);
            return Promise.reject();
        }
    )
}
