<template>
    <div class="home">
        <UsersList :myself="this.user.username" @receiver="(rec) => receive(rec)"/>
        <DisplayChat :myself="this.user.username" :receiver="this.receiver"/>
    </div>
</template>
<script>
import UsersList from '@/components/UsersList.vue';
import DisplayChat from '@/components/DisplayChat.vue';

export default {
    name: 'HomePage',
    components: {
        UsersList,
        DisplayChat
    },
    data () {
        return {
            user: {},
            receiver: ""
        }
    },
    methods: {
        loadData () {
            this.user = JSON.parse(localStorage.getItem("user"));
            if (!this.user)
                this.$router.push({ name: 'SignUp' });
        },
        receive (rec) {
            this.receiver = rec;
        }
    },
    mounted () {
        this.loadData();
        this.$emit('logged', true, this.user.username);
    }
}
</script>
<style>
.home {
    width: 100%; height: 100%;
    display: flex; flex-direction: row;
}
</style>