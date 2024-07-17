<template>
    <div class="display-chat">
        <ul class="messages">
            <li v-for="(m, i) in messages" :key="i" :class="m.owner == myself ? 'right' : 'left'">
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
                var msg = { owner: this.myself, content: this.message };
                this.appendMsg(msg);
                this.sendSocketMsg(msg);
                this.message = "";
            }
        },
        scroll () {
            const m = document.querySelector('.messages');
            m.scrollTo(0, m.scrollHeight);
        },
        appendMsg (msg) {
            this.messages.push(msg);
        },
        sendSocketMsg (msg) {
            MessagesService.send(msg)
                .then(response => console.log(response))
                .catch(err => console.log(err.message));
        }
    },
    async mounted () {
        MessagesService.setupSocketConnection();
        MessagesService.socket.on('broadcast', (data) => {
            this.messages.push(JSON.parse(data));
        });
        await MessagesService.getAll().then(response => this.messages = response.data);
        this.scroll();
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
    background-color: #191919;
}

.display-chat .messages {
    margin: 0; padding: 0;
    height: calc(100% - 60px); width: 100%;
    list-style: none; position: absolute;
    overflow-y: scroll; display: flex; flex-direction: column;
}

.display-chat .messages::-webkit-scrollbar {
    width: 8px; background-color: transparent;
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
    font-size: 0.8rem; background-color: #222;
    color: white;
}

.form input:focus {
    outline: none;
}

.form .btn {
    background-color: #DC7633;
    margin: 0.25rem; color: white;
}

.form .btn:hover {
    background-color: #D35400;
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