import authHeader from './header';
import Instance from './url'

const USER_URL = "/v1/api/";

class UserService {

  getEmployee(id) {
    return Instance.get(USER_URL + 'Employee/id?id=' + id, { headers: authHeader() });
  }

  getManagerBoard() {
    return Instance.get(USER_URL + 'manager', { headers: authHeader() });
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

    return Instance.put(USER_URL + 'Manager/Update/' + Id, formData, { headers: authHeader() });
  }

}

export default new UserService();