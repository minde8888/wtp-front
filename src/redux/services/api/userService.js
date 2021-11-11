import axios from 'axios';
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
}

export default new UserService();