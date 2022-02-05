import { progressPlanConstants } from "../constants/progressPlanConstants";


const initialState = {resize:false,};

export default function message(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case progressPlanConstants.RESIZE:
            return { ...state, resize: payload };

        default:
            return state;
    }
}