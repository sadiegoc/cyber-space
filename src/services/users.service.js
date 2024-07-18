import http from "@/http-common";

class UsersService {
    register (data) {
        return http.post("/auth", data);
    }

    login (user) {
        return http.get(`/auth?username=${user.username}&&password=${user.password}`);
    }

    get () {
        return http.get('/auth');
    }

    update (id, data) {
        return http.put(`/auth/${id}`, data);
    }

    delete (id) {
        return http.delete(`/auth/${id}`);
    }
}

export default new UsersService();