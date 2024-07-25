<template>
    <div class="display-chat">
        <ul class="messages">
            <li v-for="m in messages" :key="m.id" :class="m.sender == myself.username ? 'right' : 'left'">
                <div>
                    <span v-if="m.content">
                        {{ m.content }}
                    </span>
                </div>
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
            myself: {},
            socket: null,
            message: "",
            messages: []
        }
    },
    methods: {
        send () {
            if (this.message && this.receiver) {
                const msgMyTable = this.createMessage(this.myself.username);
                const msgTheirTable = this.createMessage(this.receiver);
                this.sendMessage(msgMyTable);
                this.saveMessage(msgMyTable, msgTheirTable);
                this.message = "";
            }
            this.focus();
        },
        createMessage (toSave) {
            return { toSave: toSave, sender: this.myself.username, receiver: this.receiver, content: this.message }
        },
        scroll () {
            window.location.href = '#anchor';
        },
        focus () {
            this.$refs.message.focus();
        },
        async sendMessage (msg) {
            MessagesService.send(msg);
        },
        async saveMessage (myMessage, theirMessage) {
            await MessagesService.save(myMessage)
                .then((resp) => { this.messages.push(resp.data); })
                .then(() => { this.scroll(); this.focus(); })
                .catch(err => console.log(err.message));

            await MessagesService.save(theirMessage).catch(err => console.log(err.message));
        },
        initSocket () {
            MessagesService.setupSocketConnection();
            MessagesService.socket.on(this.myself.username, async (data) => {
                data = JSON.parse(data);
                if (this.receiver == data.sender)
                    this.messages.push(data);
                this.scroll();
            });
        },
        loadMyself () {
            this.myself = JSON.parse(localStorage.getItem("user"));
        }
    },
    async mounted () {
        await this.loadMyself();
        if (this.myself) this.initSocket();
    },
    watch: {
        async receiver (receiver) {
            await MessagesService.getChat(this.myself.username, receiver)
                .then(response => {
                    if (!response.data.message)
                        this.messages = response.data
                }).then(() => { this.scroll(); this.focus(); });
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
    margin: 0; padding: 0 10px;
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

.messages li {
    margin: 2px;
    display: inline-block;
}

.messages div {
    width: fit-content;
    display: block;
    text-align: justify;
    padding: 8px;
    border-radius: 8px;
}

.messages span {
    word-break: break-word;
}

.messages li.right div {
    float: right;
    background-color: #D35400;
    border-bottom-right-radius: 0;
}

.messages li.left div {
    float: left;
    background-color: #DC7633;
    border-bottom-left-radius: 0;
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

@media (min-width: 500px) {
    .messages div {
        max-width: 500px;
    }
}
</style>