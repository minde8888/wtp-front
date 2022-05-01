import { progressPlanConstants } from "../constants/progressPlanConstants";


const initialState = {
    stateResize: false,
    isLoaded: true,
    skipMonth: null,
    eventId: null
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
        case progressPlanConstants.RESIZE:
            return {
                ...state,
                stateResize: payload
            };
        case progressPlanConstants.DATE:
            return {
                ...state,
                date: payload
            };
        case progressPlanConstants.ADD_MONTH:
            let add = state.skipMonth + payload
            return {
                ...state,
                skipMonth: add
            };
        case progressPlanConstants.MINUS_MONTH:
            let minus = state.skipMonth + payload
            return {
                ...state,
                skipMonth: minus
            };
        case progressPlanConstants.EVENT_ID:
            return {
                ...state,
                eventId: payload.id,
              };
        case progressPlanConstants.TITLE_REF:
            return {
                ...state,
                titleRef: payload
            }
        case progressPlanConstants.EMPLOYEE_REF:
            return {
                ...state,
                employeeRef: payload
            }
        case progressPlanConstants.INFO_REF:
            return {
                ...state,
                infoRef: payload
            }
        default:
            return state;
    }
} 