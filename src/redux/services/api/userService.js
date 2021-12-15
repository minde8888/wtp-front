import authHeader from './header';
import Instance from './url'

const USER_URL = "/v1/api/";

class UserService {

  getEmployee(id) {
    return Instance.get(USER_URL + 'Employee/id?id=' + id, { headers: authHeader() });
  }

  getManager(id) {
    return Instance.get(USER_URL + 'Manager/id?id=' + id, { headers: authHeader() });
  }
  getAdminBoard() {
    return Instance.get(USER_URL + 'admin', { headers: authHeader() });
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
    console.log(Object.fromEntries(formData))

    return Instance.put(USER_URL + obj.role + '/Update/' + Id, formData, { headers: authHeader() });
  }

  // upload(obj) {
  //   let formData = new FormData();

  //   for (var key in obj) {
  //     formData.append(key, obj[key])
  //   }
  //   // console.log(Object.fromEntries(formData))
  //   return Instance.post("api/employee", formData, { headers: authHeader() });
  // }

  deleted(id, role) {
    var user = "";
    if (role === "Manager") {
      user = "Manager";
    }
    if (role === "Employee") {
      user = "Employee";
    }
    return Instance.delete(USER_URL + user + '/Delete/' + id, { headers: authHeader() });
  }

}

export default new UserService();