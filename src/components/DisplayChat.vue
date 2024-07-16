<template>
    <div class="display-chat">
        <ul class="messages">
            <li v-for="m in messages" :key="m.author" :class="m.author == myself ? 'right' : 'left'">
                <span>{{ m.content }}</span>
            </li>
        </ul>
        <div class="form">
            <input @keyup.enter="send" v-model="message" type="text" autocomplete="off"/>
            <button @click="send" class="btn">Send</button>
        </div>
    </div>
</template>
<script>
import MessagesService from '@/services/messages.service';

export default {
    name: 'DisplayChat',
    props: ['myself'],
    data () {
        return {
            socket: null,
            message: "",
            messages: []
        }
    },
    methods: {
        send () {
            if (this.message) {
                var msg = { author: this.myself, content: this.message };
                this.messages.push(msg);
                this.socket.emit('message', JSON.stringify(msg));
            }
            this.message = "";
        }
    },
    mounted () {
        MessagesService.setupSocketConnection();
        this.socket = MessagesService.socket;
        this.socket.on('broadcast', (data) => {
            this.messages.push(JSON.parse(data));
        });
    },
    unmounted () {
        MessagesService.disconnect();
    }
}
</script>
<style>
.display-chat {
    margin: 0; padding: 0;
    color: white; width: 100%;
    position: relative;
}

.display-chat .messages {
    margin: 0; padding: 8px 0;
    height: calc(100% - 60px); width: 100%;
    list-style: none; position: absolute;
    overflow-y: scroll; background-color: #131313;
}

.display-chat .messages::-webkit-scrollbar {
    width: 8px; background-color: #f4f4f4;
}

.display-chat .messages::-webkit-scrollbar-thumb {
    background-color: #DC7633;
}

.messages li, .messages span {
    padding: 8px 10px;
}

.messages li.right {
    text-align: right;
}

.messages li.right span {
    background-color: #D35400;
}

.messages li.left {
    text-align: left;
}

.messages li.left span {
    background-color: #DC7633;
}

.form {
    padding: 4px; position: absolute;
    display: flex; height: 60px;
    bottom: 0; right: 0; left: 0;
}

.form input {
    border: none; padding: 0 1rem;
    flex-grow: 1; border-radius: 40px; margin: 4px;
    font-size: 0.8rem;
}

.form input:focus {
    outline: none;
}

.form .btn {
    background-color: #333;
    margin: 0.25rem; color: white;
}

.form .btn:hover {
    background-color: #222;
}

@media (max-width: 992px) {
    .display-chat {
        width: 100vw;
    }

    .display-chat .messages {
        width: 100vw;
    }
}
</style>