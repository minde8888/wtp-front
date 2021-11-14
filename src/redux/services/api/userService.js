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

  updateUserInfo(obj) {

    let formData = new FormData();
    for (var key in obj) {
      formData.append(key, obj[key])
    }
    console.log(Object.fromEntries(formData))
    return Instance.post(USER_URL + 'manager/update', formData, { headers: authHeader() });
  }

}

export default new UserService();