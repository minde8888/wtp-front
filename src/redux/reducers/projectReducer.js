import { projectConstants } from "../constants/projectConstants";

const initialState = {
    data: JSON.parse(localStorage.getItem('projects')),
    projectIsLoaded: false,
    isSelected: ""
};

export default function project(state = initialState, action) {

    const { type, data, payload } = action;

    switch (type) {
        case projectConstants.PROJECT_DATA:
            return {
                data: data,
                projectIsLoaded: true,
            };
        case projectConstants.EDIT_MODUS:
            return {
                ...state, payload
            };
        case projectConstants.DELETE_PROJECT_ID:
            return {
                ...state, removeProjects: payload,

            }
        case projectConstants.PROJECT_REMOVED:
            return {
                ...state, data: state.data.filter(project => !payload.includes(project.projectId))
            }
        case projectConstants.ADD_PROJECT:
            return {
                ...state, data: [...state.data, data]
            }
        case projectConstants.UPDATE_PROJECT_TABLE:
              return {
                ...state, data:state.data.map(p => p.projectId !== payload.projectId  ? p : payload)
            }
        default:
            return state;
    }
}