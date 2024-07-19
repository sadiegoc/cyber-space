<template>
    <div class="display-chat">
        <ul class="messages">
            <li v-for="m in messages" :key="m.id" :class="m.sender == myself.username ? 'right' : 'left'">
                <span>{{ m.content }}</span>
            </li>
            <div ref="anchor" id="anchor"></div>
        </ul>
        <div class="form">
            <input @keyup.enter="send" id="message" ref="message" :disabled="!receiver" v-model="message" type="text" autocomplete="off"/>
            <button :disabled="!receiver" @click="send" class="btn">Send</button>
        </div>
    </div>
</template>
<script>
import MessagesService from '@/services/messages.service';

export default {
    name: 'DisplayChat',
    props: ['receiver'],
    data () {
        return {
            socket: null,
            myself: {},
            message: "",
            messages: []
        }
    },
    methods: {
        send () {
            if (this.message && this.receiver) {
                const msg = this.createMessage(this.myself.username);
                this.sendMessage(msg);
                this.message = "";
            }
            this.focus();
        },
        createMessage () {
            return { toSave: this.myself.username, sender: this.myself.username, receiver: this.receiver, content: this.message }
        },
        scroll () {
            window.location.href = '#anchor';
            // this.$refs.anchor.
        },
        focus () {
            this.$refs.message.focus();
            // window.location.href = '#message';
        },
        appendMsg (msg) {
            this.messages.push(msg);
        },
        async sendMessage (msg) {
            MessagesService.send(msg);
            await MessagesService.save(msg)
                .then(response => this.appendMsg({ sender: response.data.sender, receiver: response.data.receiver, content: response.data.content }))
                .then(() => { this.scroll(); this.focus(); })
                .catch(err => console.log(err.message));
        },
        loadMyself () {
            this.myself = JSON.parse(localStorage.getItem("user"));
        }
    },
    mounted () {
        this.loadMyself();
        MessagesService.setupSocketConnection();
        MessagesService.socket.on(this.myself.username, async (data) => {
            data = JSON.parse(data);
            const save = { toSave: this.myself.username, sender: data.sender, receiver: data.receiver, content: data.content }
            await MessagesService.save(JSON.stringify(save));
            this.messages.push(data);
            this.scroll();
        });
    },
    watch: {
        async receiver (receiver) {
            await MessagesService.getChat(this.myself.username, receiver).then(response => this.messages = response.data).then(() => { this.scroll(); this.focus(); });
        }
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
    margin: 0; padding: 10px 0;
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

.messages span {
    border-radius: 6px;
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

.form .btn:disabled {
    border: none;
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