import {
    projectConstants
} from "../constants/projectConstants";
import { progressPlanConstants } from "../constants/progressPlanConstants";

const initialState = {
    data: JSON.parse(localStorage.getItem('projects')),
    projectIsLoaded: false,
    isSelected: "",
    isSelectedId: "",
    isLoaded: false,
    id: "",
    colorRef: null,
};

export default function project(state = initialState, action) {

    const {
        type,
        data,
        payload,
        isSelectedId,
        isLoaded,
        id,
        colorRef
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
        case projectConstants.PROJECT_ID:
            return {
                ...state, projectId: payload,
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
        case projectConstants.ADD_PROGRESS:
            {
                const dataCopyAdd = [...state.data];
                const currentProjectIndex = dataCopyAdd.findIndex((e) => e.projectId === data.projectId)
                const progressAdd = [...dataCopyAdd[currentProjectIndex].progressPlan.$values, data]
                dataCopyAdd[currentProjectIndex].progressPlan.$values = progressAdd

                return {
                    ...state, data: dataCopyAdd
                }
            }
        case projectConstants.RESIZE_PROGRESS_DATE:
            {
                const dateCopyResize = [...state.data];
                const index = dateCopyResize.findIndex(p => p.projectId === payload.projectId);
                const resizeIndex = dateCopyResize[index].progressPlan.$values.findIndex(p => p.progressPlanId === payload.resizeId);
                const resizeProgress = dateCopyResize[index].progressPlan.$values[resizeIndex];
                const updatedResize = { ...resizeProgress, ...{ [payload.position]: payload.date } }
                dateCopyResize[index].progressPlan.$values.splice(resizeIndex, 1, updatedResize);
                return {
                    ...state, data: dateCopyResize
                }
            }
        case projectConstants.DRAGGABLE_PROGRESS_DATE:
            {
                const dateCopyDrag = [...state.data];
                const projectIndex = dateCopyDrag.findIndex(p => p.projectId === payload.projectId);
                const dragIndex = dateCopyDrag[projectIndex].progressPlan.$values.findIndex(p => p.progressPlanId === payload.elementId);
                const dargProgress = dateCopyDrag[projectIndex].progressPlan.$values[dragIndex];
                const updatedDrag = { ...dargProgress, ...payload }
                dateCopyDrag[projectIndex].progressPlan.$values.splice(dragIndex, 1, updatedDrag);

                return {
                    ...state, data: dateCopyDrag
                }
            }
        case progressPlanConstants.COLOR_REF:
            return {
                ...state, colorRef: payload
            };
        case progressPlanConstants.COLOR:
            {
                const dateCopyColor = [...state.data];
                const projectIndex = dateCopyColor.findIndex(p => p.projectId === payload.objId.projectId);
                const progressIndexColor = dateCopyColor[projectIndex].progressPlan.$values.findIndex(p => p.progressPlanId === payload.objId.eventId);
                const colorProgress = dateCopyColor[projectIndex].progressPlan.$values[progressIndexColor];
                const updatedColor = { ...colorProgress, color: payload.objColor }
                dateCopyColor[projectIndex].progressPlan.$values.splice(progressIndexColor, 1, updatedColor);

                return {
                    ...state,
                    data: dateCopyColor,
                    colorRef: colorRef,
                    updateProgress: updatedColor

                }
            }
        case progressPlanConstants.DELETE_PROGRESS:
            {
                const dateCopy = [...state.data];
                const projectIndex = dateCopy.findIndex(p => p.projectId === payload.projectId);
                const progressIndex = dateCopy[projectIndex].progressPlan.$values.findIndex(p => p.progressPlanId === payload.progressId);
                dateCopy[projectIndex].progressPlan.$values.splice(progressIndex, 1);
                return {
                    ...state, data: dateCopy
                };
            }

        default:
            return state;
    }
}