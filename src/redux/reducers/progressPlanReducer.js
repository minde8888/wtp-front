import { progressPlanConstants } from "../constants/progressPlanConstants";


const initialState = {
    stateResize: false,
    progress: null,
    isLoaded: true,
};

export default function progressPlan(state = initialState, action) {
    const { type, payload, data } = action;
    switch (type) {
        case progressPlanConstants.PROGRESS_PLAN_DATA:
            return {
                ...state,
                progress: data,
                isLoaded: false
            };
        case progressPlanConstants.ADD_PROGRESS_PLAN:
            return {
                ...state,
                data: { ...state.data, data }
            }
        case progressPlanConstants.RESIZE:
            return { ...state, stateResize: payload };
        case progressPlanConstants.COLOR:
            return { ...state, color: payload };
        case progressPlanConstants.DATE:
            return { ...state, date: payload };
        case progressPlanConstants.RESIZE_DATE:
            let progressCopy = [...state.progress];
            let currentProgressPlan = progressCopy.find(p => p.progressPlanId === payload.id)
            currentProgressPlan[payload.position] = payload.date
            return { ...state, progress: progressCopy };
        case progressPlanConstants.DRAGGABLE_DATA:
            let progressCop = [...state.progress];
            let curProgressPlan = progressCop.find(p => p.progressPlanId === payload.id)
            curProgressPlan.start = payload.start;
            curProgressPlan.end = payload.end;
            curProgressPlan.index = payload.index;
            return { ...state, progress: progressCop };
        default:
            return state;
    }
} 