import { progressPlanConstants } from "../constants/progressPlanConstants";


const initialState = { stateResize: false, progress: null, isCreated: false };

export default function progressPlan(state = initialState, action) {
    const { type, payload, data } = action;
    switch (type) {
        case progressPlanConstants.PROGRESS_PLAN_DATA:
            return { ...state, progress: data };
        case progressPlanConstants.ADD_PROGRESS_PLAN:
            return { ...state, data: {...state.data, data} }
        case progressPlanConstants.RESIZE:
            return { ...state, stateResize: payload };
        case progressPlanConstants.COLOR:
            return { ...state, color: payload };
        case progressPlanConstants.DATE:
            return { ...state, date: payload };
        default:
            return state;
    }
} 