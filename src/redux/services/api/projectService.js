import authHeader from './header';
import Instance from './url'

const USER_URL = "/v1/api/Project";

class ProjectService {

  allProjects() {
    return Instance.get(USER_URL, { headers: authHeader() });
  }
}

export default new ProjectService();