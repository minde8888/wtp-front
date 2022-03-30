import { progressPlanConstants } from "../constants/progressPlanConstants";


const initialState = {
    stateResize: false,
    progress: null,
    isLoaded: true,
};

export default function progressPlan(state = initialState, action) {
    console.log(action);
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
            console.log(payload);
            let progressCopy = [...state.progress];
            let currentProgressPlan = progressCopy.find(p => p.progressPlanId === payload.id)
            currentProgressPlan[payload.position] = payload.date
            return { ...state, progress: progressCopy };
        default:
            return state;
    }
} 