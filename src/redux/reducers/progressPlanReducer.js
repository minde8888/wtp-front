import { progressPlanConstants } from "../constants/progressPlanConstants";


const initialState = { stateResize: false, progress: null };

export default function progressPlan(state = initialState, action) {
    const { type, payload, data } = action;
    switch (type) {
        case progressPlanConstants.PROGRESS_PLAN_DATA:
            return { ...state, progress: data };
        case progressPlanConstants.RESIZE:
            return { ...state, stateResize: payload };
        default:
            return state;
    }
} 