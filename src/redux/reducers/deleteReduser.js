import { deleteConstants } from "../constants/deleteConstants";

const initialState = {
    isRemoved: false
};

export default function manager(state = initialState, action) {
console.log(state);
    const { type, payload } = action;

    switch (type) {
        case deleteConstants.DELETED_USER:
            return { ...state, employees: state.auth.data.employees.filter(i => i.id !== payload )};
        default:
            return state;
    }
}