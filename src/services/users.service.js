import http from "@/http-common";

class UsersService {
    create (data) {
        return http.post("/auth", data);
    }

    getAll () {
        return http.get("/auth");
    }

    get (id) {
        return http.get(`/auth/${id}`);
    }

    update (id, data) {
        return http.put(`/auth/${id}`, data);
    }

    delete (id) {
        return http.delete(`/auth/${id}`);
    }
}

export default new UsersService();