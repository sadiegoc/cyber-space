import http from "@/http-common";

class MessagesService {
    create (data) {
        return http.post("/messages", data);
    }

    getAll () {
        return http.get("/messages");
    }

    get (id) {
        return http.get(`/messages/${id}`);
    }

    update (id, data) {
        return http.put(`/messages/${id}`, data);
    }

    delete (id) {
        return http.delete(`/messages/${id}`);
    }
}

export default new MessagesService();