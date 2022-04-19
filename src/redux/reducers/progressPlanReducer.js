import { progressPlanConstants } from "../constants/progressPlanConstants";


const initialState = {
    stateResize: false,
    isLoaded: true,
    skipMonth: 0,
    colorRef:null
};

export default function progressPlan(state = initialState, action) {
    const { type, payload, data, colorRef } = action;
    switch (type) {
        case progressPlanConstants.PROGRESS_PLAN_DATA:
            return {
                ...state,
                progress: data,
                isLoaded: false
            };
        case progressPlanConstants.RESIZE:
            return { ...state, stateResize: payload };
        case progressPlanConstants.COLOR:
            return { ...state, color: payload, colorRef: colorRef };
        case progressPlanConstants.DATE:
            return { ...state, date: payload };
        case progressPlanConstants.ADD_MONTH:
            let add = state.skipMonth + payload
            return { ...state, skipMonth: add };
        case progressPlanConstants.MINUS_MONTH:
            let minus = state.skipMonth + payload
            return { ...state, skipMonth: minus };
        case progressPlanConstants.EVENT_ID:
            return { ...state, eventId: payload };
        default:
            return state;
    }
} 