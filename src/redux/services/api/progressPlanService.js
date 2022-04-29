import api from './apiServices'

const USER_URL = "/v1/api/ProgressPlan";

class ProgressPlanService {
  allPlans() {
    return api.get(USER_URL);
  }

  addProgressPlan(obj) {

    let formData = new FormData();
    for (var key in obj) {
      formData.append(key, obj[key])
    }
    console.log(Object.fromEntries(formData))
    return api.post(USER_URL, formData);
  }

  updateEventPosition(array) {
    return api.put(USER_URL + '/AddEmployee', array);
  }

  removeProgressPlan(id) {
    return api.delete(USER_URL + '/Delete/'+ id);
  }
}

export default new ProgressPlanService();