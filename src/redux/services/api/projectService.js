import api from './apiServices'

const USER_URL = "/v1/api/Project";

class ProjectService {

  allProjects() {
    return api.get(USER_URL);
  }

  oneProject(id){
    return api.post(USER_URL + '/id', id);
  }
  addProject = (obj) => {
    let formData = new FormData();
    for (var key in obj) {
      formData.append(key, obj[key])
    }

    console.log(Object.fromEntries(formData))

    return api.post(USER_URL, formData);
  }

  removeProject(obj) {
    return api.post(USER_URL + '/Delete', obj);
  }

  updateProjectTable(obj){

    let formData = new FormData();
    for (var key in obj) {
      formData.append(key, obj[key])
    }
    
    console.log(Object.fromEntries(formData))

    return api.put(USER_URL+"/Update/", obj );
  }
}


export default new ProjectService();