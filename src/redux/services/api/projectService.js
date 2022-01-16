import authHeader from './header';
import Instance from './url'

const USER_URL = "/v1/api/Project";

class ProjectService {

  allProjects() {
    return Instance.get(USER_URL, { headers: authHeader() });
  }

  addProject = (obj) => {

    let formData = new FormData();
    for (var key in obj) {
      formData.append(key, obj[key])
    }

    console.log(Object.fromEntries(formData))

    return Instance.post(USER_URL, formData, { headers: authHeader() });
  }

  removeProject(obj) {
    return Instance.post(USER_URL + '/Delete', obj, { headers: authHeader() });
  }

  updateProjectTable(obj){

    let formData = new FormData();
    for (var key in obj) {
      formData.append(key, obj[key])
    }
    
    console.log(Object.fromEntries(formData))

    return Instance.put(USER_URL+"/Update/", obj ,{ headers: authHeader() });
  }
}


export default new ProjectService();