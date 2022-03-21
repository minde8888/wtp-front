import {
    projectConstants
} from "../constants/projectConstants";

const initialState = {
    data: JSON.parse(localStorage.getItem('projects')),
    projectIsLoaded: false,
    isSelected: "",
    isSelectedId: "",
    isLoaded: false,
    id: ""
};

export default function project(state = initialState, action) {

    const {
        type,
        data,
        payload,
        isSelectedId,
        isLoaded,
        id
    } = action

    switch (type) {
        case projectConstants.PROJECT_DATA:
            return {
                data: data,
                projectIsLoaded: true,
            };
        case projectConstants.EDIT_MODUS:
            return {
                ...state, isSelectedId
            };
        case projectConstants.DELETE_PROJECT_ID:
            return {
                ...state, removeProjects: payload,
            }
        case projectConstants.PROJECT_REMOVED:
            return {
                ...state, data: state.data.filter(p => !payload.includes(p.projectId))
            }
        case projectConstants.ADD_PROJECT:
            return {
                ...state, data: [...state.data, data]
            }
        case projectConstants.PROJECT_TABLE_ONCHANGE: {
            const dataCopy = [...state.data];
            const projectIndex = dataCopy.findIndex(p => p.projectId === id);
            const project = dataCopy[projectIndex];
            const updatedProject = { ...project, ...payload }
            dataCopy.splice(projectIndex, 1, updatedProject);
            return {
                ...state, data: [...dataCopy]
            }
        }
        case projectConstants.UPDATE_PROJECT_TABLE:
            return {
                ...state, data: state.data.map(p => p.projectId !== payload.projectId ? p : payload),
                isLoaded: isLoaded
            }
        default:
            return state;
    }
}