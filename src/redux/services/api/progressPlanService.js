import api from './apiServices'

const USER_URL = "/v1/api/ProgressPlan";

class ProgressPlanService {

  addProgressPlan(obj) {

    let formData = new FormData();
    for (var key in obj) {
      formData.append(key, obj[key])
    }
    console.log(Object.fromEntries(formData))
    return api.post(USER_URL, formData);
  }

  updateEventPosition(obj) {
     let formData = new FormData();
    for (var key in obj) {
      formData.append(key, obj[key])
    }
    console.log(Object.fromEntries(formData))
    return api.put(USER_URL + '/update', formData);
  }

  removeProgressPlan(id) {
    return api.delete(USER_URL + '/Delete/' + id);
  }
}

export default new ProgressPlanService();