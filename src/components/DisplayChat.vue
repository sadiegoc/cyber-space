<template>
    <div class="display-chat">
        <ul class="messages">
            <li>one message</li>
        </ul>
        <form @submit.prevent="send" class="form-message">
            <input v-model="message" type="text" autocomplete="off"/>
            <button class="btn">Send</button>
        </form>
    </div>
</template>
<script>
export default {
    name: 'DisplayChat',
    data () {
        return {
            message: ""
        }
    },
    methods: {
        send () {
            console.log(this.message);
            this.message = "";
        }
    }
}
</script>
<style>
.display-chat {
    margin: 0; padding: 0;
    color: white; width: 100vw;
    background-color: #333;
    position: relative;
}

.display-chat .messages {
    margin: 0; padding: 0;
    height: 100%; width: 100%; background-color: aqua;
    list-style: none;
    position: absolute;
}

.display-chat .messages li {
    padding: 8px 10px;
}

.form-message {
    padding: 4px; position: absolute;
    display: flex; bottom: 0; right: 0; left: 0;
    box-sizing: border-box;
    backdrop-filter: blur(20px);
    background: rgba(0, 0, 0, 0.4);
}

.form-message input {
    border: none; padding: 0 1rem;
    flex-grow: 1; border-radius: 40px; margin: 4px;
    font-size: 0.8rem;
}

.form-message input:focus {
    outline: none;
}

.form-message .btn {
    background-color: #333; border: none;
    padding: 0 1rem; margin: 0.25rem; color: white;
    background-color: #333;
}

.form-message .btn:hover {
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