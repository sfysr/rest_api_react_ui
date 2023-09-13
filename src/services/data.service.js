import http from "../http-req";

class DataService {
  getAll() {
    return http.get("/");
  }

  get(id) {
    return http.get(`/${id}`);
  }

  create(data) {
    return http.post("/", data);
  }

  update(id, data) {
    return http.put(`/${id}`, data);
  }

  delete(id) {
    return http.delete(`/${id}`);
  }

  deleteAll() {
    return http.delete(`/`);
  }
}

const dataServiceInstance = new DataService(); // Sınıf örneğini bir değişkene atayın

export default dataServiceInstance; // Değişkeni varsayılan olarak dışa aktarın
