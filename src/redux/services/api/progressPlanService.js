import api from './apiServices'

const USER_URL = "/v1/api/ProgressPlan";

class ProgressPlanService {
    allPlans(){
        return api.get(USER_URL);
    }
    addProgressPlan(obj) {
        console.log(obj);
        let formData = new FormData();
        for (var key in obj) {
          formData.append(key, obj[key])
        }
    
        return api.post(USER_URL, formData);
      }    
}

export default new ProgressPlanService();