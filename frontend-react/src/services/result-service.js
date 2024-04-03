import http from "../http-common";

class ResultDataService {
  getAll() {
    return http.get("/results");
  }

  get(id) {
    return http.get(`/results/${id}`);
  }

  create(data) {
    return http.post("/results", data);
  }

  update(id, data) {
    return http.put(`/results/${id}`, data);
  }

  delete(id) {
    return http.delete(`/results/${id}`);
  }

  deleteAll() {
    return http.delete(`/results`);
  }

  findByName(name) {
    return http.get(`/results?name=${name}`);
  }
}

export default new ResultDataService();