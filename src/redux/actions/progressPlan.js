import { progressPlanConstants } from "../constants/progressPlanConstants"

export const resize = (bool) => ({
    type: progressPlanConstants.RESIZE,
    payload: bool
})