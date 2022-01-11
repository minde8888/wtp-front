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

        async () => {
            dispatch({
                type: messageConstants.SET_MESSAGE,
                payload: "The project was successfully created."
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

export const edit = (id) =>({
    type:projectConstants.EDIT_MODUS,
    isSelected : id

})

