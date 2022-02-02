import {
    projectConstants
} from "../constants/projectConstants";

const initialState = {
    data: JSON.parse(localStorage.getItem('projects')),
    projectIsLoaded: false,
    isSelected: "",
    isSelectedId:""
};

export default function project(state = initialState, action) {

    const {
        type,
        data,
        payload,
        isSelectedId
    } = action;

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
        case projectConstants.PROJECT_TABLE_ONCHANGES:
            console.log(isSelectedId,  payload);
           var c = Object.values(payload).join()
           console.log(c);
           var a =  state.data.filter(p => p.projectId === isSelectedId ? p[Object.keys(payload).join()] += Object.values(payload).join()  : p )//[Object.keys(payload).join()]
         console.log(a);
            // console.log(Object.keys(payload).join());
            // console.log();
            // console.log(typeof Object.keys(payload).join())
            // var a = Object.keys(payload).join()
            // state.data.map(p => console.log(payload) )
            return {
                // ...state, data: state.data.map(p =>  p.Object.keys(payload).Object.values(payload))

                //  ...state, data:state.data.map(p => p.projectId === payload.id )
                ...state
            }
        case projectConstants.UPDATE_PROJECT_TABLE:
            return {
                ...state, data: state.data.map(p => p.projectId !== payload.projectId ? p : payload)
            }
            default:
                return state;
    }
}