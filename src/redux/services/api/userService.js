import api from './apiServices'

const USER_URL = "/v1/api/";

class UserService {

  getEmployee(id) {
    return api.get(USER_URL + 'Employee/id?id=' + id);
  }

  getManager(id) {
    return api.get(USER_URL + 'Manager/id?id=' + id);
  }
  getAdminBoard() {
    return api.get(USER_URL + 'admin');
  }

  updateUserInfo(Id, obj) {

    let formData = new FormData();

    for (var key in obj) {
      formData.append(key, obj[key])
      if (key === "address") {
        for (var subKey in obj[key]) {
          formData.append(`${key}[${subKey}]`, obj[key][subKey]);
        }
      }
    }
    // console.log(Object.fromEntries(formData))

    return api.put(USER_URL + obj.role + '/Update/' + Id, formData);
  }

  deleted(id, role) {
    var user = "";
    if (role === "Manager") {
      user = "Manager";
    }
    if (role === "Employee") {
      user = "Employee";
    }
    return api.delete(USER_URL + user + '/Delete/' + id);
  }

}

export default new UserService();