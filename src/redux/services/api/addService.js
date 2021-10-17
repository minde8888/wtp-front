import Instance from "./url";

class AddService {
    upload(obj) {
        let formData = new FormData();

        for (var key in obj) {
            formData.append(key, obj[key])
        }
        console.log(Object.fromEntries(formData))
        return Instance.post("/upload", formData);
    }
}

export default new AddService();