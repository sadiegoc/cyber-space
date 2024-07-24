import http from "@/http-common";
import { io } from "socket.io-client";

class MessagesService {
    socket;

    setupSocketConnection () {
        this.socket = io('http://localhost:8888');
    }

    disconnect () {
        if (this.socket)
            this.socket.disconnect();
    }

    send (data) {
        this.socket.emit("message", data);
    }

    save (data) {
        return http.post('/messages', data);
    }

    getChat (toSave, sender, receiver) {
        return http.get(`/messages?toSave=${toSave}&&sender=${sender}&&receiver=${receiver}`);
    }
}

export default new MessagesService();