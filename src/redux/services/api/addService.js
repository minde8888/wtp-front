import Instance from "./url";
import authHeader from './header';

class AddService {
    upload(obj) {
        let formData = new FormData();

        for (var key in obj) {
            formData.append(key, obj[key])
        }
        // console.log(Object.fromEntries(formData))
        return Instance.post("api/employee", formData, { headers: authHeader() });
    }
}

export default new AddService();