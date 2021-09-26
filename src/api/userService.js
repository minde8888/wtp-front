import axios from 'axios';
import authHeader from './header';
import url from './url'

const USER_URL = url + "v1/api/";

class UserService {
  // getPublicContent() {
  //   return axios.get(USER_URL);
  // }

  getEmployeeBoard() {
    return axios.get(USER_URL + 'employee', { headers: authHeader() });
  }

  getManagerBoard() {
    return axios.get(USER_URL + 'manager', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(USER_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();