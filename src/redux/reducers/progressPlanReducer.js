import { progressPlanConstants } from "../constants/progressPlanConstants";


const initialState = { onResize: false, };

export default function message(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case progressPlanConstants.RESIZE:
            return { ...state, onResize: payload };

        default:
            return state;
    }
}